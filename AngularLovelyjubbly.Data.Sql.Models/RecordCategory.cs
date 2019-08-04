namespace AngularLovelyjubbly.Data.Sql.Models
{
    public partial class RecordCategory
    {
        public RecordCategory()
        {
        }

        public int RecordCategoryId { get; set; }
        public string RecordCategoryName { get; set; }
        public bool IsPerSeason { get; set; }
    }
}
