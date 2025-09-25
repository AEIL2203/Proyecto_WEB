using Microsoft.Data.SqlClient;
using MarcadorBaloncesto.Infrastructure.Data;
using MarcadorBaloncesto.Infrastructure.Repositories;
using MarcadorBaloncesto.Application.DTOs;

namespace MarcadorBaloncesto.Application.Services
{
    public interface IGameService
    {
        Task<IEnumerable<GameRow>> ListAsync();
        Task<int> CreateAsync(string? home, string? away, int? quarterMs);
        Task<GameDetailDto?> GetDetailAsync(int id);
        Task<bool> StartAsync(int id);
        Task<(bool Ok, string? Error)> AdvanceQuarterAsync(int id);
        Task<bool> FinishAsync(int id);
        Task<(bool Ok, string? Error)> ScoreAsync(int id, string team, int points, int? playerNumber, int? playerId);
        Task<(bool Ok, string? Error)> FoulAsync(int id, string team, int? playerNumber, int? playerId);
        Task<(bool Ok, string? Error)> RemoveFoulAsync(int id, string team, int? playerId);
        Task<(bool Ok, string? Error)> RemoveScoreAsync(int id, string team);
        Task<(bool Ok, string? Error)> UndoAsync(int id);
    }

    public sealed class GameService : IGameService
    {
        private readonly ISqlConnectionFactory _factory;
        private readonly IGameRepository _repo;

        public GameService(ISqlConnectionFactory factory, IGameRepository repo)
        {
            _factory = factory;
            _repo = repo;
        }

        public async Task<IEnumerable<GameRow>> ListAsync()
        {
            using var c = _factory.Create();
            return await _repo.ListGamesAsync(c);
        }

        public async Task<int> CreateAsync(string? home, string? away, int? quarterMs)
        {
            var h = string.IsNullOrWhiteSpace(home) ? "Local" : home!.Trim();
            var a = string.IsNullOrWhiteSpace(away) ? "Visitante" : away!.Trim();
            var qms = quarterMs ?? 720000;

            // Validar duraciones permitidas (incluye 30s para pruebas)
            if (qms != 30000 && qms != 300000 && qms != 600000 && qms != 720000)
                qms = 720000;

            using var c = _factory.Create();
            using var tx = c.BeginTransaction();
            var id = await _repo.CreateGameAsync(c, h, a, qms, tx);
            await _repo.EnsureTimerAsync(c, id, qms, tx);
            tx.Commit();
            return id;
        }

        public async Task<GameDetailDto?> GetDetailAsync(int id)
        {
            using var c = _factory.Create();
            var game = await _repo.GetGameAsync(c, id);
            if (game is null) return null;
            var events = (await _repo.GetEventsAsync(c, id)).ToList();
            return new GameDetailDto { Game = game, Events = events };
        }

        public async Task<bool> StartAsync(int id)
        {
            using var c = _factory.Create();
            using var tx = c.BeginTransaction();
            var ok = await _repo.StartGameAsync(c, id, tx);
            if (ok == 0) { tx.Rollback(); return false; }
            await _repo.UpdateTimerOnStartAsync(c, id, tx);
            tx.Commit();
            return true;
        }

        public async Task<(bool Ok, string? Error)> AdvanceQuarterAsync(int id)
        {
            using var c = _factory.Create();
            using var tx = c.BeginTransaction();

            var row = await _repo.GetStatusWithScoresAsync(c, id, tx);
            if (row == null) { tx.Rollback(); return (false, "NotFound"); }

            var (quarter, status, homeScore, awayScore) = row.Value;
            if (!string.Equals(status, "IN_PROGRESS", StringComparison.OrdinalIgnoreCase))
            { tx.Rollback(); return (false, "Juego no está IN_PROGRESS."); }

            bool isTied = homeScore == awayScore;
            bool isAfterReg = quarter >= 4;
            if (isAfterReg && !isTied)
            { tx.Rollback(); return (false, "El juego debe finalizar - hay un ganador."); }

            bool overtime = isAfterReg && isTied;
            int? overtimeMs = overtime ? 300000 : null; // 5 minutos para OT
            await _repo.AdvanceQuarterAsync(c, id, overtime, overtimeMs, tx);

            tx.Commit();
            return (true, null);
        }

        public async Task<bool> FinishAsync(int id)
        {
            using var c = _factory.Create();
            using var tx = c.BeginTransaction();
            var ok = await _repo.FinishGameAsync(c, id, tx);
            if (ok == 0) { tx.Rollback(); return false; }
            await _repo.StopTimerAsync(c, id, tx);
            tx.Commit();
            return true;
        }

        public async Task<(bool Ok, string? Error)> ScoreAsync(int id, string team, int points, int? playerNumber, int? playerId)
        {
            team = (team ?? string.Empty).Trim().ToUpperInvariant();
            if (team is not ("HOME" or "AWAY") || points is not (1 or 2 or 3))
                return (false, "Team HOME/AWAY y Points 1|2|3.");

            using var c = _factory.Create();
            using var tx = c.BeginTransaction();
            var status = await _repo.GetGameStatusAsync(c, id, tx);
            if (!string.Equals(status, "IN_PROGRESS", StringComparison.OrdinalIgnoreCase))
            { tx.Rollback(); return (false, "Juego no IN_PROGRESS."); }

            var affected = await _repo.AddScoreAsync(c, id, team, points, playerNumber, playerId, tx);
            if (affected <= 0) { tx.Rollback(); return (false, "No se pudo registrar."); }
            tx.Commit();
            return (true, null);
        }

        public async Task<(bool Ok, string? Error)> FoulAsync(int id, string team, int? playerNumber, int? playerId)
        {
            team = (team ?? string.Empty).Trim().ToUpperInvariant();
            if (team is not ("HOME" or "AWAY"))
                return (false, "Team HOME/AWAY.");

            using var c = _factory.Create();
            using var tx = c.BeginTransaction();
            var inserted = await _repo.InsertFoulAsync(c, id, team, playerNumber, playerId, tx);
            if (inserted <= 0) { tx.Rollback(); return (false, "Juego no IN_PROGRESS o no se pudo registrar."); }
            tx.Commit();
            return (true, null);
        }

        public async Task<(bool Ok, string? Error)> RemoveFoulAsync(int id, string team, int? playerId)
        {
            team = (team ?? string.Empty).Trim().ToUpperInvariant();
            if (team is not ("HOME" or "AWAY"))
                return (false, "Team HOME/AWAY.");

            using var c = _factory.Create();
            using var tx = c.BeginTransaction();
            var eventId = await _repo.FindLastFoulEventIdAsync(c, id, team, playerId, tx);
            if (eventId is null) { tx.Rollback(); return (false, "No se encontró falta para restar."); }
            await _repo.DeleteEventByIdAsync(c, eventId.Value, tx);
            await _repo.InsertEventAsync(c, id, team, "REMOVE_FOUL", playerId, tx);
            tx.Commit();
            return (true, null);
        }

        public async Task<(bool Ok, string? Error)> RemoveScoreAsync(int id, string team)
        {
            team = (team ?? string.Empty).Trim().ToUpperInvariant();
            if (team is not ("HOME" or "AWAY"))
                return (false, "Team HOME/AWAY.");

            using var c = _factory.Create();
            using var tx = c.BeginTransaction();
            var last = await _repo.FindLastScoreEventAsync(c, id, team, tx);
            if (last is null) { tx.Rollback(); return (false, "No se encontró anotación para restar."); }
            var (eventId, eventType) = last.Value;
            var parts = eventType.Split('_');
            if (parts.Length != 2 || !int.TryParse(parts[1], out var points)) points = 0;
            if (points <= 0) { tx.Rollback(); return (false, "Evento de anotación inválido."); }
            await _repo.UpdateScoresSubtractAsync(c, id, team, points, tx);
            await _repo.DeleteEventByIdAsync(c, eventId, tx);
            await _repo.InsertEventAsync(c, id, team, "REMOVE_SCORE", null, tx);
            tx.Commit();
            return (true, null);
        }

        public async Task<(bool Ok, string? Error)> UndoAsync(int id)
        {
            using var c = _factory.Create();
            using var tx = c.BeginTransaction();
            var last = await _repo.FindLastPointOrFoulEventAsync(c, id, tx);
            if (last is null) { tx.Rollback(); return (false, "No hay evento."); }
            var (eventId, etype, team) = last.Value;
            if (etype.StartsWith("POINT_"))
            {
                var parts = etype.Split('_');
                if (parts.Length == 2 && int.TryParse(parts[1], out var points) && points > 0)
                {
                    await _repo.UpdateScoresSubtractAsync(c, id, team, points, tx);
                }
            }
            await _repo.InsertEventAsync(c, id, team, "UNDO", null, tx);
            await _repo.DeleteEventByIdAsync(c, eventId, tx);
            tx.Commit();
            return (true, null);
        }
    }
}
