using System;

namespace AngularLovelyjubbly.Data.Sql.Models
{
    public partial class PlayResult
    {
        public PlayResult()
        {
        }

        public int PlayResultId { get; set; }
        //foreign key
        public int FormationId { get; set; }
        //navigation property
        public virtual Formation Formation { get; set; }
        //foreign key
        public int OffensivePlayId { get; set; }
        //navigation property
        public virtual OffensivePlay OffensivePlay { get; set; }
        //foreign key
        public int DefensivePlayId { get; set; }
        //navigation property
        public virtual DefensivePlay DefensivePlay { get; set; }
        public int Yards { get; set; } //(inc sacks and pens)
        public Boolean IsOffensivePenalty { get; set; }
        public Boolean IsDefensivePenalty { get; set; }
        public Boolean IsSack { get; set; }
        public Boolean IsFumble { get; set; }
        public Boolean IsInterception { get; set; }
        public int ReturnYards { get; set; } //(fumble or int yards returned - yards gained)
    }
}
