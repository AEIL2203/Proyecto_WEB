using MarcadorBaloncesto.Infrastructure.Data;
using MarcadorBaloncesto.Infrastructure.Repositories;
using Microsoft.Data.SqlClient;

namespace MarcadorBaloncesto.Application.Services
{
    public interface ITeamService
    {
        Task<IEnumerable<(int TeamId, string Name, DateTime CreatedAt)>> ListAsync();
        Task<(bool Ok, int TeamId, string? Error)> CreateAsync(string name);
    }

    public sealed class TeamService : ITeamService
    {
        private readonly ISqlConnectionFactory _factory;
        private readonly ITeamRepository _repo;

        public TeamService(ISqlConnectionFactory factory, ITeamRepository repo)
        {
            _factory = factory;
            _repo = repo;
        }

        public async Task<IEnumerable<(int TeamId, string Name, DateTime CreatedAt)>> ListAsync()
        {
            using var c = _factory.Create();
            return await _repo.ListAsync(c);
        }

        public async Task<(bool Ok, int TeamId, string? Error)> CreateAsync(string name)
        {
            name = (name ?? string.Empty).Trim();
            if (string.IsNullOrWhiteSpace(name)) return (false, 0, "Name requerido.");

            // Validación: Solo letras y espacios (incluidos acentos/ñ)
            var rx = new System.Text.RegularExpressions.Regex("^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$");
            if (!rx.IsMatch(name)) return (false, 0, "Nombre inválido. Solo letras y espacios.");

            try
            {
                using var c = _factory.Create();
                var id = await _repo.CreateAsync(c, name);
                return (true, id, null);
            }
            catch (SqlException ex) when (ex.Number is 2601 or 2627)
            {
                return (false, 0, "Nombre duplicado.");
            }
        }
    }
}
