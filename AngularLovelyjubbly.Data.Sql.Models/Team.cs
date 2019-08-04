namespace AngularLovelyjubbly.Data.Sql.Models
{
    public partial class Team
    {
        public Team()
        {
        }

        public int TeamId { get; set; }
        public string TeamName { get; set; }
        public string TeamNameShort { get; set; }
        public string LogoImage { get; set; }
        public string HeaderImage { get; set; }
        public string CoachImage { get; set; }
        public string CheerleaderImage { get; set; }
        //foreign key 
        public int DivisionId { get; set; }
        //navigation property
        public virtual Division Division { get; set; }
        //foreign key
        public int CoachId { get; set; }
        //navigation property
        public virtual Coach Coach { get; set; }

        public string Hex { get; set; }
        public int R { get; set; }
        public int G { get; set; }
        public int B { get; set; }
    }
}
