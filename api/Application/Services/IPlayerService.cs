using MarcadorBaloncesto.Infrastructure.Data;
using MarcadorBaloncesto.Infrastructure.Repositories;
using Microsoft.Data.SqlClient;

namespace MarcadorBaloncesto.Application.Services
{
    public interface IPlayerService
    {
        Task<IEnumerable<dynamic>> ListByTeamAsync(int teamId);
        Task<(bool Ok, int PlayerId, string? Error)> CreateAsync(int teamId, string name, byte? number, string? position);
        Task<bool> UpdateAsync(int playerId, byte? number, string? name, string? position, bool? active);
        Task<bool> DeleteAsync(int playerId);
    }

    public sealed class PlayerService : IPlayerService
    {
        private readonly ISqlConnectionFactory _factory;
        private readonly IPlayerRepository _repo;

        public PlayerService(ISqlConnectionFactory factory, IPlayerRepository repo)
        {
            _factory = factory;
            _repo = repo;
        }

        public async Task<IEnumerable<dynamic>> ListByTeamAsync(int teamId)
        {
            using var c = _factory.Create();
            return await _repo.ListByTeamAsync(c, teamId);
        }

        public async Task<(bool Ok, int PlayerId, string? Error)> CreateAsync(int teamId, string name, byte? number, string? position)
        {
            name = (name ?? string.Empty).Trim();
            if (string.IsNullOrWhiteSpace(name)) return (false, 0, "Name requerido.");
            try
            {
                using var c = _factory.Create();
                var id = await _repo.CreateAsync(c, teamId, number, name, position);
                return (true, id, null);
            }
            catch (SqlException ex) when (ex.Number is 2601 or 2627)
            {
                return (false, 0, "Dorsal duplicado.");
            }
        }

        public async Task<bool> UpdateAsync(int playerId, byte? number, string? name, string? position, bool? active)
        {
            using var c = _factory.Create();
            var ok = await _repo.UpdateAsync(c, playerId, number, name, position, active);
            return ok > 0;
        }

        public async Task<bool> DeleteAsync(int playerId)
        {
            using var c = _factory.Create();
            var ok = await _repo.DeleteAsync(c, playerId);
            return ok > 0;
        }
    }
}
