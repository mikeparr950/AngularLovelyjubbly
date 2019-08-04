using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AngularLovelyjubbly.Data.Sql.Contracts;
using AngularLovelyjubbly.Data.Sql.Models;

namespace AngularLovelyjubbly.Data.Sql.Repository
{
    public class QBRatingRepository : GenericRepository<QBRating>, IQBRatingRepository
    {
        public QBRatingRepository(ApplicationDbContext context) : base(context)
        {
        }

        public override IQueryable<QBRating> GetAll()
        {
            return DbSet.Include(t => t.Team)
                .Include(f => f.Tournament).ThenInclude(f => f.Season)
                .OrderByDescending(f => f.Tournament.TournamentName).AsQueryable();
        }

        public override async Task<QBRating> GetAsync(Expression<Func<QBRating, bool>> match)
        {
            return await DbSet.Include(t => t.Team)
                .Include(f => f.Tournament).ThenInclude(f => f.Season)
                .SingleAsync(match);
        }

        public IQueryable<QBRating> GetManyByParam(Expression<Func<QBRating, bool>> match)
        {
            return DbSet.Include(t => t.Team)
                .Include(f => f.Tournament).ThenInclude(f => f.Season)
                .OrderByDescending(f => f.Tournament.TournamentName)
                .Where(match).AsQueryable();
        }

        public override async Task<bool> AddAsync(QBRating entity)
        {
            //map tournament,team
            entity.TournamentId = DbContext.Tournaments.FirstOrDefault
                (t => t.TournamentId == entity.Tournament.TournamentId).TournamentId;
            entity.TeamId = DbContext.Teams.FirstOrDefault
                (t => t.TeamId == entity.Team.TeamId).TeamId;

            DbSet.Add(entity);

            return await DbContext.SaveChangesAsync() > 0;
        }

        public override async Task<bool> UpdateAsync(QBRating entity)
        {
            //map tournament,team
            entity.TournamentId = DbContext.Tournaments.FirstOrDefault
                (t => t.TournamentId == entity.Tournament.TournamentId).TournamentId;
            entity.TeamId = DbContext.Teams.FirstOrDefault
                (t => t.TeamId == entity.Team.TeamId).TeamId;

            DbSet.Update(entity);

            return await DbContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> RemoveAsync(int qbRatingId)
        {
            QBRating qbRatingToBeDeleted = DbContext.QBRatings.Where(q => q.QBRatingId == qbRatingId).First();

            DbSet.Attach(qbRatingToBeDeleted);
            DbSet.Remove(qbRatingToBeDeleted);

            return await DbContext.SaveChangesAsync() > 0;
        }
    }
}
