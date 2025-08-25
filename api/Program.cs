// Usings mínimos; Program no usa Dapper/SqlClient directamente

var b = WebApplication.CreateBuilder(args);
// Swagger y CORS con una política nombrada para diferenciar el estilo
b.Services.AddEndpointsApiExplorer();
b.Services.AddSwaggerGen();
b.Services.AddCors(o => o.AddPolicy("Open", p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

var app = b.Build();
app.UseCors("Open");

if (app.Environment.IsDevelopment()) { app.UseSwagger(); app.UseSwaggerUI(); }

app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

// Proveedor de cadena de conexión como delegado reutilizable
var getCs = ConnectionStringHelper.Build(app);

app.MapGameEndpoints(getCs);
app.MapClockEndpoints(getCs);

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
