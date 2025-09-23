using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

public static class ClockEndpoints
{
    // Rutas de reloj de juego. Implementación alternativa para diferenciar el estilo
    // respecto a una versión que hacía más cálculo en SQL.

    public static void MapClockEndpoints(this WebApplication app, Func<string> cs)
    {
        // AYUDA A MEJORAR LA ESCRITURA A LA BASE DE DATOS
        static Task<int> Exec(SqlConnection c, string sql, object p) => c.ExecuteAsync(sql, p);

        // ENDPOINT PARA EXTRAER EL ESTADO ACTUAL DEL RELOJ

        app.MapGet("/api/games/{id:int}/clock", async (int id) =>
        {
            using var c = new SqlConnection(cs());
            var row = await c.QuerySingleOrDefaultAsync(@"
                SELECT GameId, Quarter, QuarterMs, RemainingMs, Running, StartedAt, UpdatedAt
                FROM [HoopsDB].[core].[MatchTimers]
                WHERE GameId = @id;", new { id });

        // SI NO HAY DATOS EN LA BD DEVOLVEMOS UN ERROR 404
            if (row is null) return Results.NotFound();

            // AQUI CONVERTIMOS LOS DATOS EXTRAIDOS DE LA BD EN UNA CONVERSION MAS SEGURA
            // ASI NO TENEMOS ERRORES SI NOS DAN TIPOS DE DATOS DISTINTOS
            int gameId = (int)row.GameId;
            byte quarter = (byte)row.Quarter;
            int quarterMs = (int)row.QuarterMs;
            int remainingMsDb = (int)row.RemainingMs;
            // VARIABLE PARA REALIZAR CÁLCULOS PARA EL TIEMPO
            int runningInt = row.Running is bool br ? (br ? 1 : 0) : Convert.ToInt32(row.Running);

            //CAMPOS DE FECHA Y HORA QUE OBTUVIMOS DE LA BD
            DateTime? startedAt = row.StartedAt as DateTime?;
            DateTime updatedAt = (DateTime)row.UpdatedAt;

            // DESDE C# CALCULAMOS EL TIEMPO RESTANTE DEL RELOJ
            var nowUtc = DateTime.UtcNow;
            var baseRemaining = remainingMsDb;
            var isRunning = runningInt != 0 && baseRemaining > 0;
            if (isRunning && startedAt.HasValue)
            {   //MILISEGUNDO QUE HAN PASADO DESDE QUE ESTÁ EN CURSO
                var elapsed = (int)(nowUtc - startedAt.Value).TotalMilliseconds;
                //AQUI AJUSTAMOS EL TIEMPO PARA QUE NO BAJE DE 0
                if (elapsed > 0)
                {
                    baseRemaining = Math.Max(0, baseRemaining - elapsed);
                }
            }

            return Results.Ok(new
            {
                gameId,
                quarter,
                quarterMs,
                running = isRunning,
                remainingMs = baseRemaining,
                updatedAt
            });
        }).WithOpenApi();

        app.MapPost("/api/games/{id:int}/clock/start", async (int id) =>
        {
            using var c = new SqlConnection(cs());
            var ok = await Exec(c, @"
                -- Asegura fila de temporizador
                IF NOT EXISTS (SELECT 1 FROM [HoopsDB].[core].[MatchTimers] WHERE GameId=@id)
                BEGIN
                    DECLARE @qms INT = 720000; -- 12 min default
                    INSERT INTO [HoopsDB].[core].[MatchTimers](GameId, Quarter, QuarterMs, RemainingMs, Running, StartedAt, UpdatedAt)
                    VALUES(@id, 1, @qms, @qms, 0, NULL, SYSUTCDATETIME());
                END

                -- Si está en cero, restablece a la duración del cuarto
                UPDATE [HoopsDB].[core].[MatchTimers]
                SET RemainingMs = CASE WHEN RemainingMs <= 0 THEN QuarterMs ELSE RemainingMs END,
                    Running = 1,
                    StartedAt = CASE WHEN Running = 1 AND StartedAt IS NOT NULL THEN StartedAt ELSE SYSUTCDATETIME() END,
                    UpdatedAt = SYSUTCDATETIME()
                WHERE GameId = @id;", new { id });
            return ok > 0 ? Results.NoContent() : Results.BadRequest(new { error = "No se pudo iniciar." });
        }).WithOpenApi();

        // POST pause
        app.MapPost("/api/games/{id:int}/clock/pause", async (int id) =>
        {
            using var c = new SqlConnection(cs());
            var ok = await Exec(c, @"
                UPDATE [HoopsDB].[core].[MatchTimers]
                SET RemainingMs = CASE WHEN Running = 1 AND StartedAt IS NOT NULL
                                        THEN IIF(RemainingMs > DATEDIFF(ms, StartedAt, SYSUTCDATETIME()),
                                                 RemainingMs - DATEDIFF(ms, StartedAt, SYSUTCDATETIME()), 0)
                                        ELSE RemainingMs END,
                    Running = 0,
                    StartedAt = NULL,
                    UpdatedAt = SYSUTCDATETIME()
                WHERE GameId = @id;", new { id });
            return ok > 0 ? Results.NoContent() : Results.NotFound();
        }).WithOpenApi();

        // POST reset (quarterMs opcional)
        app.MapPost("/api/games/{id:int}/clock/reset", async (int id, [FromBody] ClockResetDto? b) =>
        {
            using var c = new SqlConnection(cs());
            var ok = await Exec(c, @"
                -- Asegura fila de temporizador
                IF NOT EXISTS (SELECT 1 FROM [HoopsDB].[core].[MatchTimers] WHERE GameId=@id)
                BEGIN
                    DECLARE @def INT = COALESCE(@qms, 720000);
                    INSERT INTO [HoopsDB].[core].[MatchTimers](GameId, Quarter, QuarterMs, RemainingMs, Running, StartedAt, UpdatedAt)
                    VALUES(@id, 1, @def, @def, 0, NULL, SYSUTCDATETIME());
                END

                UPDATE [HoopsDB].[core].[MatchTimers]
                SET QuarterMs = COALESCE(@qms, QuarterMs),
                    RemainingMs = COALESCE(@qms, QuarterMs),
                    Running = 0,
                    StartedAt = NULL,
                    UpdatedAt = SYSUTCDATETIME()
                WHERE GameId = @id;", new { id, qms = b?.QuarterMs });
            return ok > 0 ? Results.NoContent() : Results.NotFound();
        }).WithOpenApi();
    }
}

// Modelo tipado para mapear filas de la tabla
file sealed record ClockRow
(
    int GameId,
    byte Quarter,
    int QuarterMs,
    int RemainingMs,
    int Running,
    DateTime? StartedAt,
    DateTime UpdatedAt
);