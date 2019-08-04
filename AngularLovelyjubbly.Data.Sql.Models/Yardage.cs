namespace AngularLovelyjubbly.Data.Sql.Models
{
    public partial class Yardage
    {
        public Yardage()
        {
        }

        public int YardageId { get; set; }
        //foreign key
        public int TournamentId { get; set; }
        //navigation property
        public virtual Tournament Tournament { get; set; }
        //foreign key
        public int TeamId { get; set; }
        //navigation property
        public virtual Team Team { get; set; }
        public int OffensePassingYards { get; set; }
        public int OffenseRushingYards { get; set; }
        public int OffenseTotalYards { get; set; }
        public int DefensePassingYards { get; set; }
        public int DefenseRushingYards { get; set; }
        public int DefenseTotalYards { get; set; }
    }
}
