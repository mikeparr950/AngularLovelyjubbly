using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AngularLovelyjubbly.Data.Sql.Contracts;
using AngularLovelyjubbly.Data.Sql.Models;

namespace AngularLovelyjubbly.Data.Sql.Repository
{
    public class YardageRepository : GenericRepository<Yardage>, IYardageRepository
    {
        public YardageRepository(ApplicationDbContext context) : base(context)
        {
        }

        public override IQueryable<Yardage> GetAll()
        {
            return DbSet.Include(f => f.Team)
                .Include(f => f.Tournament).ThenInclude(t => t.Season)
                .OrderByDescending(f => f.Tournament.TournamentName).AsQueryable();
        }

        public override async Task<Yardage> GetAsync(Expression<Func<Yardage, bool>> match)
        {
            return await DbSet.Include(f => f.Team)
                .Include(f => f.Tournament).ThenInclude(t => t.Season)
                .SingleAsync(match);
        }

        public IQueryable<Yardage> GetManyByParam(Expression<Func<Yardage, bool>> match)
        {
            return DbSet.Include(f => f.Team)
                .Include(f => f.Tournament).ThenInclude(t => t.Season)
                .OrderByDescending(f => f.Tournament.TournamentName)
                .Where(match).AsQueryable();
        }
    }
}
