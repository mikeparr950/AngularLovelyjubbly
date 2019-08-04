using AngularLovelyjubbly.Data.Sql.Contracts;
using AngularLovelyjubbly.Data.Sql.Models;

namespace AngularLovelyjubbly.Data.Sql.Repository
{
    public class WeekRepository : GenericRepository<Week>, IWeekRepository
    {
        public WeekRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
