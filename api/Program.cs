using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using MarcadorBaloncesto.Services;
using MarcadorBaloncesto.Middleware;
using MarcadorBaloncesto.Models;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using MarcadorBaloncesto.Infrastructure.Data;
using MarcadorBaloncesto.Infrastructure.Repositories;
using MarcadorBaloncesto.Application.Services;

var builder = WebApplication.CreateBuilder(args);

// Configuración de servicios
builder.Services.AddControllers();

// Configuración de CORS
var corsPolicyName = "AllowAngularApp";
var angularAppUrl = "http://localhost:4200";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: corsPolicyName,
        policy =>
        {
            policy.WithOrigins(angularAppUrl)
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});

// Configuración de autenticación JWT
var jwtSecret = builder.Configuration["Jwt:Secret"] ?? 
    throw new InvalidOperationException("JWT Secret no configurado");
var key = Encoding.ASCII.GetBytes(jwtSecret);

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
        ClockSkew = TimeSpan.Zero
    };
});

// Configuración de autorización
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
});

// Registrar servicios personalizados

var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING") 
    ?? builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("No hay cadena de conexión configurada");

builder.Services.AddScoped<IAuthService>(_ => new AuthService(builder.Configuration, connectionString));

// Infraestructura y aplicación
builder.Services.AddSingleton<ISqlConnectionFactory>(_ => new SqlConnectionFactory(connectionString));
builder.Services.AddScoped<IGameRepository, GameRepository>();
builder.Services.AddScoped<IGameService, GameService>();
builder.Services.AddScoped<IClockRepository, ClockRepository>();
builder.Services.AddScoped<IClockService, ClockService>();
builder.Services.AddScoped<ITeamRepository, TeamRepository>();
builder.Services.AddScoped<IPlayerRepository, PlayerRepository>();
builder.Services.AddScoped<ITeamService, TeamService>();
builder.Services.AddScoped<IPlayerService, PlayerService>();

var app = builder.Build();

// Configuración del pipeline HTTP
app.UseCors(corsPolicyName);
app.UseRouting();

// Manejo global de errores
app.UseMiddleware<ErrorHandlingMiddleware>();

// Agregar el middleware JWT
app.UseMiddleware<JwtMiddleware>();

// Habilitar autenticación y autorización
app.UseAuthentication();
app.UseAuthorization();

// Endpoint de salud
app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

// Proveedor de cadena de conexión como delegado reutilizable
var getCs = ConnectionStringHelper.Build(app);

// Mapear endpoints de la aplicación
app.MapGameEndpoints(getCs);
app.MapClockEndpoints(getCs);

// Mapear controladores
app.MapControllers();

app.Run();

// DTOs (manténlo aquí o muévelo a Dtos.cs)
record CreateGameDto(string? Home, string? Away, int? QuarterMs);
record TeamCreateDto(string Name);
record PairDto(int HomeTeamId, int AwayTeamId, int? QuarterMs);
record CreatePlayerDto(string Name, byte? Number, string? Position);
record UpdatePlayerDto(byte? Number, string? Name, string? Position, bool? Active);
record ScoreDto(string Team, int Points, int? PlayerId, int? PlayerNumber);
record FoulDto(string Team, int? PlayerId, int? PlayerNumber);
record ClockResetDto(int? QuarterMs);

// Helper para resolver la cadena de conexión con el mismo orden de prioridad
file static class ConnectionStringHelper
{
    public static Func<string> Build(WebApplication app)
        => () => Environment.GetEnvironmentVariable("DB_CONNECTION_STRING")
               ?? app.Configuration.GetConnectionString("DefaultConnection")
               ?? throw new InvalidOperationException("No hay cadena de conexión.");
}
