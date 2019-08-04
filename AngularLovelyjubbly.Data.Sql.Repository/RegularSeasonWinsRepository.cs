using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AngularLovelyjubbly.Data.Sql.Contracts;
using AngularLovelyjubbly.Data.Sql.Models;

namespace AngularLovelyjubbly.Data.Sql.Repository
{
    public class RegularSeasonWinsRepository : GenericRepository<RegularSeasonWins>, IRegularSeasonWinsRepository
    {
        public RegularSeasonWinsRepository(ApplicationDbContext context) : base(context)
        {
        }

        public override IQueryable<RegularSeasonWins> GetAll()
        {
            return DbSet.Include(r => r.Team)
                .Include(r => r.Tournament).
                OrderBy(r => r.Tournament.TournamentName).AsQueryable();
        }

        public override async Task<RegularSeasonWins> GetAsync(Expression<Func<RegularSeasonWins, bool>> match)
        {
            return await DbSet.Include(r => r.Team)
                .Include(r => r.Tournament)
                .SingleAsync(match);
        }

        public IQueryable<RegularSeasonWins> GetManyByParam(Expression<Func<RegularSeasonWins, bool>> match)
        {
            return DbSet.Include(r => r.Team)
                .Include(r => r.Tournament)
                .OrderBy(r => r.Tournament.TournamentName)
                .Where(match).AsQueryable();
        }
    }
}
