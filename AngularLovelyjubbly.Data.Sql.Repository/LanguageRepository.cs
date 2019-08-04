using AngularLovelyjubbly.Data.Sql.Contracts;
using AngularLovelyjubbly.Data.Sql.Models;

namespace AngularLovelyjubbly.Data.Sql.Repository
{
    public class LanguageRepository : GenericRepository<Language>, ILanguageRepository
    {
        public LanguageRepository(ApplicationDbContext context) : base(context)
        {

        }
    }
}
