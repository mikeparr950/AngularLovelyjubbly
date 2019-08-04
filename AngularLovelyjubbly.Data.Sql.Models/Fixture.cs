using System;

namespace AngularLovelyjubbly.Data.Sql.Models
{
    public partial class Fixture
    {
        public Fixture()
        {
        }

        public int FixtureId { get; set; }
        //foreign key
        public int TournamentId { get; set; }
        //navigation property
        public virtual Tournament Tournament { get; set; }
        //foreign key
        public int WeekId { get; set; }
        //navigation property
        public virtual Week Week { get; set; }
        //foreign key
        public int AwayTeamId { get; set; }
        //navigation property
        public virtual Team AwayTeam { get; set; }
        //foreign key
        public int HomeTeamId { get; set; }
        //navigation property
        public virtual Team HomeTeam { get; set; }
        public byte? AwayTeamScore { get; set; }
        public byte? HomeTeamScore { get; set; }
        public Boolean IsOvertime { get; set; }
    }
}
