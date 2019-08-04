using System;

namespace AngularLovelyjubbly.Data.Sql.Models
{
    public partial class Score
    {
        public Score()
        {
        }

        public int ScoreId { get; set; }
        //foreign key
        public int WeekId { get; set; }
        //navigation property
        public virtual Week Week { get; set; }
        public string ScoreDescription { get; set; }
    }
}
