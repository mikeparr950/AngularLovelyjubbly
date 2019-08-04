namespace AngularLovelyjubbly.Data.Sql.Models
{
    public partial class QBRating
    {
        public QBRating()
        {
        }

        public int QBRatingId { get; set; }
        //foreign key
        public int TournamentId { get; set; }
        //navigation property
        public virtual Tournament Tournament { get; set; }
        //foreign key
        public int TeamId { get; set; }
        //navigation property
        public virtual Team Team { get; set; }
        public double Completion { get; set; }
        public double Gain { get; set; }
        public double Touchdown { get; set; }
        public double Interception { get; set; }
    }
}
