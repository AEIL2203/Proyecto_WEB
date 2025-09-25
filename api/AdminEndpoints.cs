using System.Text.RegularExpressions;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

public static class AdminEndpoints
{
    const string T = "HoopsDB.core.";

    public static void MapAdminEndpoints(this WebApplication app, Func<string> cs)
    {
        var admin = app.MapGroup("/api/admin").RequireAuthorization("Admin");

        static bool IsNullOrWhite(string? s) => string.IsNullOrWhiteSpace(s);

        // GET /api/admin/teams?q=
        admin.MapGet("/teams", async ([FromQuery] string? q) =>
        {
            using var c = new SqlConnection(cs());
            if (string.IsNullOrWhiteSpace(q))
            {
                var rowsAll = await c.QueryAsync($"SELECT TeamId, Name, City, LogoUrl, CreatedAt FROM {T}Club ORDER BY Name;");
                return Results.Ok(rowsAll);
            }
            var pat = "%" + q.Trim() + "%";
            var rows = await c.QueryAsync($@"
                SELECT TeamId, Name, City, LogoUrl, CreatedAt
                FROM {T}Club
                WHERE Name LIKE @pat OR City LIKE @pat
                ORDER BY Name;", new { pat });
            return Results.Ok(rows);
        }).WithOpenApi();

        // POST /api/admin/teams
        admin.MapPost("/teams", async ([FromBody] TeamCreateDto body) =>
        {
            var name = (body?.Name ?? "").Trim();
            if (IsNullOrWhite(name)) return Results.BadRequest(new { error = "Name requerido." });
            var rx = new Regex("^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$");
            if (!rx.IsMatch(name)) return Results.BadRequest(new { error = "Nombre inválido. Solo letras y espacios." });

            using var c = new SqlConnection(cs());
            try
            {
                var id = await c.ExecuteScalarAsync<int>($@"
                    INSERT INTO {T}Club(Name, City, LogoUrl)
                    OUTPUT INSERTED.TeamId
                    VALUES(@name, @city, @logo);
                ", new { name, city = string.IsNullOrWhiteSpace(body?.City) ? null : body!.City!.Trim(), logo = string.IsNullOrWhiteSpace(body?.LogoUrl) ? null : body!.LogoUrl!.Trim() });
                return Results.Created($"/api/admin/teams/{id}", new { teamId = id });
            }
            catch (SqlException ex) when (ex.Number is 2601 or 2627)
            {
                return Results.Conflict(new { error = "Nombre duplicado." });
            }
        }).WithOpenApi();

        // PATCH /api/admin/teams/{teamId}
        admin.MapPatch("/teams/{teamId:int}", async (int teamId, [FromBody] UpdateTeamDto body) =>
        {
            using var c = new SqlConnection(cs());
            var ok = await c.ExecuteAsync($@"
                UPDATE {T}Club SET
                  Name = COALESCE(@Name, Name),
                  City = COALESCE(@City, City),
                  LogoUrl = COALESCE(@LogoUrl, LogoUrl)
                WHERE TeamId=@teamId;",
                new { teamId, body?.Name, body?.City, body?.LogoUrl });
            return ok > 0 ? Results.NoContent() : Results.NotFound();
        }).WithOpenApi();

        // DELETE /api/admin/teams/{teamId}
        admin.MapDelete("/teams/{teamId:int}", async (int teamId) =>
        {
            using var c = new SqlConnection(cs());
            var ok = await c.ExecuteAsync($"DELETE FROM {T}Club WHERE TeamId=@teamId;", new { teamId });
            return ok > 0 ? Results.NoContent() : Results.NotFound();
        }).WithOpenApi();

        // Players admin (create/update/delete) remain protected via Admin group
        admin.MapPost("/teams/{teamId:int}/players", async (int teamId, [FromBody] CreatePlayerDto body) =>
        {
            var name = (body?.Name ?? "").Trim();
            if (IsNullOrWhite(name)) return Results.BadRequest(new { error = "Name requerido." });

            using var c = new SqlConnection(cs());
            try
            {
                var id = await c.ExecuteScalarAsync<int>($@"
                    INSERT INTO {T}Athletes(TeamId, Number, Name, Position, Active)
                    OUTPUT INSERTED.PlayerId VALUES(@teamId,@num,@name,@pos,1);",
                    new { teamId, num = body!.Number, name, pos = body!.Position });
                return Results.Created($"/api/admin/players/{id}", new { playerId = id });
            }
            catch (SqlException ex) when (ex.Number is 2601 or 2627)
            {
                return Results.BadRequest(new { error = "Dorsal duplicado." });
            }
        }).WithOpenApi();

        admin.MapPatch("/players/{playerId:int}", async (int playerId, [FromBody] UpdatePlayerDto b) =>
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

        admin.MapDelete("/players/{playerId:int}", async (int playerId) =>
        {
            using var c = new SqlConnection(cs());
            var ok = await c.ExecuteAsync($"DELETE FROM {T}Athletes WHERE PlayerId=@playerId;", new { playerId });
            return ok > 0 ? Results.NoContent() : Results.NotFound();
        }).WithOpenApi();
    }
}
