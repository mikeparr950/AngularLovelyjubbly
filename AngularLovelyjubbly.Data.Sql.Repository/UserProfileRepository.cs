using System.Linq;
using System.Threading.Tasks;
using AngularLovelyjubbly.Data.Sql.Contracts;
using AngularLovelyjubbly.Data.Sql.Models;

namespace AngularLovelyjubbly.Data.Sql.Repository
{
    public class UserProfileRepository : GenericRepository<UserProfile>, IUserProfileRepository
    {
        public UserProfileRepository(ApplicationDbContext context) : base(context)
        {
        }

        public override async Task<bool> AddAsync(UserProfile entity)
        {
            //map country
            entity.CountryId = DbContext.Countries.FirstOrDefault(c => c.CountryId == entity.Country.CountryId).CountryId;

            DbSet.Add(entity);

            return await DbContext.SaveChangesAsync() > 0;
        }
    }
}
