using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Text.RegularExpressions;
using MarcadorBaloncesto.Application.Services;
using MarcadorBaloncesto.Application.DTOs;

public static class GameEndpoints
{
    const string T = "HoopsDB.core."; // prefijo schema actualizado

    public static void MapGameEndpoints(this WebApplication app, Func<string> cs)
    {
        var g = app.MapGroup("/api");

        // ===== Helpers mínimos =====
        static SqlConnection Open(string cs) { var c = new SqlConnection(cs); c.Open(); return c; }
        static Task<T?> One<T>(SqlConnection c, string sql, object? p = null, SqlTransaction? tx = null)
            => c.QuerySingleOrDefaultAsync<T>(sql, p, tx);
        static Task<int> Exec(SqlConnection c, string sql, object? p = null, SqlTransaction? tx = null)
            => c.ExecuteAsync(sql, p, tx);

        // ===== Games =====
        g.MapGet("/games", async ([FromServices] IGameService svc) =>
        {
            var rows = await svc.ListAsync();
            return Results.Ok(rows);
        }).WithOpenApi();

        g.MapPost("/games", async ([FromServices] IGameService svc, [FromBody] CreateGameDto body) =>
        {
            var id = await svc.CreateAsync(body?.Home, body?.Away, body?.QuarterMs);
            return Results.Created($"/api/games/{id}", new { gameId = id, home = body?.Home ?? "Local", away = body?.Away ?? "Visitante", quarterMs = body?.QuarterMs ?? 720000 });
        }).WithOpenApi();

        g.MapGet("/games/{id:int}", async ([FromServices] IGameService svc, int id) =>
        {
            var detail = await svc.GetDetailAsync(id);
            if (detail is null) return Results.NotFound();
            return Results.Ok(new { game = detail.Game, events = detail.Events });
        }).WithOpenApi();

        g.MapPost("/games/{id:int}/start", async ([FromServices] IGameService svc, int id) =>
        {
            var ok = await svc.StartAsync(id);
            return ok ? Results.NoContent() : Results.BadRequest(new { error = "No se pudo iniciar." });
        }).WithOpenApi();

        g.MapPost("/games/{id:int}/advance-quarter", async ([FromServices] IGameService svc, int id) =>
        {
            var res = await svc.AdvanceQuarterAsync(id);
            if (!res.Ok)
            {
                if (res.Error == "NotFound") return Results.NotFound();
                return Results.BadRequest(new { error = res.Error });
            }
            return Results.NoContent();
        }).WithOpenApi();

        g.MapPost("/games/{id:int}/finish", async ([FromServices] IGameService svc, int id) =>
        {
            var ok = await svc.FinishAsync(id);
            return ok ? Results.NoContent() : Results.BadRequest(new { error = "No se pudo finalizar." });
        }).WithOpenApi();

        // ===== Score / Foul / Undo =====
        g.MapPost("/games/{id:int}/score", async ([FromServices] IGameService svc, int id, [FromBody] ScoreDto b) =>
        {
            var res = await svc.ScoreAsync(id, b.Team, b.Points, b.PlayerNumber, b.PlayerId);
            return res.Ok ? Results.NoContent() : Results.BadRequest(new { error = res.Error });
        }).WithOpenApi();

        g.MapPost("/games/{id:int}/foul", async ([FromServices] IGameService svc, int id, [FromBody] FoulDto b) =>
        {
            var res = await svc.FoulAsync(id, b.Team, b.PlayerNumber, b.PlayerId);
            return res.Ok ? Results.NoContent() : Results.BadRequest(new { error = res.Error });
        }).WithOpenApi();

        g.MapPost("/games/{id:int}/remove-foul", async ([FromServices] IGameService svc, int id, [FromBody] FoulDto b) =>
        {
            var res = await svc.RemoveFoulAsync(id, b.Team, b.PlayerId);
            return res.Ok ? Results.NoContent() : Results.BadRequest(new { error = res.Error });
        }).WithOpenApi();

        g.MapPost("/games/{id:int}/remove-score", async ([FromServices] IGameService svc, int id, [FromBody] ScoreDto b) =>
        {
            var res = await svc.RemoveScoreAsync(id, b.Team);
            return res.Ok ? Results.NoContent() : Results.BadRequest(new { error = res.Error });
        }).WithOpenApi();

        g.MapPost("/games/{id:int}/undo", async ([FromServices] IGameService svc, int id) =>
        {
            var res = await svc.UndoAsync(id);
            return res.Ok ? Results.NoContent() : Results.BadRequest(new { error = res.Error });
        }).WithOpenApi();

        // ===== Teams =====
        g.MapGet("/teams", async ([FromServices] ITeamService svc) =>
        {
            var rows = await svc.ListAsync();
            return Results.Ok(rows);
        }).WithOpenApi();

        g.MapPost("/teams", async ([FromServices] ITeamService svc, [FromBody] TeamCreateDto body) =>
        {
            var name = body?.Name ?? "";
            var res = await svc.CreateAsync(name);
            if (!res.Ok) return Results.BadRequest(new { error = res.Error });
            return Results.Created($"/api/teams/{res.TeamId}", new { teamId = res.TeamId, name = name.Trim() });
        }).WithOpenApi();

        g.MapPost("/games/pair", async ([FromBody] PairDto body) =>
        {
            if (body.HomeTeamId <= 0 || body.AwayTeamId <= 0 || body.HomeTeamId == body.AwayTeamId)
                return Results.BadRequest(new { error = "Equipos inválidos." });
            
            var quarterMs = body.QuarterMs ?? 720000; // Default 12 min
            
            // Validate quarter duration
            if (quarterMs != 30000 && quarterMs != 300000 && quarterMs != 600000 && quarterMs != 720000)
                quarterMs = 720000;

            using var c = Open(cs());
            using var tx = c.BeginTransaction();

            var teams = (await c.QueryAsync<(int TeamId, string Name)>(
                $"SELECT TeamId, Name FROM {T}Club WHERE TeamId IN (@h,@a);",
                new { h = body.HomeTeamId, a = body.AwayTeamId }, tx)).AsList();

            var home = teams.Find(t => t.TeamId == body.HomeTeamId).Name;
            var away = teams.Find(t => t.TeamId == body.AwayTeamId).Name;
            if (string.IsNullOrEmpty(home) || string.IsNullOrEmpty(away))
            { tx.Rollback(); return Results.BadRequest(new { error = "Equipo no encontrado." }); }

            var id = await c.ExecuteScalarAsync<int>(
                $@"INSERT INTO {T}Matches(HomeTeam, AwayTeam, HomeTeamId, AwayTeamId, Status, Quarter, CreatedAt)
                   OUTPUT INSERTED.GameId
                   VALUES(@home, @away, @hid, @aid, 'SCHEDULED', 1, SYSUTCDATETIME());",
                new { home, away, hid = body.HomeTeamId, aid = body.AwayTeamId }, tx);

            await Exec(c,
                $@"INSERT INTO {T}MatchTimers(GameId, Quarter, QuarterMs, RemainingMs, Running, StartedAt, UpdatedAt)
                   VALUES(@id, 1, @quarterMs, @quarterMs, 0, NULL, SYSUTCDATETIME());",
                new { id, quarterMs }, tx);

            tx.Commit();
            return Results.Created($"/api/games/{id}", new { gameId = id, home, away, quarterMs });
        }).WithOpenApi();

        // ===== Players =====
        g.MapGet("/teams/{teamId:int}/players", async ([FromServices] IPlayerService svc, int teamId) =>
        {
            var rows = await svc.ListByTeamAsync(teamId);
            return Results.Ok(rows);
        }).WithOpenApi();

        g.MapPost("/teams/{teamId:int}/players", async ([FromServices] IPlayerService svc, int teamId, [FromBody] CreatePlayerDto body) =>
        {
            var res = await svc.CreateAsync(teamId, body?.Name ?? "", body?.Number, body?.Position);
            if (!res.Ok) return Results.BadRequest(new { error = res.Error });
            return Results.Created($"/api/players/{res.PlayerId}", new { playerId = res.PlayerId });
        }).WithOpenApi();

        g.MapPatch("/players/{playerId:int}", async ([FromServices] IPlayerService svc, int playerId, [FromBody] UpdatePlayerDto b) =>
        {
            var ok = await svc.UpdateAsync(playerId, b?.Number, b?.Name, b?.Position, b?.Active);
            return ok ? Results.NoContent() : Results.NotFound();
        }).WithOpenApi();

        g.MapDelete("/players/{playerId:int}", async ([FromServices] IPlayerService svc, int playerId) =>
        {
            var ok = await svc.DeleteAsync(playerId);
            return ok ? Results.NoContent() : Results.NotFound();
        }).WithOpenApi();

        // ===== Rosters por juego y resumen de faltas =====
        g.MapGet("/games/{id:int}/players/{side}", async (int id, string side) =>
        {
            var s = (side ?? "").ToUpperInvariant();
            if (s is not ("HOME" or "AWAY")) return Results.BadRequest(new { error = "side HOME/AWAY" });

            using var c = new SqlConnection(cs());
            var gRow = await One<(int? HomeTeamId, int? AwayTeamId, string HomeTeam, string AwayTeam)>(
                c, $"SELECT HomeTeamId, AwayTeamId, HomeTeam, AwayTeam FROM {T}Matches WHERE GameId=@id;", new { id });

            if (gRow.Equals(default)) return Results.NotFound();

            int? teamId = s == "HOME" ? gRow.HomeTeamId : gRow.AwayTeamId;
            if (teamId is null)
            {
                var name = s == "HOME" ? gRow.HomeTeam : gRow.AwayTeam;
                teamId = await c.ExecuteScalarAsync<int?>("SELECT TeamId FROM HoopsDB.core.Club WHERE Name=@name;", new { name });
                if (teamId is null) return Results.Ok(Array.Empty<object>());
            }

            var rows = await c.QueryAsync($@"
                SELECT PlayerId, TeamId, Number, Name, Position, Active, CreatedAt
                FROM HoopsDB.core.Athletes WHERE TeamId=@teamId
                ORDER BY COALESCE(Number,255), Name;", new { teamId });
            return Results.Ok(rows);
        }).WithOpenApi();

        g.MapGet("/games/{id:int}/fouls/summary", async (int id) =>
        {
            using var c = new SqlConnection(cs());
            var team = await c.QueryAsync($@"
                SELECT Quarter, Team, SUM(CASE WHEN EventType='FOUL' THEN 1 ELSE 0 END) AS Fouls
                FROM {T}MatchEvents WHERE GameId=@id GROUP BY Quarter, Team ORDER BY Quarter, Team;", new { id });

            var players = await c.QueryAsync($@"
                SELECT Quarter, Team, PlayerId, SUM(CASE WHEN EventType='FOUL' THEN 1 ELSE 0 END) AS Fouls
                FROM {T}MatchEvents WHERE GameId=@id AND PlayerId IS NOT NULL
                GROUP BY Quarter, Team, PlayerId ORDER BY Quarter, Team, PlayerId;", new { id });

            return Results.Ok(new { team, players });
        }).WithOpenApi();
    }
}
