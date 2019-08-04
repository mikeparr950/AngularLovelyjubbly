using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AngularLovelyjubbly.Data.Sql.Contracts;
using AngularLovelyjubbly.Data.Sql.Models;

namespace AngularLovelyjubbly.Data.Sql.Repository
{
    public class PowerRankingRepository : GenericRepository<PowerRanking>, IPowerRankingRepository
    {
        public PowerRankingRepository(ApplicationDbContext context) : base(context)
        {
        }

        public override IQueryable<PowerRanking> GetAll()
        {
            return DbSet.Include(p => p.Tournament).ThenInclude(p => p.Season)
                .Include(p => p.Week)
                .Include(p => p.Team)
                .OrderBy(p => p.CurrentRanking)
                .AsQueryable();
        }

        public override async Task<PowerRanking> GetAsync(Expression<Func<PowerRanking, bool>> match)
        {
            return await DbSet.Include(p => p.Tournament).ThenInclude(p => p.Season)
                .Include(p => p.Week)
                .Include(p => p.Team)
                .SingleAsync(match);
        }

        public IQueryable<PowerRanking> GetManyByParam(Expression<Func<PowerRanking, bool>> match)
        {
            return DbSet.Include(p => p.Tournament).ThenInclude(p => p.Season)
                .Include(p => p.Week)
                .Include(p => p.Team)
                .OrderBy(p => p.CurrentRanking)
                .Where(match).AsQueryable();
        }

        public override async Task<bool> UpdateAsync(PowerRanking entity)
        {
            //map tournament, week, team
            entity.Tournament = DbContext.Tournaments.FirstOrDefault
                (t => t.TournamentId == entity.TournamentId);
            entity.Week = DbContext.Weeks.FirstOrDefault(w => w.WeekId == entity.WeekId);
            entity.Team = DbContext.Teams.FirstOrDefault
                (t => t.TeamId == entity.TeamId);

            DbSet.Update(entity);

            return await DbContext.SaveChangesAsync() > 0;
        }
    }
}
