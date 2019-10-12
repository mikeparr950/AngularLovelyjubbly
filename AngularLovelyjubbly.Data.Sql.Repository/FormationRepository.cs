using AngularLovelyjubbly.Data.Sql.Contracts;
using AngularLovelyjubbly.Data.Sql.Models;

namespace AngularLovelyjubbly.Data.Sql.Repository
{
    public class FormationRepository : GenericRepository<Formation>, IFormationRepository
    {
        public FormationRepository(ApplicationDbContext context) : base(context)
        {

        }
    }
}
