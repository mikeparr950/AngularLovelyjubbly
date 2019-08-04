namespace AngularLovelyjubbly.Data.Sql.Models
{
    public partial class PowerRanking
    {
        public PowerRanking()
        {
        }

        public int PowerRankingId { get; set; }
        //foreign key
        public int TournamentId { get; set; }
        //navigation property
        public virtual Tournament Tournament { get; set; }
        //foreign key
        public int WeekId { get; set; }
        //navigation property
        public virtual Week Week { get; set; }
        //foreign key
        public int TeamId { get; set; }
        //navigation property
        public virtual Team Team { get; set; }
        public byte CurrentRanking { get; set; }
        public byte PreviousRanking { get; set; }
    }
}
