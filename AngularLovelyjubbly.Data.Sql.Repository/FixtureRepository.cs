using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AngularLovelyjubbly.Data.Sql.Contracts;
using AngularLovelyjubbly.Data.Sql.Models;
using System.Collections.Generic;

namespace AngularLovelyjubbly.Data.Sql.Repository
{
    public class FixtureRepository : GenericRepository<Fixture>, IFixtureRepository
    {
        internal ApplicationDbContext ctx;

        public FixtureRepository(ApplicationDbContext context) : base(context)
        {
            this.ctx = context;
        }

        public override IQueryable<Fixture> GetAll()
        {
            //using Include and ThenInclude
            //return DbSet.Include(f => f.AwayTeam)
            //    .Include(f => f.HomeTeam)
            //    .Include(f => f.Tournament).ThenInclude(t => t.Season)
            //    .Include(f => f.Week)
            //    .Include(f => f.HomeTeam).ThenInclude(t => t.Coach)
            //    .Include(f => f.HomeTeam).ThenInclude(t => t.Division)
            //    .Include(f => f.AwayTeam).ThenInclude(t => t.Coach)
            //    .Include(f => f.AwayTeam).ThenInclude(t => t.Division)
            //    .OrderByDescending(f => f.Tournament.TournamentName)
            //    .ThenByDescending(w => w.Week.WeekId).AsQueryable();

            //remove several unnecessary includes 
            //return DbSet.Include(f => f.AwayTeam)
            //    .Include(f => f.HomeTeam)
            //    .Include(f => f.Tournament).ThenInclude(t => t.Season)
            //    .Include(f => f.Week)
            //    .Include(f => f.HomeTeam) //.ThenInclude(t => t.Coach)
            //    .Include(f => f.HomeTeam) //.ThenInclude(t => t.Division)
            //    .Include(f => f.AwayTeam) //.ThenInclude(t => t.Coach)
            //    .Include(f => f.AwayTeam) //.ThenInclude(t => t.Division)
            //    .OrderByDescending(f => f.Tournament.TournamentName)
            //    .ThenByDescending(w => w.Week.WeekId).AsQueryable();

            //try split linq query into multiple queries


            //try stored proc
            //var x = DbSet.FromSql("GetAllFixtures").AsQueryable();
            //return x;

            //AsNoTracking for none CUD operations
            return DbSet.Include(f => f.AwayTeam)
                .Include(f => f.HomeTeam)
                .Include(f => f.Tournament).ThenInclude(t => t.Season)
                .Include(f => f.Week)
                .Include(f => f.HomeTeam).ThenInclude(t => t.Coach)
                .Include(f => f.HomeTeam).ThenInclude(t => t.Division)
                .Include(f => f.AwayTeam).ThenInclude(t => t.Coach)
                .Include(f => f.AwayTeam).ThenInclude(t => t.Division)
                .OrderByDescending(f => f.Tournament.TournamentName)
                .ThenByDescending(w => w.Week.WeekId).AsQueryable().AsNoTracking();
        }

        public override async Task<Fixture> GetAsync(Expression<Func<Fixture, bool>> match)
        {
            return await DbSet.Include(f => f.AwayTeam)
                .Include(f => f.HomeTeam)
                .Include(f => f.Tournament).ThenInclude(t => t.Season)
                .Include(f => f.Week)
                .Include(f => f.HomeTeam).ThenInclude(t => t.Coach)
                .Include(f => f.HomeTeam).ThenInclude(t => t.Division)
                .Include(f => f.AwayTeam).ThenInclude(t => t.Coach)
                .Include(f => f.AwayTeam).ThenInclude(t => t.Division)
                .SingleAsync(match);
        }

        public IQueryable<Fixture> GetManyByParam(Expression<Func<Fixture, bool>> match)
        {
            return DbSet.Include(f => f.AwayTeam)
                .Include(f => f.HomeTeam)
                .Include(f => f.Tournament).ThenInclude(t => t.Season)
                .Include(f => f.Week)
                .Include(f => f.HomeTeam).ThenInclude(t => t.Coach)
                .Include(f => f.HomeTeam).ThenInclude(t => t.Division)
                .Include(f => f.AwayTeam).ThenInclude(t => t.Coach)
                .Include(f => f.AwayTeam).ThenInclude(t => t.Division)
                .OrderByDescending(f => f.Tournament.TournamentName)
                .ThenByDescending(w => w.Week.WeekId)
                .Where(match).AsQueryable();
        }

        public override async Task<bool> AddAsync(Fixture entity)
        {
            //map tournament,week,awayteam and hometeam
            entity.TournamentId = DbContext.Tournaments.FirstOrDefault
                (t => t.TournamentId == entity.Tournament.TournamentId).TournamentId;
            entity.WeekId = DbContext.Weeks.FirstOrDefault(w => w.WeekId == entity.Week.WeekId).WeekId;
            entity.AwayTeamId = DbContext.Teams.FirstOrDefault
                (a => a.TeamId == entity.AwayTeam.TeamId).TeamId;
            entity.HomeTeamId = DbContext.Teams.FirstOrDefault
                (h => h.TeamId == entity.HomeTeam.TeamId).TeamId;

            DbSet.Add(entity);

            return await DbContext.SaveChangesAsync() > 0;
        }

        public override async Task<bool> UpdateAsync(Fixture entity)
        {
            //map tournament,week,awayteam and hometeam
            entity.TournamentId = DbContext.Tournaments.FirstOrDefault
                (t => t.TournamentId == entity.Tournament.TournamentId).TournamentId;
            entity.WeekId = DbContext.Weeks.FirstOrDefault(w => w.WeekId == entity.Week.WeekId).WeekId;
            entity.AwayTeamId = DbContext.Teams.FirstOrDefault
                (a => a.TeamId == entity.AwayTeam.TeamId).TeamId;
            entity.HomeTeamId = DbContext.Teams.FirstOrDefault
                (h => h.TeamId == entity.HomeTeam.TeamId).TeamId;

            DbSet.Update(entity);

            return await DbContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> RemoveAsync(int fixtureId)
        {
            Fixture fixtureToBeDeleted = DbContext.Fixtures.Where(f => f.FixtureId == fixtureId).First();

            DbSet.Attach(fixtureToBeDeleted);
            DbSet.Remove(fixtureToBeDeleted);

            return await DbContext.SaveChangesAsync() > 0;
        }
    }
}
