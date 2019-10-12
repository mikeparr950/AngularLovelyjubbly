using AngularLovelyjubbly.Data.Sql.Contracts;
using AngularLovelyjubbly.Data.Sql.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace AngularLovelyjubbly.Data.Sql.Repository
{
    public class PlayResultRepository : GenericRepository<PlayResult>, IPlayResultRepository
    {
        public PlayResultRepository(ApplicationDbContext context) : base(context)
        {

        }

        public override IQueryable<PlayResult> GetAll()
        {
            //AsNoTracking for none CUD operations
            return DbSet.Include(p => p.Formation)
                .Include(p => p.OffensivePlay)
                .Include(p => p.DefensivePlay);
        }

        public override async Task<PlayResult> GetAsync(Expression<Func<PlayResult, bool>> match)
        {
            return await DbSet.Include(p => p.Formation)
                .Include(p => p.OffensivePlay)
                .Include(p => p.DefensivePlay)
                .SingleAsync(match);
        }
    }
}
