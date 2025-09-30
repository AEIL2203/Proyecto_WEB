using System;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

/// <summary>
/// Endpoints para el control del reloj del partido.
/// </summary>
/// <remarks>
/// - Expone operaciones para consultar estado, iniciar, pausar y reiniciar el reloj.
/// - Calcula en C# el tiempo restante en base a <c>StartedAt</c> y <c>RemainingMs</c> para mayor robustez.
/// - Asegura la fila en <c>MatchTimers</c> cuando corresponde.
/// </remarks>
public static class ClockEndpoints
{
    /// <summary>
    /// Registra las rutas del reloj de juego.
    /// </summary>
    /// <remarks>
    /// - GET <c>/api/games/{id}/clock</c>: devuelve estado calculado del reloj.
    /// - POST <c>/api/games/{id}/clock/start</c>: inicia o continúa el reloj.
    /// - POST <c>/api/games/{id}/clock/pause</c>: pausa y descuenta el tiempo transcurrido.
    /// - POST <c>/api/games/{id}/clock/reset</c>: reinicia la duración (opcionalmente ajusta <c>QuarterMs</c>).
    /// </remarks>
    public static void MapClockEndpoints(this WebApplication app, Func<string> cs)
    {
        static Task<int> Exec(SqlConnection c, string sql, object p) => c.ExecuteAsync(sql, p);

        /// <summary>
        /// Obtiene el estado actual del reloj del juego.
        /// </summary>
        /// <remarks>
        /// Calcula el tiempo restante en base a `StartedAt` y `RemainingMs` para devolver `remainingMs` y `running` precisos.
        /// </remarks>
        app.MapGet("/api/games/{id:int}/clock", async (int id) =>
        {
            using var c = new SqlConnection(cs());
            var row = await c.QuerySingleOrDefaultAsync(@"
                SELECT GameId, Quarter, QuarterMs, RemainingMs, Running, StartedAt, UpdatedAt
                FROM [HoopsDB].[core].[MatchTimers]
                WHERE GameId = @id;", new { id });

            if (row is null) return Results.NotFound();

            int gameId = (int)row.GameId;
            byte quarter = (byte)row.Quarter;
            int quarterMs = (int)row.QuarterMs;
            int remainingMsDb = (int)row.RemainingMs;
            int runningInt = row.Running is bool br ? (br ? 1 : 0) : Convert.ToInt32(row.Running);

            DateTime? startedAt = row.StartedAt as DateTime?;
            DateTime updatedAt = (DateTime)row.UpdatedAt;

            var nowUtc = DateTime.UtcNow;
            var baseRemaining = remainingMsDb;
            var isRunning = runningInt != 0 && baseRemaining > 0;
            if (isRunning && startedAt.HasValue)
            {
                var elapsed = (int)(nowUtc - startedAt.Value).TotalMilliseconds;
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

        /// <summary>
        /// Inicia o reanuda el reloj del juego.
        /// </summary>
        /// <remarks>
        /// Asegura la fila en `MatchTimers`. Si el tiempo está en cero, lo restablece a la duración del cuarto y pone `Running=1`.
        /// </remarks>
        app.MapPost("/api/games/{id:int}/clock/start", async (int id) =>
        {
            using var c = new SqlConnection(cs());
            var ok = await Exec(c, @"
                IF NOT EXISTS (SELECT 1 FROM [HoopsDB].[core].[MatchTimers] WHERE GameId=@id)
                BEGIN
                    DECLARE @qms INT = 720000;
                    INSERT INTO [HoopsDB].[core].[MatchTimers](GameId, Quarter, QuarterMs, RemainingMs, Running, StartedAt, UpdatedAt)
                    VALUES(@id, 1, @qms, @qms, 0, NULL, SYSUTCDATETIME());
                END

                UPDATE [HoopsDB].[core].[MatchTimers]
                SET RemainingMs = CASE WHEN RemainingMs <= 0 THEN QuarterMs ELSE RemainingMs END,
                    Running = 1,
                    StartedAt = CASE WHEN Running = 1 AND StartedAt IS NOT NULL THEN StartedAt ELSE SYSUTCDATETIME() END,
                    UpdatedAt = SYSUTCDATETIME()
                WHERE GameId = @id;", new { id });
            return ok > 0 ? Results.NoContent() : Results.BadRequest(new { error = "No se pudo iniciar." });
        }).WithOpenApi();

        /// <summary>
        /// Pausa el reloj del juego descontando el tiempo transcurrido.
        /// </summary>
        /// <remarks>
        /// Si estaba en ejecución, descuenta `DATEDIFF(ms, StartedAt, now)` de `RemainingMs`, pone `Running=0` y limpia `StartedAt`.
        /// </remarks>
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

        /// <summary>
        /// Reinicia el reloj del juego.
        /// </summary>
        /// <remarks>
        /// Si no existe `MatchTimers`, lo crea. Ajusta `QuarterMs` si se proporciona y pone `RemainingMs` a la misma duración, `Running=0`.
        /// </remarks>
        app.MapPost("/api/games/{id:int}/clock/reset", async (int id, [FromBody] ClockResetDto? b) =>
        {
            using var c = new SqlConnection(cs());
            var ok = await Exec(c, @"
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

/// <summary>
/// Representa el estado persistido del reloj en la tabla <c>MatchTimers</c>.
/// </summary>
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