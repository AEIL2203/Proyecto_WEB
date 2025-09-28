using System.Text.RegularExpressions;
using System.IO;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Api.Auth.Services;

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
            else
            {
                var pat = "%" + q.Trim() + "%";
                var rows = await c.QueryAsync($@"SELECT TeamId, Name, City, LogoUrl, CreatedAt
                    FROM {T}Club
                    WHERE Name LIKE @pat OR City LIKE @pat
                    ORDER BY Name;", new { pat });
                return Results.Ok(rows);
            }
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
                var id = await c.ExecuteScalarAsync<int>($@"INSERT INTO {T}Club(Name, City, LogoUrl)
                    OUTPUT INSERTED.TeamId
                    VALUES(@name, @city, @logoUrl);",
                    new { name, city = string.IsNullOrWhiteSpace(body?.City) ? null : body!.City!.Trim(), logoUrl = string.IsNullOrWhiteSpace(body?.LogoUrl) ? null : body!.LogoUrl!.Trim() });
                return Results.Created($"/api/admin/teams/{id}", new { teamId = id });
            }
            catch (SqlException ex) when (ex.Number is 2601 or 2627)
            {
                return Results.Conflict(new { error = "Nombre duplicado." });
            }
        }).WithOpenApi();

        // POST /api/admin/teams/upload (multipart/form-data) - crear equipo con logo binario
        admin.MapPost("/teams/upload", async (HttpRequest req) =>
        {
            if (!req.HasFormContentType)
                return Results.BadRequest(new { error = "Content-Type debe ser multipart/form-data" });
            var form = await req.ReadFormAsync();
            var name = (form["name"].ToString() ?? string.Empty).Trim();
            var city = string.IsNullOrWhiteSpace(form["city"]) ? null : form["city"].ToString().Trim();
            if (IsNullOrWhite(name)) return Results.BadRequest(new { error = "Name requerido." });
            var rx = new Regex("^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$");
            if (!rx.IsMatch(name)) return Results.BadRequest(new { error = "Nombre inválido. Solo letras y espacios." });

            var file = form.Files["logo"];
            byte[]? bytes = null; string? contentType = null; string? fileName = null;
            if (file is not null && file.Length > 0)
            {
                contentType = string.IsNullOrWhiteSpace(file.ContentType) ? "application/octet-stream" : file.ContentType;
                fileName = file.FileName;
                using var ms = new MemoryStream();
                await file.CopyToAsync(ms);
                bytes = ms.ToArray();
            }

            using var c = new SqlConnection(cs());
            try
            {
                var id = await c.ExecuteScalarAsync<int>($@"INSERT INTO {T}Club(Name, City, LogoUrl, Logo, LogoContentType, LogoFileName)
                    OUTPUT INSERTED.TeamId
                    VALUES(@name, @city, NULL, @logo, @ct, @fn);",
                    new { name, city, logo = bytes, ct = contentType, fn = fileName });
                return Results.Created($"/api/admin/teams/{id}", new { teamId = id });
            }
            catch (SqlException ex) when (ex.Number is 2601 or 2627)
            {
                return Results.Conflict(new { error = "Nombre duplicado." });
            }
        }).WithOpenApi();

        // PUT /api/admin/teams/{teamId}/logo (multipart/form-data) - actualizar solo el logo
        admin.MapPut("/teams/{teamId:int}/logo", async (int teamId, HttpRequest req) =>
        {
            if (!req.HasFormContentType)
                return Results.BadRequest(new { error = "Content-Type debe ser multipart/form-data" });

            var form = await req.ReadFormAsync();
            var file = form.Files["logo"];
            if (file is null || file.Length == 0)
                return Results.BadRequest(new { error = "Archivo 'logo' requerido." });

            var contentType = string.IsNullOrWhiteSpace(file.ContentType) ? "application/octet-stream" : file.ContentType;
            var fileName = file.FileName;
            byte[] bytes;
            using (var ms = new MemoryStream())
            {
                await file.CopyToAsync(ms);
                bytes = ms.ToArray();
            }

            using var c = new SqlConnection(cs());
            var ok = await c.ExecuteAsync($@"UPDATE {T}Club
                SET Logo = @logo,
                    LogoContentType = @ct,
                    LogoFileName = @fn,
                    LogoUrl = NULL
                WHERE TeamId = @teamId;",
                new { teamId, logo = bytes, ct = contentType, fn = fileName });
            return ok > 0 ? Results.NoContent() : Results.NotFound();
        }).WithOpenApi();

        // PATCH /api/admin/teams/{teamId}
        admin.MapPatch("/teams/{teamId:int}", async (int teamId, [FromBody] UpdateTeamDto body) =>
        {
            using var c = new SqlConnection(cs());
            var ok = await c.ExecuteAsync($@"UPDATE {T}Club SET
                  Name = COALESCE(@Name, Name),
                  City = COALESCE(@City, City),
                  LogoUrl = COALESCE(@LogoUrl, LogoUrl)
                WHERE TeamId=@teamId;",
                new { teamId, body?.Name, body?.City, body?.LogoUrl });
            return ok > 0 ? Results.NoContent() : Results.NotFound();
        }).WithOpenApi();

        admin.MapDelete("/players/{playerId:int}", async (int playerId) =>
        {
            using var c = new SqlConnection(cs());
            var ok = await c.ExecuteAsync($"DELETE FROM {T}Athletes WHERE PlayerId=@playerId;", new { playerId });
            return ok > 0 ? Results.NoContent() : Results.NotFound();
        }).WithOpenApi();

        // GET /api/admin/users - obtener lista de usuarios (Admin-only)
        admin.MapGet("/users", async () =>
        {
            using var c = new SqlConnection(cs());
            var users = await c.QueryAsync($@"
                SELECT UserId, UserName, Email, Role, Active, CreatedAt 
                FROM {T}Users 
                ORDER BY CreatedAt DESC;");
            return Results.Ok(users);
        }).WithOpenApi();

        // POST /api/admin/users - crear usuario (Admin-only)
        admin.MapPost("/users", async ([FromBody] CreateUserDto body, IPasswordHasher hasher) =>
        {
            var userName = (body?.UserName ?? string.Empty).Trim();
            var password = body?.Password ?? string.Empty;
            var email = string.IsNullOrWhiteSpace(body?.Email) ? null : body!.Email!.Trim();
            var role = string.IsNullOrWhiteSpace(body?.Role) ? "User" : body!.Role!.Trim();

            if (string.IsNullOrWhiteSpace(userName) || string.IsNullOrWhiteSpace(password))
                return Results.BadRequest(new { error = "UserName y Password requeridos." });

            // Hash de contraseña
            var hash = hasher.Hash(password);

            using var c = new SqlConnection(cs());
            try
            {
                var id = await c.ExecuteScalarAsync<int>($@"INSERT INTO {T}Users(UserName, Email, PasswordHash, Role, Active)
                    OUTPUT INSERTED.UserId VALUES(@userName, @email, @hash, @role, 1);",
                    new { userName, email, hash, role });
                return Results.Created($"/api/admin/users/{id}", new { userId = id, userName, email, role });
            }
            catch (SqlException ex) when (ex.Number is 2601 or 2627)
            {
                // Índices únicos en UserName y Email
                return Results.Conflict(new { error = "Usuario o email ya existe." });
            }
        }).WithOpenApi();

        // PATCH /api/admin/users/{userId} - actualizar usuario (Admin-only)
        admin.MapPatch("/users/{userId:int}", async (int userId, [FromBody] UpdateUserDto body) =>
        {
            using var c = new SqlConnection(cs());
            
            // Verificar que el usuario existe
            var existingUser = await c.QuerySingleOrDefaultAsync($@"
                SELECT UserId, UserName, Email, Role, Active 
                FROM {T}Users 
                WHERE UserId = @userId", new { userId });
                
            if (existingUser == null)
                return Results.NotFound(new { error = "Usuario no encontrado." });

            // Construir la consulta de actualización dinámicamente
            var updates = new List<string>();
            var parameters = new Dictionary<string, object> { { "userId", userId } };

            if (!string.IsNullOrWhiteSpace(body?.UserName))
            {
                updates.Add("UserName = @userName");
                parameters["userName"] = body.UserName.Trim();
            }

            if (!string.IsNullOrWhiteSpace(body?.Email))
            {
                updates.Add("Email = @email");
                parameters["email"] = body.Email.Trim();
            }

            if (!string.IsNullOrWhiteSpace(body?.Role))
            {
                updates.Add("Role = @role");
                parameters["role"] = body.Role.Trim();
            }

            if (body?.Active.HasValue == true)
            {
                updates.Add("Active = @active");
                parameters["active"] = body.Active.Value;
            }

            if (updates.Count == 0)
                return Results.BadRequest(new { error = "No hay campos para actualizar." });

            try
            {
                var sql = $"UPDATE {T}Users SET {string.Join(", ", updates)} WHERE UserId = @userId";
                var rowsAffected = await c.ExecuteAsync(sql, parameters);
                
                if (rowsAffected > 0)
                {
                    // Devolver el usuario actualizado
                    var updatedUser = await c.QuerySingleAsync($@"
                        SELECT UserId, UserName, Email, Role, Active, CreatedAt 
                        FROM {T}Users 
                        WHERE UserId = @userId", new { userId });
                    return Results.Ok(updatedUser);
                }
                else
                {
                    return Results.NotFound(new { error = "Usuario no encontrado." });
                }
            }
            catch (SqlException ex) when (ex.Number is 2601 or 2627)
            {
                return Results.Conflict(new { error = "Nombre de usuario o email ya existe." });
            }
        }).WithOpenApi();

        // DELETE /api/admin/users/{userId} - eliminar usuario (Admin-only)
        admin.MapDelete("/users/{userId:int}", async (int userId) =>
        {
            using var c = new SqlConnection(cs());
            var rowsAffected = await c.ExecuteAsync($"DELETE FROM {T}Users WHERE UserId = @userId", new { userId });
            return rowsAffected > 0 ? Results.NoContent() : Results.NotFound();
        }).WithOpenApi();
    }

    // DTOs locales
    public record CreateUserDto(string UserName, string Password, string? Email, string? Role);
    public record UpdateUserDto(string? UserName, string? Email, string? Role, bool? Active);
}
