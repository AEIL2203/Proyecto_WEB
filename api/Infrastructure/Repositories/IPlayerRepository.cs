using Dapper;
using Microsoft.Data.SqlClient;

namespace MarcadorBaloncesto.Infrastructure.Repositories
{
    public interface IPlayerRepository
    {
        Task<IEnumerable<dynamic>> ListByTeamAsync(SqlConnection c, int teamId);
        Task<int> CreateAsync(SqlConnection c, int teamId, byte? number, string name, string? position);
        Task<int> UpdateAsync(SqlConnection c, int playerId, byte? number, string? name, string? position, bool? active);
        Task<int> DeleteAsync(SqlConnection c, int playerId);
    }

    public sealed class PlayerRepository : IPlayerRepository
    {
        private const string T = "HoopsDB.core.";

        public async Task<IEnumerable<dynamic>> ListByTeamAsync(SqlConnection c, int teamId)
        {
            var sql = $@"SELECT PlayerId, TeamId, Number, Name, Position, Active, CreatedAt
                          FROM {T}Athletes WHERE TeamId=@teamId
                          ORDER BY COALESCE(Number,255), Name;";
            return await c.QueryAsync(sql, new { teamId });
        }

        public async Task<int> CreateAsync(SqlConnection c, int teamId, byte? number, string name, string? position)
        {
            var sql = $@"INSERT INTO {T}Athletes(TeamId, Number, Name, Position, Active)
                          OUTPUT INSERTED.PlayerId VALUES(@teamId,@num,@name,@pos,1);";
            var id = await c.ExecuteScalarAsync<int>(sql, new { teamId, num = number, name, pos = position });
            return id;
        }

        public async Task<int> UpdateAsync(SqlConnection c, int playerId, byte? number, string? name, string? position, bool? active)
        {
            var sql = $@"UPDATE {T}Athletes SET
                            Number=COALESCE(@Number,Number),
                            Name=COALESCE(@Name,Name),
                            Position=COALESCE(@Position,Position),
                            Active=COALESCE(@Active,Active)
                          WHERE PlayerId=@playerId;";
            return await c.ExecuteAsync(sql, new { playerId, Number = number, Name = name, Position = position, Active = active });
        }

        public async Task<int> DeleteAsync(SqlConnection c, int playerId)
        {
            var sql = $"DELETE FROM {T}Athletes WHERE PlayerId=@playerId;";
            return await c.ExecuteAsync(sql, new { playerId });
        }
    }
}
