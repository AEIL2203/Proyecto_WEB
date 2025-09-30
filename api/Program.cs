/// <summary>
/// Punto de entrada de la API del marcador.
/// </summary>
/// <remarks>
/// - Registra servicios base (Swagger, CORS) y, si está configurado, la autenticación por JWT.
/// - Expone un endpoint de salud para monitoreo.
/// - Resuelve la cadena de conexión y mapea los endpoints del dominio (auth, juegos, reloj, torneos).
/// - Permite registrar el primer administrador y (temporalmente) crear usuarios públicos para pruebas.
/// </remarks>
using System.Text;
using Dapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Tokens;
using Api;
using Api.Auth.Services;

var b = WebApplication.CreateBuilder(args);
b.Services.AddEndpointsApiExplorer();
b.Services.AddSwaggerGen();
b.Services.AddCors(o => o.AddPolicy("Open", p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

b.Services.AddSingleton<IPasswordHasher, BcryptPasswordHasher>();
b.Services.AddSingleton<IJwtService, JwtService>();

var jwtKey = b.Configuration["Jwt:Key"];
if (string.IsNullOrWhiteSpace(jwtKey))
{
    b.Configuration["Jwt:Key"] = "dev-secret-change-me";
}

b.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(b.Configuration["Jwt:Key"]!)),
        ClockSkew = TimeSpan.FromSeconds(30)
    };
});

b.Services.AddAuthorization(opts =>
{
    opts.AddPolicy("Admin", policy => policy.RequireRole("Admin"));
});

app.UseCors("Open");

if (app.Environment.IsDevelopment()) { app.UseSwagger(); app.UseSwaggerUI(); }

app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

var getCs = ConnectionStringHelper.Build(app);

/// <summary>
/// Inicia sesión y emite un JWT.
/// </summary>
/// <remarks>
/// Valida credenciales contra `HoopsDB.core.Users`. Requiere usuario activo. Devuelve token y datos básicos del usuario.
/// </remarks>
app.MapPost("/api/auth/login", async (LoginDto login, IPasswordHasher hasher, IJwtService jwt) =>
{
    if (string.IsNullOrWhiteSpace(login.UserName) || string.IsNullOrWhiteSpace(login.Password))
        return Results.BadRequest(new { error = "UserName y Password requeridos." });

    using var c = new SqlConnection(getCs());
    var row = await c.QuerySingleOrDefaultAsync(
        "SELECT TOP 1 UserId, UserName, PasswordHash, Role, Active FROM HoopsDB.core.Users WHERE UserName=@u;",
        new { u = login.UserName });
    if (row is null || row.Active is bool act && !act)
        return Results.Unauthorized();

    string hash = (string)row.PasswordHash;
    if (!hasher.Verify(login.Password, hash))
        return Results.Unauthorized();

    string userName = (string)row.UserName;
    string role = (string)row.Role;
    var token = jwt.CreateToken(userName, role, null);
    return Results.Ok(new { token, user = new { userName, role } });
}).WithOpenApi();

/// <summary>
/// Devuelve la identidad autenticada.
/// </summary>
/// <remarks>
/// Requiere autenticación. Extrae `Name` y `Role` del token JWT vigente.
/// </remarks>
app.MapGet("/api/auth/me", [Authorize] (HttpContext ctx) =>
{
    var name = ctx.User.Identity?.Name ?? "";
    var role = ctx.User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value ?? "";
    return Results.Ok(new { userName = name, role });
}).WithOpenApi();

/// <summary>
/// Registra el primer usuario administrador.
/// </summary>
/// <remarks>
/// Solo permite la creación si no existen filas en `HoopsDB.core.Users`. Genera hash de contraseña con BCrypt.
/// </remarks>
app.MapPost("/api/auth/register-first", async (LoginDto reg, IPasswordHasher hasher) =>
{
    if (string.IsNullOrWhiteSpace(reg.UserName) || string.IsNullOrWhiteSpace(reg.Password))
        return Results.BadRequest(new { error = "UserName y Password requeridos." });
    using var c = new SqlConnection(getCs());
    var count = await c.ExecuteScalarAsync<int>("SELECT COUNT(1) FROM HoopsDB.core.Users;");
    if (count > 0) return Results.Forbid();
    var hash = hasher.Hash(reg.Password);
    var id = await c.ExecuteScalarAsync<int>(
        $"INSERT INTO HoopsDB.core.Users(UserName, PasswordHash, Role, Active) OUTPUT INSERTED.UserId VALUES(@u, @h, 'Admin', 1);",
        new { u = reg.UserName.Trim(), h = hash });
    return Results.Created($"/api/users/{id}", new { userId = id, userName = reg.UserName, role = "Admin" });
}).WithOpenApi();

/// <summary>
/// Registro público de usuarios (temporal para pruebas).
/// </summary>
/// <remarks>
/// Crea un usuario con rol por defecto `User` (o el proporcionado). Maneja conflictos por duplicados en UserName/Email.
/// </remarks>
app.MapPost("/api/auth/register", async (CreateUserPublicDto reg, IPasswordHasher hasher) =>
{
    if (string.IsNullOrWhiteSpace(reg.UserName) || string.IsNullOrWhiteSpace(reg.Password))
        return Results.BadRequest(new { error = "UserName y Password requeridos." });
    
    var hash = hasher.Hash(reg.Password);
    var email = string.IsNullOrWhiteSpace(reg.Email) ? null : reg.Email.Trim();
    var role = string.IsNullOrWhiteSpace(reg.Role) ? "User" : reg.Role.Trim();
    
    using var c = new SqlConnection(getCs());
    try
    {
        var id = await c.ExecuteScalarAsync<int>(
            "INSERT INTO HoopsDB.core.Users(UserName, Email, PasswordHash, Role, Active) OUTPUT INSERTED.UserId VALUES(@u, @e, @h, @r, 1);",
            new { u = reg.UserName.Trim(), e = email, h = hash, r = role });
        return Results.Created($"/api/users/{id}", new { userId = id, userName = reg.UserName, email, role });
    }
    catch (SqlException ex) when (ex.Number is 2601 or 2627)
    {
        return Results.Conflict(new { error = "Usuario o email ya existe." });
    }
}).WithOpenApi();

// Mapeo de endpoints del dominio
app.MapGameEndpoints(getCs);
app.MapClockEndpoints(getCs);
app.MapAdminEndpoints(getCs);
app.MapTournamentEndpoints(getCs);

app.Run();

record CreateGameDto(string? Home, string? Away, int? QuarterMs);
record TeamCreateDto(string Name, string? City, string? LogoUrl);
record UpdateTeamDto(string? Name, string? City, string? LogoUrl);
record PairDto(int HomeTeamId, int AwayTeamId, int? QuarterMs);
record CreatePlayerDto(string Name, byte? Number, string? Position, decimal? Height, byte? Age, string? Nationality);
record UpdatePlayerDto(byte? Number, string? Name, string? Position, decimal? Height, byte? Age, string? Nationality, bool? Active);
record ScoreDto(string Team, int Points, int? PlayerId, int? PlayerNumber);
record FoulDto(string Team, int? PlayerId, int? PlayerNumber);
record ClockResetDto(int? QuarterMs);
record LoginDto(string UserName, string Password);
record CreateUserPublicDto(string UserName, string Password, string? Email, string? Role);

/// <summary>
/// Proveedor de cadena de conexión para SQL Server.
/// </summary>
/// <remarks>
/// Prioriza la variable de entorno <c>DB_CONNECTION_STRING</c> y luego <c>ConnectionStrings:DefaultConnection</c>.
/// Lanza una excepción si ninguna está definida.
/// </remarks>
file static class ConnectionStringHelper
{
    public static Func<string> Build(WebApplication app)
        => () => Environment.GetEnvironmentVariable("DB_CONNECTION_STRING")
               ?? app.Configuration.GetConnectionString("DefaultConnection")
               ?? throw new InvalidOperationException("No hay cadena de conexión.");
}
