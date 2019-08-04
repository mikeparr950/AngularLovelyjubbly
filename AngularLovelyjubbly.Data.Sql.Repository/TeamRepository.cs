using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AngularLovelyjubbly.Data.Sql.Contracts;
using AngularLovelyjubbly.Data.Sql.Models;

namespace AngularLovelyjubbly.Data.Sql.Repository
{
    public class TeamRepository : GenericRepository<Team>, ITeamRepository
    {
        public TeamRepository(ApplicationDbContext context) : base(context)
        {
        }

        public override IQueryable<Team> GetAll()
        {
            return DbSet.Include(d => d.Division)
                .Include(c => c.Coach)
                .OrderBy(t => t.TeamName).AsQueryable();
        }

        public override async Task<Team> GetAsync(Expression<Func<Team, bool>> match)
        {
            return await DbSet.Include(d => d.Division)
                .Include(c => c.Coach)
                .SingleAsync(match);
        }

        public override async Task<bool> AddAsync(Team entity)
        {
            //map division and coach id
            entity.DivisionId =
                DbContext.Divisions.FirstOrDefault(t => t.DivisionId == entity.Division.DivisionId).DivisionId;
            entity.CoachId = DbContext.Coaches.FirstOrDefault(c => c.CoachId == entity.Coach.CoachId).CoachId;

            DbSet.Add(entity);

            return await DbContext.SaveChangesAsync() > 0;
        }

        public override async Task<bool> UpdateAsync(Team entity)
        {
            //map division and coach id
            entity.DivisionId =
                DbContext.Divisions.FirstOrDefault(t => t.DivisionId == entity.Division.DivisionId).DivisionId;
            entity.CoachId = DbContext.Coaches.FirstOrDefault(c => c.CoachId == entity.Coach.CoachId).CoachId;

            DbSet.Update(entity);

            return await DbContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> RemoveAsync(int teamId)
        {
            Team teamToBeDeleted = DbContext.Teams.Where(t => t.TeamId == teamId).First();

            DbSet.Attach(teamToBeDeleted);
            DbSet.Remove(teamToBeDeleted);

            return await DbContext.SaveChangesAsync() > 0;
        }
    }
}
