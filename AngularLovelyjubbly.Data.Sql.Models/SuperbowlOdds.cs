namespace AngularLovelyjubbly.Data.Sql.Models
{
    public partial class SuperbowlOdds
    {
        public SuperbowlOdds()
        {
        }

        public int SuperbowlOddsId { get; set; }
        //foreign key
        public int TournamentId { get; set; }
        //navigation property
        public virtual Tournament Tournament { get; set; }
        //foreign key
        public int TeamId { get; set; }
        //navigation property
        public virtual Team Team { get; set; }
        public byte Odds { get; set; }
    }
}
