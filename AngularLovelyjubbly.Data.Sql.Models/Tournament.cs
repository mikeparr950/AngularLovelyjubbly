namespace AngularLovelyjubbly.Data.Sql.Models
{
    public partial class Tournament
    {
        public Tournament()
        {
        }

        public int TournamentId { get; set; }
        public string TournamentName { get; set; }

        //foreign key
        public int SeasonId { get; set; }
        //navigation property
        public virtual Season Season { get; set; }
    }
}
