using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AngularLovelyjubbly.Data.Sql.Contracts;
using AngularLovelyjubbly.Data.Sql.Models;

namespace AngularLovelyjubbly.Data.Sql.Repository
{
    public class TournamentRepository : GenericRepository<Tournament>, ITournamentRepository
    {
        public TournamentRepository(ApplicationDbContext context) : base(context)
        {
        }

        public override IQueryable<Tournament> GetAll()
        {
            return DbSet.Include(t => t.Season)
                .OrderByDescending(t => t.TournamentName).ThenByDescending(t => t.Season.SeasonName)
                .AsQueryable();
        }

        public override async Task<Tournament> GetAsync(Expression<Func<Tournament, bool>> match)
        {
            return await DbSet.Include(t => t.Season)
                .SingleAsync(match);
        }
    }
}
