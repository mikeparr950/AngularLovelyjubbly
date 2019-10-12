using AngularLovelyjubbly.Data.Sql.Contracts;
using AngularLovelyjubbly.Data.Sql.Models;

namespace AngularLovelyjubbly.Data.Sql.Repository
{
    public class DefensivePlayRepository : GenericRepository<DefensivePlay>, IDefensivePlayRepository
    {
        public DefensivePlayRepository(ApplicationDbContext context) : base(context)
        {

        }
    }
}
