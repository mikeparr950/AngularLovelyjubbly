namespace AngularLovelyjubbly.Data.Sql.Models
{
    public partial class TurnoverDifferential
    {
        public TurnoverDifferential()
        {
        }

        public int TurnoverDifferentialId { get; set; }
        //foreign key
        public int TeamId { get; set; }
        //navigation property
        public virtual Team Team { get; set; }
        //foreign key
        public int TournamentId { get; set; }
        //navigation property
        public virtual Tournament Tournament { get; set; }
        public int FumbleTakeaways { get; set; }
        public int InterceptionTakeaways { get; set; }
        public int FumbleGiveaways { get; set; }
        public int InterceptionGiveaways { get; set; }
    }
}
