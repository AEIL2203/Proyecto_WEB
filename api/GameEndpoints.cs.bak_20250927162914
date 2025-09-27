using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Text.RegularExpressions;

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
        static bool IsNullOrWhite(string? s) => string.IsNullOrWhiteSpace(s);

        // ===== Games =====
        g.MapGet("/games", async () =>
        {
            using var c = new SqlConnection(cs());
            var rows = await c.QueryAsync($"SELECT TOP 50 * FROM {T}Matches ORDER BY GameId DESC;");
            return Results.Ok(rows);
        }).WithOpenApi();

        g.MapPost("/games", async ([FromBody] CreateGameDto body) =>
        {
            var home = IsNullOrWhite(body?.Home) ? "Local" : body!.Home!.Trim();
            var away = IsNullOrWhite(body?.Away) ? "Visitante" : body!.Away!.Trim();
            var quarterMs = body?.QuarterMs ?? 720000; // Default 12 min
            
            // Validate quarter duration (30s=30000ms, 5min=300000ms, 10min=600000ms, 12min=720000ms)
            if (quarterMs != 30000 && quarterMs != 300000 && quarterMs != 600000 && quarterMs != 720000)
                quarterMs = 720000;

            using var c = Open(cs());
            using var tx = c.BeginTransaction();

            var id = await c.ExecuteScalarAsync<int>(
                $@"INSERT INTO {T}Matches(HomeTeam, AwayTeam, Status, Quarter, CreatedAt)
                   OUTPUT INSERTED.GameId VALUES(@home, @away, 'SCHEDULED', 1, SYSUTCDATETIME());",
                new { home, away }, tx);

            await Exec(c,
                $@"IF NOT EXISTS(SELECT 1 FROM {T}MatchTimers WHERE GameId=@id)
                   INSERT INTO {T}MatchTimers(GameId, Quarter, QuarterMs, RemainingMs, Running, StartedAt, UpdatedAt)
                   VALUES(@id, 1, @quarterMs, @quarterMs, 0, NULL, SYSUTCDATETIME());",
                new { id, quarterMs }, tx);

            tx.Commit();
            return Results.Created($"/api/games/{id}", new { gameId = id, home, away, quarterMs });
        }).WithOpenApi();

        g.MapGet("/games/{id:int}", async (int id) =>
        {
            using var c = new SqlConnection(cs());
            var game = await One<dynamic>(c, $"SELECT * FROM {T}Matches WHERE GameId=@id;", new { id });
            if (game is null) return Results.NotFound();
            var events = await c.QueryAsync($"SELECT TOP 100 * FROM {T}MatchEvents WHERE GameId=@id ORDER BY EventId DESC;", new { id });
            return Results.Ok(new { game, events });
        }).WithOpenApi();

        g.MapPost("/games/{id:int}/start", async (int id) =>
        {
            using var c = Open(cs());
            using var tx = c.BeginTransaction();

            var ok = await Exec(c, $"UPDATE {T}Matches SET Status='IN_PROGRESS' WHERE GameId=@id AND Status='SCHEDULED';", new { id }, tx);
            if (ok == 0) { tx.Rollback(); return Results.BadRequest(new { error = "No se pudo iniciar." }); }

            await Exec(c, $"UPDATE {T}MatchTimers SET Running=1, StartedAt=SYSUTCDATETIME(), UpdatedAt=SYSUTCDATETIME() WHERE GameId=@id;", new { id }, tx);
            tx.Commit();
            return Results.NoContent();
        }).WithOpenApi();

        g.MapPost("/games/{id:int}/advance-quarter", async (int id) =>
        {
            using var c = Open(cs());
            using var tx = c.BeginTransaction();

            var game = await One<(int Quarter, string Status, int HomeScore, int AwayScore)>(c, 
                $"SELECT Quarter, Status, HomeScore, AwayScore FROM {T}Matches WHERE GameId=@id;", new { id }, tx);
            if (game == default) { tx.Rollback(); return Results.NotFound(); }
            if (!string.Equals(game.Status, "IN_PROGRESS", StringComparison.OrdinalIgnoreCase))
            { tx.Rollback(); return Results.BadRequest(new { error = "Juego no está IN_PROGRESS." }); }

            // Check if game is tied after quarter 4 or overtime
            bool isTied = game.HomeScore == game.AwayScore;
            bool isAfterRegulation = game.Quarter >= 4;
            
            // If after quarter 4+ and there's a winner, game should finish
            if (isAfterRegulation && !isTied)
            {
                tx.Rollback(); 
                return Results.BadRequest(new { error = "El juego debe finalizar - hay un ganador." });
            }

            // Advance to next quarter/overtime
            await Exec(c, $"UPDATE {T}Matches SET Quarter = Quarter + 1 WHERE GameId=@id;", new { id }, tx);
            
            // Determine duration: regular quarters use original duration, overtime is always 5 minutes
            var quarterMs = isAfterRegulation ? 300000 : 0; // 5 minutes for overtime, 0 to use original for regular quarters
            
            if (quarterMs > 0)
            {
                // Overtime: set to 5 minutes
                await Exec(c, $@"
                    UPDATE c
                    SET c.Quarter = g.Quarter,
                        c.Running = 0,
                        c.RemainingMs = @quarterMs,
                        c.QuarterMs = @quarterMs,
                        c.StartedAt = NULL,
                        c.UpdatedAt = SYSUTCDATETIME()
                    FROM {T}MatchTimers c
                    INNER JOIN {T}Matches g ON g.GameId = c.GameId
                    WHERE c.GameId=@id;", new { id, quarterMs }, tx);
            }
            else
            {
                // Regular quarter: preserve original duration
                await Exec(c, $@"
                    UPDATE c
                    SET c.Quarter = g.Quarter,
                        c.Running = 0,
                        c.RemainingMs = c.QuarterMs,
                        c.StartedAt = NULL,
                        c.UpdatedAt = SYSUTCDATETIME()
                    FROM {T}MatchTimers c
                    INNER JOIN {T}Matches g ON g.GameId = c.GameId
                    WHERE c.GameId=@id;", new { id }, tx);
            }

            tx.Commit(); return Results.NoContent();
        }).WithOpenApi();

        g.MapPost("/games/{id:int}/finish", async (int id) =>
        {
            using var c = Open(cs());
            using var tx = c.BeginTransaction();
            var ok = await Exec(c, $"UPDATE {T}Matches SET Status='FINISHED' WHERE GameId=@id AND Status='IN_PROGRESS';", new { id }, tx);
            if (ok == 0) { tx.Rollback(); return Results.BadRequest(new { error = "No se pudo finalizar." }); }
            await Exec(c, $"UPDATE {T}MatchTimers SET Running=0, StartedAt=NULL, UpdatedAt=SYSUTCDATETIME() WHERE GameId=@id;", new { id }, tx);
            tx.Commit(); return Results.NoContent();
        }).WithOpenApi();

        // ===== Score / Foul / Undo =====
        g.MapPost("/games/{id:int}/score", async (int id, [FromBody] ScoreDto b) =>
        {
            var team = (b?.Team ?? "").Trim().ToUpperInvariant();
            if (team is not ("HOME" or "AWAY") || b?.Points is not (1 or 2 or 3))
                return Results.BadRequest(new { error = "Team HOME/AWAY y Points 1|2|3." });

            using var c = Open(cs());
            using var tx = c.BeginTransaction();

            var status = await One<string>(c, $"SELECT Status FROM {T}Matches WHERE GameId=@id;", new { id }, tx);
            if (!string.Equals(status, "IN_PROGRESS", StringComparison.OrdinalIgnoreCase))
            { tx.Rollback(); return Results.BadRequest(new { error = "Juego no IN_PROGRESS." }); }

            var affected = await Exec(c, $@"
                UPDATE {T}Matches
                SET HomeScore = CASE WHEN @team='HOME' THEN HomeScore + @pts ELSE HomeScore END,
                    AwayScore = CASE WHEN @team='AWAY' THEN AwayScore + @pts ELSE AwayScore END
                WHERE GameId=@id;

                INSERT INTO {T}MatchEvents(GameId, Quarter, Team, EventType, PlayerNumber, PlayerId)
                SELECT @id, Quarter, @team, @etype, @pnum, @pid FROM {T}Matches WHERE GameId=@id;",
                new
                {
                    id,
                    team,
                    pts = b!.Points,
                    etype = $"POINT_{b.Points}",
                    pnum = b.PlayerNumber,
                    pid = b.PlayerId
                }, tx);

            if (affected <= 0) { tx.Rollback(); return Results.BadRequest(new { error = "No se pudo registrar." }); }
            tx.Commit();
            return Results.NoContent();
        }).WithOpenApi();

        g.MapPost("/games/{id:int}/foul", async (int id, [FromBody] FoulDto b) =>
        {
            var team = (b?.Team ?? "").Trim().ToUpperInvariant();
            if (team is not ("HOME" or "AWAY")) return Results.BadRequest(new { error = "Team HOME/AWAY." });

            using var c = Open(cs());
            using var tx = c.BeginTransaction();

            var inserted = await Exec(c, $@"
                INSERT INTO {T}MatchEvents(GameId, Quarter, Team, EventType, PlayerNumber, PlayerId)
                SELECT @id, g.Quarter, @team, 'FOUL', @pnum, @pid
                FROM {T}Matches g
                WHERE g.GameId=@id AND g.Status='IN_PROGRESS';",
                new { id, team, pnum = b?.PlayerNumber, pid = b?.PlayerId }, tx);

            if (inserted <= 0) { tx.Rollback(); return Results.BadRequest(new { error = "Juego no IN_PROGRESS o no se pudo registrar." }); }
            tx.Commit();
            return Results.NoContent();
        }).WithOpenApi();

        g.MapPost("/games/{id:int}/remove-foul", async (int id, [FromBody] FoulDto b) =>
        {
            var team = (b?.Team ?? "").Trim().ToUpperInvariant();
            if (team is not ("HOME" or "AWAY")) return Results.BadRequest(new { error = "Team HOME/AWAY." });

            using var c = Open(cs());
            using var tx = c.BeginTransaction();

            // Buscar la falta más reciente del equipo (y jugador si se especifica)
            var sql = $@"
                SELECT TOP 1 EventId 
                FROM {T}MatchEvents 
                WHERE GameId=@id AND Team=@team AND EventType='FOUL'
                {(b?.PlayerId.HasValue == true ? "AND PlayerId=@pid" : "")}
                ORDER BY EventId DESC;";

            var eventId = await One<int?>(c, sql, new { id, team, pid = b?.PlayerId }, tx);
            
            if (eventId == null) 
            { 
                tx.Rollback(); 
                return Results.BadRequest(new { error = "No se encontró falta para restar." }); 
            }

            // Eliminar la falta encontrada
            await Exec(c, $"DELETE FROM {T}MatchEvents WHERE EventId=@eventId;", new { eventId }, tx);

            // Registrar el evento de remoción de falta
            await Exec(c, $@"
                INSERT INTO {T}MatchEvents(GameId, Quarter, Team, EventType, PlayerId)
                SELECT @id, Quarter, @team, 'REMOVE_FOUL', @pid FROM {T}Matches WHERE GameId=@id;",
                new { id, team, pid = b?.PlayerId }, tx);

            tx.Commit();
            return Results.NoContent();
        }).WithOpenApi();

        g.MapPost("/games/{id:int}/remove-score", async (int id, [FromBody] ScoreDto b) =>
        {
            var team = (b?.Team ?? "").Trim().ToUpperInvariant();
            if (team is not ("HOME" or "AWAY")) return Results.BadRequest(new { error = "Team HOME/AWAY." });

            using var c = Open(cs());
            using var tx = c.BeginTransaction();

            // Buscar la última anotación del equipo
            var lastScore = await One<(int EventId, string EventType)>(c, $@"
                SELECT TOP 1 EventId, EventType 
                FROM {T}MatchEvents 
                WHERE GameId=@id AND Team=@team AND EventType IN ('POINT_1','POINT_2','POINT_3')
                ORDER BY EventId DESC;", new { id, team }, tx);
            
            if (lastScore.Equals(default)) 
            { 
                tx.Rollback(); 
                return Results.BadRequest(new { error = "No se encontró anotación para restar." }); 
            }

            // Extraer puntos del tipo de evento
            var points = int.Parse(lastScore.EventType.Split('_')[1]);

            // Restar puntos del marcador
            await Exec(c, $@"
                UPDATE {T}Matches
                SET HomeScore = CASE WHEN @team='HOME' THEN IIF(HomeScore>=@pts, HomeScore-@pts, HomeScore) ELSE HomeScore END,
                    AwayScore = CASE WHEN @team='AWAY' THEN IIF(AwayScore>=@pts, AwayScore-@pts, AwayScore) ELSE AwayScore END
                WHERE GameId=@id;", new { id, team, pts = points }, tx);

            // Eliminar el evento de anotación
            await Exec(c, $"DELETE FROM {T}MatchEvents WHERE EventId=@eventId;", new { eventId = lastScore.EventId }, tx);

            // Registrar el evento de remoción de puntos
            await Exec(c, $@"
                INSERT INTO {T}MatchEvents(GameId, Quarter, Team, EventType)
                SELECT @id, Quarter, @team, 'REMOVE_SCORE' FROM {T}Matches WHERE GameId=@id;",
                new { id, team }, tx);

            tx.Commit();
            return Results.NoContent();
        }).WithOpenApi();

        g.MapPost("/games/{id:int}/undo", async (int id) =>
        {
            using var c = Open(cs());
            using var tx = c.BeginTransaction();

            var sql = $@"
DECLARE @eid INT, @etype NVARCHAR(32), @team NVARCHAR(8), @q TINYINT, @pts INT;
SELECT TOP 1 @eid = EventId, @etype = EventType, @team = Team, @q = Quarter
FROM {T}MatchEvents WHERE GameId=@id AND EventType IN ('POINT_1','POINT_2','POINT_3','FOUL')
ORDER BY EventId DESC;

IF @eid IS NULL BEGIN SELECT -1; RETURN; END;

IF LEFT(@etype,6) = 'POINT_'
BEGIN
    SET @pts = TRY_CAST(SUBSTRING(@etype,7,10) AS INT);
    UPDATE {T}Matches
    SET HomeScore = CASE WHEN @team='HOME' THEN IIF(HomeScore>=@pts, HomeScore-@pts, HomeScore) ELSE HomeScore END,
        AwayScore = CASE WHEN @team='AWAY' THEN IIF(AwayScore>=@pts, AwayScore-@pts, AwayScore) ELSE AwayScore END
    WHERE GameId=@id;
END

INSERT INTO {T}MatchEvents(GameId, Quarter, Team, EventType) VALUES(@id, @q, @team, 'UNDO');
DELETE FROM {T}MatchEvents WHERE EventId=@eid;";

            var ok = await Exec(c, sql, new { id }, tx);
            if (ok < 0) { tx.Rollback(); return Results.BadRequest(new { error = "No hay evento." }); }

            tx.Commit();
            return Results.NoContent();
        }).WithOpenApi();

        // ===== Teams & Players =====
        g.MapGet("/teams", async () =>
        {
            using var c = new SqlConnection(cs());
            var rows = await c.QueryAsync($"SELECT TeamId, Name, CreatedAt FROM {T}Club ORDER BY Name;");
            return Results.Ok(rows);
        }).WithOpenApi();

        g.MapPost("/teams", async ([FromBody] TeamCreateDto body) =>
        {
            var name = (body?.Name ?? "").Trim();
            if (IsNullOrWhite(name)) return Results.BadRequest(new { error = "Name requerido." });
            // Solo letras (incluye acentos/ñ) y espacios
            var rx = new Regex("^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$");
            if (!rx.IsMatch(name)) return Results.BadRequest(new { error = "Nombre inválido. Solo letras y espacios." });

            try
            {
                using var c = new SqlConnection(cs());
                var id = await c.ExecuteScalarAsync<int>($"INSERT INTO {T}Club(Name) OUTPUT INSERTED.TeamId VALUES(@name);", new { name });
                return Results.Created($"/api/teams/{id}", new { teamId = id, name });
            }
            catch (SqlException ex) when (ex.Number is 2601 or 2627) { return Results.Conflict(new { error = "Nombre duplicado." }); }
        }).WithOpenApi();

        g.MapPost("/games/pair", async ([FromBody] PairDto body) =>
        {
            if (body.HomeTeamId <= 0 || body.AwayTeamId <= 0 || body.HomeTeamId == body.AwayTeamId)
                return Results.BadRequest(new { error = "Equipos inválidos." });
            
            var quarterMs = body.QuarterMs ?? 720000; // Default 12 min
            
            // Validate quarter duration (30s=30000ms, 5min=300000ms, 10min=600000ms, 12min=720000ms)
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

        g.MapGet("/teams/{teamId:int}/players", async (int teamId) =>
        {
            using var c = new SqlConnection(cs());
            var rows = await c.QueryAsync($@"
                SELECT PlayerId, TeamId, Number, Name, Position, Active, CreatedAt
                FROM {T}Athletes WHERE TeamId=@teamId
                ORDER BY COALESCE(Number,255), Name;", new { teamId });
            return Results.Ok(rows);
        }).WithOpenApi();

        g.MapPost("/teams/{teamId:int}/players", async (int teamId, [FromBody] CreatePlayerDto body) =>
        {
            var name = (body?.Name ?? "").Trim();
            if (IsNullOrWhite(name)) return Results.BadRequest(new { error = "Name requerido." });

            try
            {
                using var c = new SqlConnection(cs());
                var id = await c.ExecuteScalarAsync<int>($@"
                    INSERT INTO {T}Athletes(TeamId, Number, Name, Position, Active)
                    OUTPUT INSERTED.PlayerId VALUES(@teamId,@num,@name,@pos,1);",
                    new { teamId, num = body!.Number, name, pos = body!.Position });
                return Results.Created($"/api/players/{id}", new { playerId = id });
            }
            catch (SqlException ex) when (ex.Number is 2601 or 2627) { return Results.BadRequest(new { error = "Dorsal duplicado." }); }
        }).WithOpenApi();

        g.MapPatch("/players/{playerId:int}", async (int playerId, [FromBody] UpdatePlayerDto b) =>
        {
            using var c = new SqlConnection(cs());
            var ok = await c.ExecuteAsync($@"
                UPDATE {T}Athletes SET
                  Number=COALESCE(@Number,Number),
                  Name=COALESCE(@Name,Name),
                  Position=COALESCE(@Position,Position),
                  Active=COALESCE(@Active,Active)
                WHERE PlayerId=@playerId;", new { playerId, b?.Number, b?.Name, b?.Position, b?.Active });
            return ok > 0 ? Results.NoContent() : Results.NotFound();
        }).WithOpenApi();

        g.MapDelete("/players/{playerId:int}", async (int playerId) =>
        {
            using var c = new SqlConnection(cs());
            var ok = await c.ExecuteAsync($"DELETE FROM {T}Athletes WHERE PlayerId=@playerId;", new { playerId });
            return ok > 0 ? Results.NoContent() : Results.NotFound();
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