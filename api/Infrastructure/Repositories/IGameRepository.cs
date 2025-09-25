using Dapper;
using Microsoft.Data.SqlClient;
using MarcadorBaloncesto.Application.DTOs;

namespace MarcadorBaloncesto.Infrastructure.Repositories
{
    public interface IGameRepository
    {
        Task<IEnumerable<GameRow>> ListGamesAsync(SqlConnection c);
        Task<int> CreateGameAsync(SqlConnection c, string home, string away, int quarterMs, SqlTransaction? tx);
        Task EnsureTimerAsync(SqlConnection c, int gameId, int quarterMs, SqlTransaction? tx);
        Task<GameRow?> GetGameAsync(SqlConnection c, int id);
        Task<IEnumerable<MatchEventRow>> GetEventsAsync(SqlConnection c, int id);

        // Flow operations
        Task<int> StartGameAsync(SqlConnection c, int id, SqlTransaction tx);
        Task UpdateTimerOnStartAsync(SqlConnection c, int id, SqlTransaction tx);
        Task<(int Quarter, string Status, int HomeScore, int AwayScore)?> GetStatusWithScoresAsync(SqlConnection c, int id, SqlTransaction tx);
        Task AdvanceQuarterAsync(SqlConnection c, int id, bool overtime, int? overtimeMs, SqlTransaction tx);
        Task<int> FinishGameAsync(SqlConnection c, int id, SqlTransaction tx);
        Task StopTimerAsync(SqlConnection c, int id, SqlTransaction tx);

        // Actions
        Task<string?> GetGameStatusAsync(SqlConnection c, int id, SqlTransaction tx);
        Task<int> AddScoreAsync(SqlConnection c, int id, string team, int points, int? playerNumber, int? playerId, SqlTransaction tx);
        Task<int> InsertFoulAsync(SqlConnection c, int id, string team, int? playerNumber, int? playerId, SqlTransaction tx);
        Task<(int EventId, string EventType)?> FindLastScoreEventAsync(SqlConnection c, int id, string team, SqlTransaction tx);
        Task<int?> FindLastFoulEventIdAsync(SqlConnection c, int id, string team, int? playerId, SqlTransaction tx);
        Task DeleteEventByIdAsync(SqlConnection c, int eventId, SqlTransaction tx);
        Task InsertEventAsync(SqlConnection c, int id, string team, string eventType, int? playerId, SqlTransaction tx);
        Task UpdateScoresSubtractAsync(SqlConnection c, int id, string team, int points, SqlTransaction tx);
        Task<(int EventId, string EventType, string Team)?> FindLastPointOrFoulEventAsync(SqlConnection c, int id, SqlTransaction tx);
    }

    public sealed class GameRepository : IGameRepository
    {
        private const string T = "HoopsDB.core.";

        public async Task<IEnumerable<GameRow>> ListGamesAsync(SqlConnection c)
        {
            const string sql = $"SELECT TOP 50 * FROM {T}Matches ORDER BY GameId DESC;";
            return await c.QueryAsync<GameRow>(sql);
        }

        public async Task<int> CreateGameAsync(SqlConnection c, string home, string away, int quarterMs, SqlTransaction? tx)
        {
            var id = await c.ExecuteScalarAsync<int>(
                $@"INSERT INTO {T}Matches(HomeTeam, AwayTeam, Status, Quarter, CreatedAt)
                   OUTPUT INSERTED.GameId VALUES(@home, @away, 'SCHEDULED', 1, SYSUTCDATETIME());",
                new { home, away }, tx);

            return id;
        }

        public async Task EnsureTimerAsync(SqlConnection c, int gameId, int quarterMs, SqlTransaction? tx)
        {
            await c.ExecuteAsync(
                $@"IF NOT EXISTS(SELECT 1 FROM {T}MatchTimers WHERE GameId=@id)
                   INSERT INTO {T}MatchTimers(GameId, Quarter, QuarterMs, RemainingMs, Running, StartedAt, UpdatedAt)
                   VALUES(@id, 1, @quarterMs, @quarterMs, 0, NULL, SYSUTCDATETIME());",
                new { id = gameId, quarterMs }, tx);
        }

        public async Task<GameRow?> GetGameAsync(SqlConnection c, int id)
        {
            const string sql = $"SELECT * FROM {T}Matches WHERE GameId=@id;";
            return await c.QuerySingleOrDefaultAsync<GameRow>(sql, new { id });
        }

        public async Task<IEnumerable<MatchEventRow>> GetEventsAsync(SqlConnection c, int id)
        {
            const string sql = $"SELECT TOP 100 * FROM {T}MatchEvents WHERE GameId=@id ORDER BY EventId DESC;";
            return await c.QueryAsync<MatchEventRow>(sql, new { id });
        }

         public async Task<int> StartGameAsync(SqlConnection c, int id, SqlTransaction tx)
         {
             var ok = await c.ExecuteAsync($"UPDATE {T}Matches SET Status='IN_PROGRESS' WHERE GameId=@id AND Status='SCHEDULED';", new { id }, tx);
             return ok;
         }

         public async Task UpdateTimerOnStartAsync(SqlConnection c, int id, SqlTransaction tx)
         {
             await c.ExecuteAsync($"UPDATE {T}MatchTimers SET Running=1, StartedAt=SYSUTCDATETIME(), UpdatedAt=SYSUTCDATETIME() WHERE GameId=@id;", new { id }, tx);
         }

         public async Task<(int Quarter, string Status, int HomeScore, int AwayScore)?> GetStatusWithScoresAsync(SqlConnection c, int id, SqlTransaction tx)
         {
             const string sql = $"SELECT Quarter, Status, HomeScore, AwayScore FROM {T}Matches WHERE GameId=@id;";
             var row = await c.QuerySingleOrDefaultAsync<(int Quarter, string Status, int HomeScore, int AwayScore)>(sql, new { id }, tx);
             return row;
         }

         public async Task AdvanceQuarterAsync(SqlConnection c, int id, bool overtime, int? overtimeMs, SqlTransaction tx)
         {
             // Increment quarter
             await c.ExecuteAsync($"UPDATE {T}Matches SET Quarter = Quarter + 1 WHERE GameId=@id;", new { id }, tx);

             if (overtime)
             {
                 var quarterMs = overtimeMs ?? 300000; // default 5min
                 await c.ExecuteAsync($@"
                    UPDATE c
                    SET c.Quarter = g.Quarter,
                        c.Running = 0,
                        c.RemainingMs = @quarterMs,
                        c.QuarterMs = @quarterMs,
                        c.StartedAt = NULL,
                        c.UpdatedAt = SYSUTCDATETIME()
                    FROM {T}MatchTimers c
                    INNER JOIN {T}Matches g ON g.GameId = c.GameId
                    WHERE c.GameId=@id;", new { id, quarterMs }, tx);
             }
             else
             {
                 await c.ExecuteAsync($@"
                    UPDATE c
                    SET c.Quarter = g.Quarter,
                        c.Running = 0,
                        c.RemainingMs = c.QuarterMs,
                        c.StartedAt = NULL,
                        c.UpdatedAt = SYSUTCDATETIME()
                    FROM {T}MatchTimers c
                    INNER JOIN {T}Matches g ON g.GameId = c.GameId
                    WHERE c.GameId=@id;", new { id }, tx);
             }
         }

         public async Task<int> FinishGameAsync(SqlConnection c, int id, SqlTransaction tx)
         {
             var ok = await c.ExecuteAsync($"UPDATE {T}Matches SET Status='FINISHED' WHERE GameId=@id AND Status='IN_PROGRESS';", new { id }, tx);
             return ok;
         }

         public async Task StopTimerAsync(SqlConnection c, int id, SqlTransaction tx)
         {
             await c.ExecuteAsync($"UPDATE {T}MatchTimers SET Running=0, StartedAt=NULL, UpdatedAt=SYSUTCDATETIME() WHERE GameId=@id;", new { id }, tx);
         }

         public async Task<string?> GetGameStatusAsync(SqlConnection c, int id, SqlTransaction tx)
         {
             const string sql = $"SELECT Status FROM {T}Matches WHERE GameId=@id;";
             return await c.QuerySingleOrDefaultAsync<string>(sql, new { id }, tx);
         }

         public async Task<int> AddScoreAsync(SqlConnection c, int id, string team, int points, int? playerNumber, int? playerId, SqlTransaction tx)
         {
             var etype = $"POINT_{points}";
             var affected = await c.ExecuteAsync($@"
                UPDATE {T}Matches
                SET HomeScore = CASE WHEN @team='HOME' THEN HomeScore + @pts ELSE HomeScore END,
                    AwayScore = CASE WHEN @team='AWAY' THEN AwayScore + @pts ELSE AwayScore END
                WHERE GameId=@id;

                INSERT INTO {T}MatchEvents(GameId, Quarter, Team, EventType, PlayerNumber, PlayerId)
                SELECT @id, Quarter, @team, @etype, @pnum, @pid FROM {T}Matches WHERE GameId=@id;",
                new { id, team, pts = points, etype, pnum = playerNumber, pid = playerId }, tx);
             return affected;
         }

         public async Task<int> InsertFoulAsync(SqlConnection c, int id, string team, int? playerNumber, int? playerId, SqlTransaction tx)
         {
             var inserted = await c.ExecuteAsync($@"
                INSERT INTO {T}MatchEvents(GameId, Quarter, Team, EventType, PlayerNumber, PlayerId)
                SELECT @id, g.Quarter, @team, 'FOUL', @pnum, @pid
                FROM {T}Matches g
                WHERE g.GameId=@id AND g.Status='IN_PROGRESS';",
                new { id, team, pnum = playerNumber, pid = playerId }, tx);
             return inserted;
         }

         public async Task<(int EventId, string EventType)?> FindLastScoreEventAsync(SqlConnection c, int id, string team, SqlTransaction tx)
         {
             const string sql = $@"SELECT TOP 1 EventId, EventType FROM {T}MatchEvents 
                 WHERE GameId=@id AND Team=@team AND EventType IN ('POINT_1','POINT_2','POINT_3') ORDER BY EventId DESC;";
             return await c.QuerySingleOrDefaultAsync<(int, string)?>(sql, new { id, team }, tx);
         }

         public async Task<int?> FindLastFoulEventIdAsync(SqlConnection c, int id, string team, int? playerId, SqlTransaction tx)
         {
             var sql = $@"SELECT TOP 1 EventId FROM {T}MatchEvents WHERE GameId=@id AND Team=@team AND EventType='FOUL' "+
                       (playerId.HasValue ? "AND PlayerId=@pid " : string.Empty) +
                       "ORDER BY EventId DESC;";
             return await c.QuerySingleOrDefaultAsync<int?>(sql, new { id, team, pid = playerId }, tx);
         }

         public async Task DeleteEventByIdAsync(SqlConnection c, int eventId, SqlTransaction tx)
         {
             await c.ExecuteAsync($"DELETE FROM {T}MatchEvents WHERE EventId=@eventId;", new { eventId }, tx);
         }

         public async Task InsertEventAsync(SqlConnection c, int id, string team, string eventType, int? playerId, SqlTransaction tx)
         {
             await c.ExecuteAsync($@"INSERT INTO {T}MatchEvents(GameId, Quarter, Team, EventType, PlayerId)
                 SELECT @id, Quarter, @team, @etype, @pid FROM {T}Matches WHERE GameId=@id;",
                 new { id, team, etype = eventType, pid = playerId }, tx);
         }

         public async Task UpdateScoresSubtractAsync(SqlConnection c, int id, string team, int points, SqlTransaction tx)
         {
             await c.ExecuteAsync($@"UPDATE {T}Matches
                 SET HomeScore = CASE WHEN @team='HOME' THEN IIF(HomeScore>=@pts, HomeScore-@pts, HomeScore) ELSE HomeScore END,
                     AwayScore = CASE WHEN @team='AWAY' THEN IIF(AwayScore>=@pts, AwayScore-@pts, AwayScore) ELSE AwayScore END
                 WHERE GameId=@id;", new { id, team, pts = points }, tx);
         }

         public async Task<(int EventId, string EventType, string Team)?> FindLastPointOrFoulEventAsync(SqlConnection c, int id, SqlTransaction tx)
         {
             const string sql = $@"SELECT TOP 1 EventId, EventType, Team FROM {T}MatchEvents
                 WHERE GameId=@id AND EventType IN ('POINT_1','POINT_2','POINT_3','FOUL') ORDER BY EventId DESC;";
             return await c.QuerySingleOrDefaultAsync<(int, string, string)?>(sql, new { id }, tx);
         }
    }
}
