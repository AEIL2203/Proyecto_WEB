using Dapper;
using Microsoft.Data.SqlClient;

namespace MarcadorBaloncesto.Infrastructure.Repositories
{
    public interface ITeamRepository
    {
        Task<IEnumerable<(int TeamId, string Name, DateTime CreatedAt)>> ListAsync(SqlConnection c);
        Task<int> CreateAsync(SqlConnection c, string name);
    }

    public sealed class TeamRepository : ITeamRepository
    {
        private const string T = "HoopsDB.core.";

        public async Task<IEnumerable<(int TeamId, string Name, DateTime CreatedAt)>> ListAsync(SqlConnection c)
        {
            var sql = $"SELECT TeamId, Name, CreatedAt FROM {T}Club ORDER BY Name;";
            return await c.QueryAsync<(int, string, DateTime)>(sql);
        }

        public async Task<int> CreateAsync(SqlConnection c, string name)
        {
            var sql = $"INSERT INTO {T}Club(Name) OUTPUT INSERTED.TeamId VALUES(@name);";
            var id = await c.ExecuteScalarAsync<int>(sql, new { name });
            return id;
        }
    }
}
