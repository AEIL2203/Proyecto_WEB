using Dapper;
using Microsoft.Data.SqlClient;

namespace MarcadorBaloncesto.Infrastructure.Repositories
{
    public interface IClockRepository
    {
        Task<dynamic?> GetTimerAsync(SqlConnection c, int gameId);
        Task EnsureTimerAsync(SqlConnection c, int gameId, int defaultQuarterMs);
        Task StartAsync(SqlConnection c, int gameId);
        Task PauseAsync(SqlConnection c, int gameId);
        Task ResetAsync(SqlConnection c, int gameId, int? quarterMs);
    }

    public sealed class ClockRepository : IClockRepository
    {
        private const string T = "[HoopsDB].[core].";

        public async Task<dynamic?> GetTimerAsync(SqlConnection c, int gameId)
        {
            var row = await c.QuerySingleOrDefaultAsync(@$"
                SELECT GameId, Quarter, QuarterMs, RemainingMs, Running, StartedAt, UpdatedAt
                FROM {T}[MatchTimers]
                WHERE GameId = @id;", new { id = gameId });
            return row;
        }

        public async Task EnsureTimerAsync(SqlConnection c, int gameId, int defaultQuarterMs)
        {
            await c.ExecuteAsync(@$"
                IF NOT EXISTS (SELECT 1 FROM {T}[MatchTimers] WHERE GameId=@id)
                BEGIN
                    INSERT INTO {T}[MatchTimers](GameId, Quarter, QuarterMs, RemainingMs, Running, StartedAt, UpdatedAt)
                    VALUES(@id, 1, @qms, @qms, 0, NULL, SYSUTCDATETIME());
                END", new { id = gameId, qms = defaultQuarterMs });
        }

        public async Task StartAsync(SqlConnection c, int gameId)
        {
            await c.ExecuteAsync(@$"
                UPDATE {T}[MatchTimers]
                SET RemainingMs = CASE WHEN RemainingMs <= 0 THEN QuarterMs ELSE RemainingMs END,
                    Running = 1,
                    StartedAt = CASE WHEN Running = 1 AND StartedAt IS NOT NULL THEN StartedAt ELSE SYSUTCDATETIME() END,
                    UpdatedAt = SYSUTCDATETIME()
                WHERE GameId = @id;", new { id = gameId });
        }

        public async Task PauseAsync(SqlConnection c, int gameId)
        {
            await c.ExecuteAsync(@$"
                UPDATE {T}[MatchTimers]
                SET RemainingMs = CASE WHEN Running = 1 AND StartedAt IS NOT NULL
                                        THEN IIF(RemainingMs > DATEDIFF(ms, StartedAt, SYSUTCDATETIME()),
                                                 RemainingMs - DATEDIFF(ms, StartedAt, SYSUTCDATETIME()), 0)
                                        ELSE RemainingMs END,
                    Running = 0,
                    StartedAt = NULL,
                    UpdatedAt = SYSUTCDATETIME()
                WHERE GameId = @id;", new { id = gameId });
        }

        public async Task ResetAsync(SqlConnection c, int gameId, int? quarterMs)
        {
            await c.ExecuteAsync(@$"
                IF NOT EXISTS (SELECT 1 FROM {T}[MatchTimers] WHERE GameId=@id)
                BEGIN
                    DECLARE @def INT = COALESCE(@qms, 720000);
                    INSERT INTO {T}[MatchTimers](GameId, Quarter, QuarterMs, RemainingMs, Running, StartedAt, UpdatedAt)
                    VALUES(@id, 1, @def, @def, 0, NULL, SYSUTCDATETIME());
                END

                UPDATE {T}[MatchTimers]
                SET QuarterMs = COALESCE(@qms, QuarterMs),
                    RemainingMs = COALESCE(@qms, QuarterMs),
                    Running = 0,
                    StartedAt = NULL,
                    UpdatedAt = SYSUTCDATETIME()
                WHERE GameId = @id;", new { id = gameId, qms = quarterMs });
        }
    }
}
