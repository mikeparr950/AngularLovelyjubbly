using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AngularLovelyjubbly.Data.Sql.Contracts;
using AngularLovelyjubbly.Data.Sql.Models;

namespace AngularLovelyjubbly.Data.Sql.Repository
{
    public class TurnoverDifferentialRepository : GenericRepository<TurnoverDifferential>, ITurnoverDifferentialRepository
    {
        public TurnoverDifferentialRepository(ApplicationDbContext context) : base(context)
        {
        }

        public override IQueryable<TurnoverDifferential> GetAll()
        {
            return DbSet.Include(t => t.Team)
                .Include(f => f.Tournament).ThenInclude(f => f.Season)
                .OrderByDescending(f => f.Tournament.TournamentName).AsQueryable();
        }

        public override async Task<TurnoverDifferential> GetAsync(Expression<Func<TurnoverDifferential, bool>> match)
        {
            return await DbSet.Include(t => t.Team)
                .Include(f => f.Tournament).ThenInclude(f => f.Season)
                .SingleAsync(match);
        }

        public IQueryable<TurnoverDifferential> GetManyByParam(Expression<Func<TurnoverDifferential, bool>> match)
        {
            return DbSet.Include(t => t.Team)
                .Include(f => f.Tournament).ThenInclude(f => f.Season)
                .OrderByDescending(f => f.Tournament.TournamentName)
                .Where(match).AsQueryable();
        }

        public override async Task<bool> AddAsync(TurnoverDifferential entity)
        {
            //map tournament,team
            entity.TournamentId = DbContext.Tournaments.FirstOrDefault
                (t => t.TournamentId == entity.Tournament.TournamentId).TournamentId;
            entity.TeamId = DbContext.Teams.FirstOrDefault
                (t => t.TeamId == entity.Team.TeamId).TeamId;

            DbSet.Add(entity);

            return await DbContext.SaveChangesAsync() > 0;
        }

        public override async Task<bool> UpdateAsync(TurnoverDifferential entity)
        {
            //map tournament,team
            entity.TournamentId = DbContext.Tournaments.FirstOrDefault
                (t => t.TournamentId == entity.Tournament.TournamentId).TournamentId;
            entity.TeamId = DbContext.Teams.FirstOrDefault
                (t => t.TeamId == entity.Team.TeamId).TeamId;

            DbSet.Update(entity);

            return await DbContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> RemoveAsync(int turnoverDifferentialId)
        {
            TurnoverDifferential turnoverDifferentialToBeDeleted = DbContext.TurnoverDifferentials
                .Where(q => q.TurnoverDifferentialId == turnoverDifferentialId).First();

            DbSet.Attach(turnoverDifferentialToBeDeleted);
            DbSet.Remove(turnoverDifferentialToBeDeleted);

            return await DbContext.SaveChangesAsync() > 0;
        }
    }
}
