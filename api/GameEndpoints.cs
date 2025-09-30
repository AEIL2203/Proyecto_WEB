using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using System.Text.RegularExpressions;

/// <summary>
/// Endpoints de gestión de juegos, equipos, jugadores y eventos (puntos, faltas, undo).
/// </summary>
/// <remarks>
/// - Agrupa rutas bajo <c>/api</c> y aplica la política <c>Admin</c> donde corresponde.
/// - Utiliza Dapper para acceso a datos y SQL Server como persistencia.
/// - Provee utilitarios locales para abrir conexiones, ejecutar comandos y validar entradas.
/// </remarks>
public static class GameEndpoints
{
    const string T = "HoopsDB.core.";

    /// <summary>
    /// Mapea los endpoints del dominio de juego.
    /// </summary>
    /// <remarks>
    /// - Juegos: listar, crear, obtener, iniciar, avanzar cuarto, terminar.
    /// - Eventos: anotar, falta, quitar falta, quitar puntos, deshacer último evento.
    /// - Equipos y jugadores: CRUD básico, logo binario y validaciones.
    /// - Resúmenes: roster por juego y resumen de faltas por equipo/jugador.
    /// </remarks>
    public static void MapGameEndpoints(this WebApplication app, Func<string> cs)
    {
        var g = app.MapGroup("/api");
        var adminG = app.MapGroup("/api").RequireAuthorization("Admin");

        static SqlConnection Open(string cs) { var c = new SqlConnection(cs); c.Open(); return c; }
        static Task<T?> One<T>(SqlConnection c, string sql, object? p = null, SqlTransaction? tx = null)
            => c.QuerySingleOrDefaultAsync<T>(sql, p, tx);
        static Task<int> Exec(SqlConnection c, string sql, object? p = null, SqlTransaction? tx = null)
            => c.ExecuteAsync(sql, p, tx);
        static bool IsNullOrWhite(string? s) => string.IsNullOrWhiteSpace(s);

        /// <summary>
        /// Lista los últimos juegos creados.
        /// </summary>
        /// <remarks>
        /// Devuelve hasta 50 registros de `core.Matches` ordenados por `GameId` descendente.
        /// </remarks>
        g.MapGet("/games", async () =>
        {
            using var c = new SqlConnection(cs());
            var rows = await c.QueryAsync($"SELECT TOP 50 * FROM {T}Matches ORDER BY GameId DESC;");
            return Results.Ok(rows);
        }).WithOpenApi();

        /// <summary>
        /// Crea un nuevo juego con nombres libres.
        /// </summary>
        /// <remarks>
        /// Inserta en `core.Matches` y asegura el temporizador en `core.MatchTimers`. Duración por cuarto validada (10s, 30s, 5, 10 o 12 minutos).
        /// </remarks>
        adminG.MapPost("/games", async ([FromBody] CreateGameDto body) =>
        {
            var home = IsNullOrWhite(body?.Home) ? "Local" : body!.Home!.Trim();
            var away = IsNullOrWhite(body?.Away) ? "Visitante" : body!.Away!.Trim();
            var quarterMs = body?.QuarterMs ?? 720000;
            
            if (quarterMs != 10000 && quarterMs != 30000 && quarterMs != 300000 && quarterMs != 600000 && quarterMs != 720000)
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

        /// <summary>
        /// Obtiene el detalle de un juego y sus eventos recientes.
        /// </summary>
        /// <remarks>
        /// Incluye la fila de `core.Matches` y hasta 100 `core.MatchEvents` (más recientes primero).
        /// </remarks>
        g.MapGet("/games/{id:int}", async (int id) =>
        {
            using var c = new SqlConnection(cs());
            var game = await One<dynamic>(c, $"SELECT * FROM {T}Matches WHERE GameId=@id;", new { id });
            if (game is null) return Results.NotFound();
            var events = await c.QueryAsync($"SELECT TOP 100 * FROM {T}MatchEvents WHERE GameId=@id ORDER BY EventId DESC;", new { id });
            return Results.Ok(new { game, events });
        }).WithOpenApi();

        /// <summary>
        /// Inicia un juego programado.
        /// </summary>
        /// <remarks>
        /// Cambia `Status` a IN_PROGRESS y pone el temporizador en ejecución.
        /// </remarks>
        adminG.MapPost("/games/{id:int}/start", async (int id) =>
        {
            using var c = Open(cs());
            using var tx = c.BeginTransaction();

            var ok = await Exec(c, $"UPDATE {T}Matches SET Status='IN_PROGRESS' WHERE GameId=@id AND Status='SCHEDULED';", new { id }, tx);
            if (ok == 0) { tx.Rollback(); return Results.BadRequest(new { error = "No se pudo iniciar." }); }

            await Exec(c, $"UPDATE {T}MatchTimers SET Running=1, StartedAt=SYSUTCDATETIME(), UpdatedAt=SYSUTCDATETIME() WHERE GameId=@id;", new { id }, tx);
            tx.Commit();
            return Results.NoContent();
        }).WithOpenApi();

        /// <summary>
        /// Avanza al siguiente cuarto o prórroga.
        /// </summary>
        /// <remarks>
        /// Si tras el 4º cuarto hay ganador, exige finalizar el juego. En prórroga fija 5 minutos, en cuartos regulares conserva duración.
        /// </remarks>
        adminG.MapPost("/games/{id:int}/advance-quarter", async (int id) =>
        {
            using var c = Open(cs());
            using var tx = c.BeginTransaction();

            var game = await One<(int Quarter, string Status, int HomeScore, int AwayScore)>(c, 
                $"SELECT Quarter, Status, HomeScore, AwayScore FROM {T}Matches WHERE GameId=@id;", new { id }, tx);
            if (game == default) { tx.Rollback(); return Results.NotFound(); }
            if (!string.Equals(game.Status, "IN_PROGRESS", StringComparison.OrdinalIgnoreCase))
            { tx.Rollback(); return Results.BadRequest(new { error = "Juego no está IN_PROGRESS." }); }

            bool isTied = game.HomeScore == game.AwayScore;
            bool isAfterRegulation = game.Quarter >= 4;
            
            if (isAfterRegulation && !isTied)
            {
                tx.Rollback(); 
                return Results.BadRequest(new { error = "El juego debe finalizar - hay un ganador." });
            }

            await Exec(c, $"UPDATE {T}Matches SET Quarter = Quarter + 1 WHERE GameId=@id;", new { id }, tx);
            
            var quarterMs = isAfterRegulation ? 300000 : 0;
            
            if (quarterMs > 0)
            {
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

        /// <summary>
        /// Finaliza un juego en curso.
        /// </summary>
        /// <remarks>
        /// Pone `Status=FINISHED` y detiene el temporizador.
        /// </remarks>
        adminG.MapPost("/games/{id:int}/finish", async (int id) =>
        {
            using var c = Open(cs());
            using var tx = c.BeginTransaction();
            var ok = await Exec(c, $"UPDATE {T}Matches SET Status='FINISHED' WHERE GameId=@id AND Status='IN_PROGRESS';", new { id }, tx);
            if (ok == 0) { tx.Rollback(); return Results.BadRequest(new { error = "No se pudo finalizar." }); }
            await Exec(c, $"UPDATE {T}MatchTimers SET Running=0, StartedAt=NULL, UpdatedAt=SYSUTCDATETIME() WHERE GameId=@id;", new { id }, tx);
            tx.Commit(); return Results.NoContent();
        }).WithOpenApi();

        /// <summary>
        /// Registra una anotación (1, 2 o 3 puntos).
        /// </summary>
        /// <remarks>
        /// Solo para juegos IN_PROGRESS. Crea evento en `core.MatchEvents` con `POINT_1|2|3` y suma al marcador correspondiente.
        /// </remarks>
        adminG.MapPost("/games/{id:int}/score", async (int id, [FromBody] ScoreDto b) =>
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

        /// <summary>
        /// Registra una falta.
        /// </summary>
        /// <remarks>
        /// Inserta un evento `FOUL` en `core.MatchEvents` para el cuarto actual. Puede incluir `PlayerId` o dorsal.
        /// </remarks>
        adminG.MapPost("/games/{id:int}/foul", async (int id, [FromBody] FoulDto b) =>
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

        /// <summary>
        /// Quita la última falta registrada.
        /// </summary>
        /// <remarks>
        /// Busca la última `FOUL` del equipo (y jugador si se especifica), la elimina y registra `REMOVE_FOUL` como auditoría.
        /// </remarks>
        adminG.MapPost("/games/{id:int}/remove-foul", async (int id, [FromBody] FoulDto b) =>
        {
            var team = (b?.Team ?? "").Trim().ToUpperInvariant();
            if (team is not ("HOME" or "AWAY")) return Results.BadRequest(new { error = "Team HOME/AWAY." });

            using var c = Open(cs());
            using var tx = c.BeginTransaction();

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

            await Exec(c, $"DELETE FROM {T}MatchEvents WHERE EventId=@eventId;", new { eventId }, tx);

            await Exec(c, $@"
                INSERT INTO {T}MatchEvents(GameId, Quarter, Team, EventType, PlayerId)
                SELECT @id, Quarter, @team, 'REMOVE_FOUL', @pid FROM {T}Matches WHERE GameId=@id;",
                new { id, team, pid = b?.PlayerId }, tx);

            tx.Commit();
            return Results.NoContent();
        }).WithOpenApi();

        /// <summary>
        /// Quita la última anotación registrada.
        /// </summary>
        /// <remarks>
        /// Identifica el último `POINT_1|2|3`, descuenta del marcador si es posible y registra `REMOVE_SCORE` como auditoría.
        /// </remarks>
        adminG.MapPost("/games/{id:int}/remove-score", async (int id, [FromBody] ScoreDto b) =>
        {
            var team = (b?.Team ?? "").Trim().ToUpperInvariant();
            if (team is not ("HOME" or "AWAY")) return Results.BadRequest(new { error = "Team HOME/AWAY." });

            using var c = Open(cs());
            using var tx = c.BeginTransaction();

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

            var points = int.Parse(lastScore.EventType.Split('_')[1]);

            await Exec(c, $@"
                UPDATE {T}Matches
                SET HomeScore = CASE WHEN @team='HOME' THEN IIF(HomeScore>=@pts, HomeScore-@pts, HomeScore) ELSE HomeScore END,
                    AwayScore = CASE WHEN @team='AWAY' THEN IIF(AwayScore>=@pts, AwayScore-@pts, AwayScore) ELSE AwayScore END
                WHERE GameId=@id;", new { id, team, pts = points }, tx);

            await Exec(c, $"DELETE FROM {T}MatchEvents WHERE EventId=@eventId;", new { eventId = lastScore.EventId }, tx);

            await Exec(c, $@"
                INSERT INTO {T}MatchEvents(GameId, Quarter, Team, EventType)
                SELECT @id, Quarter, @team, 'REMOVE_SCORE' FROM {T}Matches WHERE GameId=@id;",
                new { id, team }, tx);

            tx.Commit();
            return Results.NoContent();
        }).WithOpenApi();

        /// <summary>
        /// Deshace el último evento de anotación o falta.
        /// </summary>
        /// <remarks>
        /// Ajusta el marcador si se trataba de un `POINT_*`, inserta un evento `UNDO` y elimina el evento original.
        /// </remarks>
        adminG.MapPost("/games/{id:int}/undo", async (int id) =>
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

        /// <summary>
        /// Lista equipos activos.
        /// </summary>
        /// <remarks>
        /// Devuelve `TeamId`, `Name`, `City` y `CreatedAt` de `core.Club` con `Active=1`.
        /// </remarks>
        g.MapGet("/teams", async () =>
        {
            using var c = new SqlConnection(cs());
            var rows = await c.QueryAsync($"SELECT TeamId, Name, City, CreatedAt FROM {T}Club WHERE Active=1 ORDER BY Name;");
            return Results.Ok(rows);
        }).WithOpenApi();

        /// <summary>
        /// Devuelve el logo binario de un equipo.
        /// </summary>
        /// <remarks>
        /// Responde archivo con tipo de contenido y nombre si existen metadatos; 404 si no hay logo.
        /// </remarks>
        g.MapGet("/teams/{teamId:int}/logo", async (int teamId) =>
        {
            using var c = new SqlConnection(cs());
            var row = await c.QuerySingleOrDefaultAsync<(byte[]? Logo, string? Ct, string? Fn)>($@"SELECT Logo, LogoContentType AS Ct, LogoFileName AS Fn
                FROM {T}Club WHERE TeamId=@teamId;", new { teamId });

            if (row.Equals(default) || row.Logo is null || row.Logo.Length == 0)
                return Results.NotFound();

            var ct = string.IsNullOrWhiteSpace(row.Ct) ? "application/octet-stream" : row.Ct;
            var fn = string.IsNullOrWhiteSpace(row.Fn) ? $"team-{teamId}-logo" : row.Fn;
            return Results.File(row.Logo, contentType: ct, fileDownloadName: fn, enableRangeProcessing: false);
        }).WithOpenApi();

        /// <summary>
        /// Crea un equipo.
        /// </summary>
        /// <remarks>
        /// Valida nombre (solo letras/espacios). Inserta en `core.Club` como activo.
        /// </remarks>
        adminG.MapPost("/teams", async ([FromBody] TeamCreateDto body) =>
        {
            var name = (body?.Name ?? "").Trim();
            if (IsNullOrWhite(name)) return Results.BadRequest(new { error = "Name requerido." });
            var rx = new Regex("^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$");
            if (!rx.IsMatch(name)) return Results.BadRequest(new { error = "Nombre inválido. Solo letras y espacios." });

            try
            {
                using var c = new SqlConnection(cs());
                var city = string.IsNullOrWhiteSpace(body?.City) ? null : body!.City!.Trim();
                var id = await c.ExecuteScalarAsync<int>($"INSERT INTO {T}Club(Name, City, Active) OUTPUT INSERTED.TeamId VALUES(@name, @city, 1);", new { name, city });
                return Results.Created($"/api/teams/{id}", new { teamId = id, name });
            }
            catch (SqlException ex) when (ex.Number is 2601 or 2627) { return Results.Conflict(new { error = "Nombre duplicado." }); }
        }).WithOpenApi();

        /// <summary>
        /// Da de baja lógica un equipo.
        /// </summary>
        /// <remarks>
        /// Marca `Active=0` en `core.Club` para el `teamId` indicado.
        /// </remarks>
        adminG.MapDelete("/teams/{teamId:int}", async (int teamId) =>
        {
            using var c = new SqlConnection(cs());
            var rows = await c.ExecuteAsync($"UPDATE {T}Club SET Active=0 WHERE TeamId=@teamId;", new { teamId });
            return rows > 0 ? Results.NoContent() : Results.NotFound();
        }).WithOpenApi();

        /// <summary>
        /// Actualiza nombre y/o ciudad de un equipo.
        /// </summary>
        /// <remarks>
        /// Valida el formato del nombre si se proporciona. Retorna 204 si hay cambios o 404 si no existe.
        /// </remarks>
        adminG.MapPatch("/teams/{teamId:int}", async (int teamId, [FromBody] UpdateTeamDto b) =>
        {
            string? name = b?.Name?.Trim();
            string? city = b?.City?.Trim();
            if ((name is null || name.Length == 0) && (city is null))
                return Results.BadRequest(new { error = "Nada para actualizar." });

            if (!string.IsNullOrEmpty(name))
            {
                var rx = new Regex("^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$");
                if (!rx.IsMatch(name)) return Results.BadRequest(new { error = "Nombre inválido. Solo letras y espacios." });
            }

            try
            {
                using var c = new SqlConnection(cs());
                var rows = await c.ExecuteAsync($@"UPDATE {T}Club SET
                    Name = COALESCE(@name, Name),
                    City = COALESCE(@city, City)
                  WHERE TeamId=@teamId;", new { teamId, name, city });
                return rows > 0 ? Results.NoContent() : Results.NotFound();
            }
            catch (SqlException ex) when (ex.Number is 2601 or 2627)
            {
                return Results.Conflict(new { error = "Nombre duplicado." });
            }
        }).WithOpenApi();

        /// <summary>
        /// Sube o actualiza el logo binario de un equipo.
        /// </summary>
        /// <remarks>
        /// Almacena bytes y metadatos del archivo en `core.Club` para el equipo indicado.
        /// </remarks>
        adminG.MapPost("/teams/{teamId:int}/logo", async (int teamId, [FromForm] IFormFile? logo) =>
        {
            if (logo == null || logo.Length == 0) return Results.BadRequest(new { error = "Archivo requerido." });
            using var ms = new MemoryStream();
            await logo.CopyToAsync(ms);
            var bytes = ms.ToArray();
            var ct = string.IsNullOrWhiteSpace(logo.ContentType) ? "application/octet-stream" : logo.ContentType;
            var fn = Path.GetFileName(logo.FileName ?? $"team-{teamId}-logo");

            using var c = new SqlConnection(cs());
            var ok = await c.ExecuteAsync($@"UPDATE {T}Club SET 
                    Logo=@logo, LogoContentType=@ct, LogoFileName=@fn
                WHERE TeamId=@teamId;",
                new { teamId, logo = bytes, ct, fn });
            return ok > 0 ? Results.NoContent() : Results.NotFound();
        }).DisableAntiforgery().WithOpenApi();

        /// <summary>
        /// Crea un juego emparejando dos equipos existentes.
        /// </summary>
        /// <remarks>
        /// Inserta en `core.Matches` referenciando `HomeTeamId` y `AwayTeamId` y crea registro en `core.MatchTimers`.
        /// </remarks>
        adminG.MapPost("/games/pair", async ([FromBody] PairDto body) =>
        {
            if (body.HomeTeamId <= 0 || body.AwayTeamId <= 0 || body.HomeTeamId == body.AwayTeamId)
                return Results.BadRequest(new { error = "Equipos inválidos." });
            
            var quarterMs = body.QuarterMs ?? 720000;
            
            if (quarterMs != 10000 && quarterMs != 30000 && quarterMs != 300000 && quarterMs != 600000 && quarterMs != 720000)
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

        /// <summary>
        /// Lista jugadores de un equipo.
        /// </summary>
        /// <remarks>
        /// Ordena por dorsal (si existe) y nombre. Solo lectura.
        /// </remarks>
        g.MapGet("/teams/{teamId:int}/players", async (int teamId) =>
        {
            using var c = new SqlConnection(cs());
            var rows = await c.QueryAsync($@"
                SELECT PlayerId, TeamId, Number, Name, Position, Active, CreatedAt
                FROM {T}Athletes WHERE TeamId=@teamId
                ORDER BY COALESCE(Number,255), Name;", new { teamId });
            return Results.Ok(rows);
        }).WithOpenApi();

        /// <summary>
        /// Crea un jugador en un equipo.
        /// </summary>
        /// <remarks>
        /// Valida nombre, estatura (1.20–2.50 m) y edad (10–70). Dorsal único por equipo.
        /// </remarks>
        adminG.MapPost("/teams/{teamId:int}/players", async (int teamId, [FromBody] CreatePlayerDto body) =>
        {
            var name = (body?.Name ?? "").Trim();
            if (IsNullOrWhite(name)) return Results.BadRequest(new { error = "Nombre es requerido." });

            if (body?.Height.HasValue == true && (body.Height < 1.20m || body.Height > 2.50m))
            {
                return Results.BadRequest(new { error = "La estatura debe estar entre 1.20 y 2.50 metros." });
            }

            if (body?.Age.HasValue == true && (body.Age < 10 || body.Age > 70))
            {
                return Results.BadRequest(new { error = "La edad debe estar entre 10 y 70 años." });
            }

            try
            {
                using var c = new SqlConnection(cs());
                var id = await c.ExecuteScalarAsync<int>($@"
                    INSERT INTO {T}Athletes(
                        TeamId, Number, Name, Position, 
                        Height, Age, Nationality, Active)
                    OUTPUT INSERTED.PlayerId 
                    VALUES(
                        @teamId, @num, @name, @pos, 
                        @height, @age, @nationality, 1);",
                    new { 
                        teamId, 
                        num = body!.Number, 
                        name, 
                        pos = body!.Position,
                        height = body!.Height,
                        age = body!.Age,
                        nationality = body!.Nationality
                    });
                return Results.Created($"/api/players/{id}", new { playerId = id });
            }
            catch (SqlException ex) when (ex.Number is 2601 or 2627) 
            { 
                return Results.BadRequest(new { error = "Dorsal duplicado en el mismo equipo." }); 
            }
        }).WithOpenApi();

        /// <summary>
        /// Actualiza campos de un jugador.
        /// </summary>
        /// <remarks>
        /// Permite cambios parciales. Valida estatura y edad si se incluyen.
        /// </remarks>
        adminG.MapPatch("/players/{playerId:int}", async (int playerId, [FromBody] UpdatePlayerDto b) =>
        {
            if (b?.Height.HasValue == true && (b.Height < 1.20m || b.Height > 2.50m))
            {
                return Results.BadRequest(new { error = "La estatura debe estar entre 1.20 y 2.50 metros." });
            }

            if (b?.Age.HasValue == true && (b.Age < 10 || b.Age > 70))
            {
                return Results.BadRequest(new { error = "La edad debe estar entre 10 y 70 años." });
            }

            using var c = new SqlConnection(cs());
            var ok = await c.ExecuteAsync($@"
                UPDATE {T}Athletes SET
                  Number=COALESCE(@Number,Number),
                  Name=COALESCE(@Name,Name),
                  Position=COALESCE(@Position,Position),
                  Height=COALESCE(@Height,Height),
                  Age=COALESCE(@Age,Age),
                  Nationality=COALESCE(@Nationality,Nationality),
                  Active=COALESCE(@Active,Active)
                WHERE PlayerId=@playerId;", 
                new { 
                    playerId, 
                    b?.Number, 
                    b?.Name, 
                    b?.Position,
                    b?.Height,
                    b?.Age,
                    b?.Nationality,
                    b?.Active 
                });
            return ok > 0 ? Results.NoContent() : Results.NotFound();
        }).WithOpenApi();

        /// <summary>
        /// Elimina un jugador por identificador.
        /// </summary>
        /// <remarks>
        /// Operación destructiva: borra la fila en `core.Athletes`.
        /// </remarks>
        adminG.MapDelete("/players/{playerId:int}", async (int playerId) =>
        {
            using var c = new SqlConnection(cs());
            var ok = await c.ExecuteAsync($"DELETE FROM {T}Athletes WHERE PlayerId=@playerId;", new { playerId });
            return ok > 0 ? Results.NoContent() : Results.NotFound();
        }).WithOpenApi();

        /// <summary>
        /// Obtiene el roster por juego para el lado indicado.
        /// </summary>
        /// <remarks>
        /// Resuelve `teamId` a partir del juego si no está set y lista jugadores del equipo local o visitante.
        /// </remarks>
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

        /// <summary>
        /// Resumen de faltas por equipo y por jugador.
        /// </summary>
        /// <remarks>
        /// Agrega eventos `FOUL` por cuarto y equipo, y por jugador si `PlayerId` no es nulo.
        /// </remarks>
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
