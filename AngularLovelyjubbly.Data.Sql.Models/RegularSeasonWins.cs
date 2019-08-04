namespace AngularLovelyjubbly.Data.Sql.Models
{
    public partial class RegularSeasonWins
    {
        public RegularSeasonWins()
        {
        }

        public int RegularSeasonWinsId { get; set; }
        //foreign key
        public int TeamId { get; set; }
        //navigation property
        public virtual Team Team { get; set; }
        //foreign key
        public int TournamentId { get; set; }
        //navigation property
        public virtual Tournament Tournament { get; set; }
        public decimal Wins { get; set; }
    }
}
