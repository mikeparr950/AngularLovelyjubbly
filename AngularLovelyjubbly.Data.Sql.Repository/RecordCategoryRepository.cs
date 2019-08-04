using AngularLovelyjubbly.Data.Sql.Contracts;
using AngularLovelyjubbly.Data.Sql.Models;

namespace AngularLovelyjubbly.Data.Sql.Repository
{
    public class RecordCategoryRepository : GenericRepository<RecordCategory>, IRecordCategoryRepository
    {
        public RecordCategoryRepository(ApplicationDbContext context) : base(context)
        {

        }
    }
}
