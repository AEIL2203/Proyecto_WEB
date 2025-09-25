namespace MarcadorBaloncesto.Application.DTOs
{
    public sealed class GameRow
    {
        public int GameId { get; set; }
        public string HomeTeam { get; set; } = string.Empty;
        public string AwayTeam { get; set; } = string.Empty;
        public int Quarter { get; set; }
        public int HomeScore { get; set; }
        public int AwayScore { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public int? HomeTeamId { get; set; }
        public int? AwayTeamId { get; set; }
    }

    public sealed class MatchEventRow
    {
        public int EventId { get; set; }
        public int GameId { get; set; }
        public byte Quarter { get; set; }
        public string Team { get; set; } = string.Empty; // HOME/AWAY
        public string EventType { get; set; } = string.Empty; // POINT_1/POINT_2/POINT_3/FOUL/...
        public int? PlayerNumber { get; set; }
        public int? PlayerId { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public sealed class GameDetailDto
    {
        public required GameRow Game { get; set; }
        public required List<MatchEventRow> Events { get; set; }
    }
}
