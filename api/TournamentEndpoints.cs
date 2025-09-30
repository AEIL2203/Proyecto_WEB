using Microsoft.Data.SqlClient;
using Dapper;
using System.Data;

namespace Api;

/// <summary>
/// Endpoints para la administración de torneos.
/// </summary>
/// <remarks>
/// Provee operaciones CRUD con Dapper sobre la tabla <c>core.Tournaments</c>.
/// Incluye validaciones mínimas de entrada y manejo de errores consistente (<c>Results.Problem</c>).
/// </remarks>
public static class TournamentEndpoints
{
    /// <summary>
    /// Registra las rutas de torneos bajo <c>/api/tournaments</c>.
    /// </summary>
    /// <remarks>
    /// - GET <c>/</c>: lista todos los torneos.
    /// - GET <c>/{id}</c>: obtiene un torneo por ID.
    /// - POST <c>/</c>: crea un torneo.
    /// - PUT <c>/{id}</c>: actualiza un torneo.
    /// - DELETE <c>/{id}</c>: elimina un torneo.
    /// </remarks>
    public static void MapTournamentEndpoints(this WebApplication app, Func<string> getConnectionString)
    {
        var group = app.MapGroup("/api/tournaments").WithTags("Tournaments");

        /// <summary>
        /// Lista todos los torneos.
        /// </summary>
        /// <remarks>
        /// Devuelve colección de torneos ordenada por ID descendente.
        /// </remarks>
        group.MapGet("/", () => GetAllTournaments(getConnectionString()));

        /// <summary>
        /// Obtiene un torneo por ID.
        /// </summary>
        /// <remarks>
        /// Devuelve 404 si no se encuentra el torneo.
        /// </remarks>
        group.MapGet("/{id:int}", (int id) => GetTournamentById(id, getConnectionString()));

        /// <summary>
        /// Crea un nuevo torneo.
        /// </summary>
        /// <remarks>
        /// Valida nombre obligatorio y número de equipos > 0. Estado por defecto: PROGRAMADO.
        /// </remarks>
        group.MapPost("/", (CreateTournamentDto dto) => CreateTournament(dto, getConnectionString()));

        /// <summary>
        /// Actualiza un torneo existente.
        /// </summary>
        /// <remarks>
        /// Devuelve 404 si no existe. Devuelve el recurso actualizado.
        /// </remarks>
        group.MapPut("/{id:int}", (int id, UpdateTournamentDto dto) => UpdateTournament(id, dto, getConnectionString()));

        /// <summary>
        /// Elimina un torneo por ID.
        /// </summary>
        /// <remarks>
        /// Devuelve 204 en éxito o 404 si no existe.
        /// </remarks>
        group.MapDelete("/{id:int}", (int id) => DeleteTournament(id, getConnectionString()));
    }

    /// <summary>
    /// Obtiene la lista de torneos.
    /// </summary>
    private static async Task<IResult> GetAllTournaments(string connectionString)
    {
        try
        {
            using var connection = new SqlConnection(connectionString);
            
            var tournaments = await connection.QueryAsync<TournamentDto>(
                @"SELECT ID_torneo AS IdTorneo, 
                         Nombre_torneo AS NombreTorneo, 
                         Descripcion, 
                         Numero_equipos AS NumeroEquipos, 
                         Estado 
                  FROM core.Tournaments 
                  ORDER BY ID_torneo DESC"
            );
            
            return Results.Ok(tournaments);
        }
        catch (Exception ex)
        {
            return Results.Problem($"Error al obtener torneos: {ex.Message}");
        }
    }

    /// <summary>
    /// Obtiene un torneo por identificador.
    /// </summary>
    private static async Task<IResult> GetTournamentById(int id, string connectionString)
    {
        try
        {
            using var connection = new SqlConnection(connectionString);
            
            var tournament = await connection.QueryFirstOrDefaultAsync<TournamentDto>(
                @"SELECT ID_torneo AS IdTorneo, 
                         Nombre_torneo AS NombreTorneo, 
                         Descripcion, 
                         Numero_equipos AS NumeroEquipos, 
                         Estado 
                  FROM core.Tournaments 
                  WHERE ID_torneo = @Id",
                new { Id = id }
            );
            
            if (tournament == null)
                return Results.NotFound($"Torneo con ID {id} no encontrado");
                
            return Results.Ok(tournament);
        }
        catch (Exception ex)
        {
            return Results.Problem($"Error al obtener torneo: {ex.Message}");
        }
    }

    /// <summary>
    /// Crea un nuevo torneo.
    /// </summary>
    private static async Task<IResult> CreateTournament(CreateTournamentDto dto, string connectionString)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(dto.Nombre_torneo))
                return Results.BadRequest("El nombre del torneo es obligatorio");
                
            if (dto.Numero_equipos <= 0)
                return Results.BadRequest("El número de equipos debe ser mayor a 0");

            using var connection = new SqlConnection(connectionString);
            
            var tournamentId = await connection.QuerySingleAsync<int>(
                @"INSERT INTO core.Tournaments (Nombre_torneo, Descripcion, Numero_equipos, Estado) 
                  OUTPUT INSERTED.ID_torneo
                  VALUES (@Nombre_torneo, @Descripcion, @Numero_equipos, @Estado)",
                new
                {
                    dto.Nombre_torneo,
                    dto.Descripcion,
                    dto.Numero_equipos,
                    Estado = dto.Estado ?? "PROGRAMADO"
                }
            );
            
            var createdTournament = await connection.QueryFirstAsync<TournamentDto>(
                @"SELECT ID_torneo AS IdTorneo, 
                         Nombre_torneo AS NombreTorneo, 
                         Descripcion, 
                         Numero_equipos AS NumeroEquipos, 
                         Estado 
                  FROM core.Tournaments 
                  WHERE ID_torneo = @Id",
                new { Id = tournamentId }
            );
            
            return Results.Created($"/api/tournaments/{tournamentId}", createdTournament);
        }
        catch (Exception ex)
        {
            return Results.Problem($"Error al crear torneo: {ex.Message}");
        }
    }

    /// <summary>
    /// Actualiza un torneo existente.
    /// </summary>
    private static async Task<IResult> UpdateTournament(int id, UpdateTournamentDto dto, string connectionString)
    {
        try
        {
            using var connection = new SqlConnection(connectionString);
            
            var rowsAffected = await connection.ExecuteAsync(
                @"UPDATE core.Tournaments 
                  SET Nombre_torneo = @Nombre_torneo, 
                      Descripcion = @Descripcion, 
                      Numero_equipos = @Numero_equipos, 
                      Estado = @Estado 
                  WHERE ID_torneo = @Id",
                new
                {
                    Id = id,
                    dto.Nombre_torneo,
                    dto.Descripcion,
                    dto.Numero_equipos,
                    dto.Estado
                }
            );
            
            if (rowsAffected == 0)
                return Results.NotFound($"Torneo con ID {id} no encontrado");
                
            var updatedTournament = await connection.QueryFirstAsync<TournamentDto>(
                @"SELECT ID_torneo AS IdTorneo, 
                         Nombre_torneo AS NombreTorneo, 
                         Descripcion, 
                         Numero_equipos AS NumeroEquipos, 
                         Estado 
                  FROM core.Tournaments 
                  WHERE ID_torneo = @Id",
                new { Id = id }
            );
            
            return Results.Ok(updatedTournament);
        }
        catch (Exception ex)
        {
            return Results.Problem($"Error al actualizar torneo: {ex.Message}");
        }
    }

    /// <summary>
    /// Elimina un torneo por identificador.
    /// </summary>
    private static async Task<IResult> DeleteTournament(int id, string connectionString)
    {
        try
        {
            using var connection = new SqlConnection(connectionString);
            
            var rowsAffected = await connection.ExecuteAsync(
                "DELETE FROM core.Tournaments WHERE ID_torneo = @Id",
                new { Id = id }
            );
            
            if (rowsAffected == 0)
                return Results.NotFound($"Torneo con ID {id} no encontrado");
                
            return Results.NoContent();
        }
        catch (Exception ex)
        {
            return Results.Problem($"Error al eliminar torneo: {ex.Message}");
        }
    }
}

/// <summary>
/// Representación de lectura de un torneo.
/// </summary>
public record TournamentDto(
    int IdTorneo,
    string NombreTorneo,
    string? Descripcion,
    int NumeroEquipos,
    string Estado
);

/// <summary>
/// Modelo de creación para torneos.
/// </summary>
public record CreateTournamentDto(
    string Nombre_torneo,
    string? Descripcion,
    int Numero_equipos,
    string? Estado
);

/// <summary>
/// Modelo de actualización para torneos.
/// </summary>
public record UpdateTournamentDto(
    string Nombre_torneo,
    string? Descripcion,
    int Numero_equipos,
    string Estado
);
