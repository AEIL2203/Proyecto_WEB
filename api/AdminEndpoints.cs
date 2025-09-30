using System.Text.RegularExpressions;
using System.IO;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Api.Auth.Services;

    /// <summary>
    /// Endpoints administrativos protegidos por la política <c>Admin</c>.
    /// </summary>
    /// <remarks>
    /// Gestiona catálogo de equipos (con carga de logos), administración de jugadores y CRUD de usuarios.
    /// </remarks>
    public static class AdminEndpoints
    {
        const string T = "HoopsDB.core.";

        /// <summary>
        /// Registra las rutas administrativas bajo <c>/api/admin</c>.
        /// </summary>
        /// <remarks>
        /// - Teams: listar, crear (JSON o multipart), actualizar, actualizar logo y baja lógica.
        /// - Players: eliminación directa por <c>playerId</c>.
        /// - Users: listar, crear, actualizar parcial y eliminar.
        /// </remarks>
        public static void MapAdminEndpoints(this WebApplication app, Func<string> cs)
        {
            var admin = app.MapGroup("/api/admin").RequireAuthorization("Admin");

            static bool IsNullOrWhite(string? s) => string.IsNullOrWhiteSpace(s);

        /// <summary>
        /// Lista equipos (con filtro opcional).
        /// </summary>
        /// <remarks>
        /// Si `q` está vacío, devuelve todos los equipos. Si no, filtra por `Name` o `City` con LIKE.
        /// </remarks>
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

        /// <summary>
        /// Crea un equipo (JSON).
        /// </summary>
        /// <remarks>
        /// Valida el nombre (letras y espacios). Permite `City` y `LogoUrl` opcionales. Maneja duplicados.
        /// </remarks>
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

        /// <summary>
        /// Crea un equipo con logo binario (multipart/form-data).
        /// </summary>
        /// <remarks>
        /// Acepta campos `name`, `city` y archivo `logo`. Almacena bytes y metadatos del logo en la tabla `Club`.
        /// </remarks>
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

        /// <summary>
        /// Actualiza solo el logo de un equipo (multipart/form-data).
        /// </summary>
        /// <remarks>
        /// Reemplaza el logo binario y sus metadatos y limpia `LogoUrl`.
        /// </remarks>
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

        /// <summary>
        /// Actualiza parcialmente un equipo.
        /// </summary>
        /// <remarks>
        /// Permite `Name`, `City` y `LogoUrl`. Usa COALESCE para mantener valores actuales.
        /// </remarks>
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

        /// <summary>
        /// Elimina un jugador por ID.
        /// </summary>
        /// <remarks>
        /// Operación destructiva. Devuelve 204 si se eliminó o 404 si no existe.
        /// </remarks>
        admin.MapDelete("/players/{playerId:int}", async (int playerId) =>
        {
            using var c = new SqlConnection(cs());
            var ok = await c.ExecuteAsync($"DELETE FROM {T}Athletes WHERE PlayerId=@playerId;", new { playerId });
            return ok > 0 ? Results.NoContent() : Results.NotFound();
        }).WithOpenApi();

        /// <summary>
        /// Lista usuarios (solo Admin).
        /// </summary>
        /// <remarks>
        /// Devuelve `UserId`, `UserName`, `Email`, `Role`, `Active` y `CreatedAt` ordenados por fecha de creación.
        /// </remarks>
        admin.MapGet("/users", async () =>
        {
            using var c = new SqlConnection(cs());
            var users = await c.QueryAsync($@"
                SELECT UserId, UserName, Email, Role, Active, CreatedAt 
                FROM {T}Users 
                ORDER BY CreatedAt DESC;");
            return Results.Ok(users);
        }).WithOpenApi();

        /// <summary>
        /// Crea un usuario (solo Admin).
        /// </summary>
        /// <remarks>
        /// Hashea la contraseña con BCrypt. Maneja conflictos por duplicados en nombre o email.
        /// </remarks>
        admin.MapPost("/users", async ([FromBody] CreateUserDto body, IPasswordHasher hasher) =>
        {
            var userName = (body?.UserName ?? string.Empty).Trim();
            var password = body?.Password ?? string.Empty;
            var email = string.IsNullOrWhiteSpace(body?.Email) ? null : body!.Email!.Trim();
            var role = string.IsNullOrWhiteSpace(body?.Role) ? "User" : body!.Role!.Trim();

            if (string.IsNullOrWhiteSpace(userName) || string.IsNullOrWhiteSpace(password))
                return Results.BadRequest(new { error = "UserName y Password requeridos." });

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
                return Results.Conflict(new { error = "Usuario o email ya existe." });
            }
        }).WithOpenApi();

        /// <summary>
        /// Actualiza parcialmente un usuario (solo Admin).
        /// </summary>
        /// <remarks>
        /// Construye dinámicamente la sentencia UPDATE según campos provistos. Maneja duplicados.
        /// </remarks>
        admin.MapPatch("/users/{userId:int}", async (int userId, [FromBody] UpdateUserDto body) =>
        {
            using var c = new SqlConnection(cs());
            
            var existingUser = await c.QuerySingleOrDefaultAsync($@"
                SELECT UserId, UserName, Email, Role, Active 
                FROM {T}Users 
                WHERE UserId = @userId", new { userId });
                
            if (existingUser == null)
                return Results.NotFound(new { error = "Usuario no encontrado." });

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

        /// <summary>
        /// Elimina un usuario por ID (solo Admin).
        /// </summary>
        /// <remarks>
        /// Operación destructiva. Devuelve 204 si se eliminó o 404 si no existe.
        /// </remarks>
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
