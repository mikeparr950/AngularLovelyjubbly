using AngularLovelyjubbly.Data.Sql.Contracts;
using AngularLovelyjubbly.Data.Sql.Models;

namespace AngularLovelyjubbly.Data.Sql.Repository
{
    public class OffensivePlayRepository : GenericRepository<OffensivePlay>, IOffensivePlayRepository
    {
        public OffensivePlayRepository(ApplicationDbContext context) : base(context)
        {

        }
    }
}
