using AngularLovelyjubbly.Data.Sql.Contracts;
using AngularLovelyjubbly.Data.Sql.Models;

namespace AngularLovelyjubbly.Data.Sql.Repository
{
    public class GenderRepository : GenericRepository<Gender>, IGenderRepository
    {
        public GenderRepository(ApplicationDbContext context) : base(context)
        {

        }
    }
}
