namespace AngularLovelyjubbly.Data.Sql.Models
{
    public partial class Record
    {
        public Record()
        {
        }

        public int RecordId { get; set; }
        //foreign key
        public int RecordCategoryId { get; set; }
        //navigation property
        public virtual RecordCategory RecordCategory { get; set; }
        public double RecordAmount { get; set; }
        //foreign key
        public int SeasonId { get; set; }
        //navigation property
        public virtual Season Season { get; set; }
        //foreign key
        public int TeamId { get; set; }
        //navigation property
        public virtual Team Team { get; set; }
        //foreign key
        public int CoachId { get; set; }
        //navigation property
        public virtual Coach Coach { get; set; }
        public byte Rank { get; set; }
        public string RecordImage { get; set; }
        public string Comments { get; set; }

        //foreign key
        public int? WeekId { get; set; }
        //navigation property
        public virtual Week Week { get; set; }
    }
}
