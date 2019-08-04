using AngularLovelyjubbly.Data.Sql.Contracts;
using AngularLovelyjubbly.Data.Sql.Models;

namespace AngularLovelyjubbly.Data.Sql.Repository
{
    public class DivisionRepository : GenericRepository<Division>, IDivisionRepository
    {
        public DivisionRepository(ApplicationDbContext context) : base(context)
        {

        }
    }
}
