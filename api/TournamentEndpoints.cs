using Microsoft.Data.SqlClient;
using Dapper;
using System.Data;

namespace Api;

public static class TournamentEndpoints
{
    public static void MapTournamentEndpoints(this WebApplication app, Func<string> getConnectionString)
    {
        var group = app.MapGroup("/api/tournaments").WithTags("Tournaments");

        // GET /api/tournaments - Obtener todos los torneos
        group.MapGet("/", () => GetAllTournaments(getConnectionString()));
        
        // GET /api/tournaments/{id} - Obtener un torneo por ID
        group.MapGet("/{id:int}", (int id) => GetTournamentById(id, getConnectionString()));
        
        // POST /api/tournaments - Crear un nuevo torneo
        group.MapPost("/", (CreateTournamentDto dto) => CreateTournament(dto, getConnectionString()));
        
        // PUT /api/tournaments/{id} - Actualizar un torneo
        group.MapPut("/{id:int}", (int id, UpdateTournamentDto dto) => UpdateTournament(id, dto, getConnectionString()));
        
        // DELETE /api/tournaments/{id} - Eliminar un torneo
        group.MapDelete("/{id:int}", (int id) => DeleteTournament(id, getConnectionString()));
    }

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

    private static async Task<IResult> CreateTournament(CreateTournamentDto dto, string connectionString)
    {
        try
        {
            // Validaciones
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
            
            // Obtener el torneo creado
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
                
            // Obtener el torneo actualizado
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

// DTOs para los torneos
public record TournamentDto(
    int IdTorneo,
    string NombreTorneo,
    string? Descripcion,
    int NumeroEquipos,
    string Estado
);

public record CreateTournamentDto(
    string Nombre_torneo,
    string? Descripcion,
    int Numero_equipos,
    string? Estado
);

public record UpdateTournamentDto(
    string Nombre_torneo,
    string? Descripcion,
    int Numero_equipos,
    string Estado
);
