using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

using MarcadorBaloncesto.Application.Services;

public static class ClockEndpoints
{

    /*
   * @summary Maneja el cronómetro del partido.
   * Conjunto de endpoints que administran el reloj del partido.
   * Permiten consultar, iniciar, pausar y reiniciar el cronómetro,
   * delegando el cálculo del tiempo restante a la lógica en C#
   * en lugar de la base de datos.
   */
   
    public static void MapClockEndpoints(this WebApplication app, Func<string> cs)
    {
        // ENDPOINT PARA EXTRAER EL ESTADO ACTUAL DEL RELOJ

        app.MapGet("/api/games/{id:int}/clock", async ([FromServices] IClockService svc, int id) =>
        {
            var payload = await svc.GetAsync(id);
            return payload is null ? Results.NotFound() : Results.Ok(payload);
        }).WithOpenApi();


        app.MapPost("/api/games/{id:int}/clock/start", async ([FromServices] IClockService svc, int id) =>
        {
            await svc.StartAsync(id);
            return Results.NoContent();
        }).WithOpenApi();

        // POST pause
        app.MapPost("/api/games/{id:int}/clock/pause", async ([FromServices] IClockService svc, int id) =>
        {
            await svc.PauseAsync(id);
            return Results.NoContent();
        }).WithOpenApi();

        // POST reset (quarterMs opcional)
        app.MapPost("/api/games/{id:int}/clock/reset", async ([FromServices] IClockService svc, int id, [FromBody] ClockResetDto? b) =>
        {
            await svc.ResetAsync(id, b?.QuarterMs);
            return Results.NoContent();
        }).WithOpenApi();
    }
}