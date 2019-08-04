using AngularLovelyjubbly.Data.Sql.Contracts;
using AngularLovelyjubbly.Data.Sql.Models;

namespace AngularLovelyjubbly.Data.Sql.Repository
{
    public class CoachRepository : GenericRepository<Coach>, ICoachRepository
    {
        public CoachRepository(ApplicationDbContext context) : base(context)
        {

        }
    }
}
