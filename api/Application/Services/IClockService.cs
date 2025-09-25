using MarcadorBaloncesto.Infrastructure.Data;
using MarcadorBaloncesto.Infrastructure.Repositories;
using Microsoft.Data.SqlClient;

namespace MarcadorBaloncesto.Application.Services
{
    public interface IClockService
    {
        Task<object?> GetAsync(int gameId);
        Task StartAsync(int gameId);
        Task PauseAsync(int gameId);
        Task ResetAsync(int gameId, int? quarterMs);
    }

    public sealed class ClockService : IClockService
    {
        private readonly ISqlConnectionFactory _factory;
        private readonly IClockRepository _repo;

        public ClockService(ISqlConnectionFactory factory, IClockRepository repo)
        {
            _factory = factory;
            _repo = repo;
        }

        public async Task<object?> GetAsync(int gameId)
        {
            using var c = _factory.Create();
            var row = await _repo.GetTimerAsync(c, gameId);
            if (row is null) return null;

            int gameIdVal = (int)row.GameId;
            byte quarter = (byte)row.Quarter;
            int quarterMs = (int)row.QuarterMs;
            int remainingMsDb = (int)row.RemainingMs;
            int runningInt = row.Running is bool br ? (br ? 1 : 0) : Convert.ToInt32(row.Running);
            DateTime? startedAt = row.StartedAt as DateTime?;
            DateTime updatedAt = (DateTime)row.UpdatedAt;

            var nowUtc = DateTime.UtcNow;
            var baseRemaining = remainingMsDb;
            var isRunning = runningInt != 0 && baseRemaining > 0;
            if (isRunning && startedAt.HasValue)
            {
                var elapsed = (int)(nowUtc - startedAt.Value).TotalMilliseconds;
                if (elapsed > 0)
                {
                    baseRemaining = Math.Max(0, baseRemaining - elapsed);
                }
            }

            return new
            {
                gameId = gameIdVal,
                quarter,
                quarterMs,
                running = isRunning,
                remainingMs = baseRemaining,
                updatedAt
            };
        }

        public async Task StartAsync(int gameId)
        {
            using var c = _factory.Create();
            // Ensure a row exists with default 12 minutes if missing
            await _repo.EnsureTimerAsync(c, gameId, defaultQuarterMs: 720000);
            await _repo.StartAsync(c, gameId);
        }

        public async Task PauseAsync(int gameId)
        {
            using var c = _factory.Create();
            await _repo.PauseAsync(c, gameId);
        }

        public async Task ResetAsync(int gameId, int? quarterMs)
        {
            using var c = _factory.Create();
            await _repo.ResetAsync(c, gameId, quarterMs);
        }
    }
}
