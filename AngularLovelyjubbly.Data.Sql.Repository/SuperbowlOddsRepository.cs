using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AngularLovelyjubbly.Data.Sql.Contracts;
using AngularLovelyjubbly.Data.Sql.Models;

namespace AngularLovelyjubbly.Data.Sql.Repository
{
    public class SuperbowlOddsRepository : GenericRepository<SuperbowlOdds>, ISuperbowlOddsRepository
    {
        public SuperbowlOddsRepository(ApplicationDbContext context) : base(context)
        {
        }

        public override IQueryable<SuperbowlOdds> GetAll()
        {
            return DbSet.Include(t => t.Team)
                .Include(f => f.Tournament).ThenInclude(f => f.Season)
                .OrderByDescending(f => f.Tournament.TournamentName).AsQueryable();
        }

        public override async Task<SuperbowlOdds> GetAsync(Expression<Func<SuperbowlOdds, bool>> match)
        {
            return await DbSet.Include(t => t.Team)
                .Include(f => f.Tournament).ThenInclude(f => f.Season)
                .SingleAsync(match);
        }

        public IQueryable<SuperbowlOdds> GetManyByParam(Expression<Func<SuperbowlOdds, bool>> match)
        {
            return DbSet.Include(t => t.Team)
                .Include(f => f.Tournament).ThenInclude(f => f.Season)
                .OrderByDescending(f => f.Tournament.TournamentName)
                .Where(match).AsQueryable();
        }
    }
}
