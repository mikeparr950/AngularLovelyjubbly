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
    public class ScoreRepository : GenericRepository<Score>, IScoreRepository
    {
        public ScoreRepository(ApplicationDbContext context) : base(context)
        {
        }

        public override IQueryable<Score> GetAll()
        {
            return DbSet.Include(s => s.Week).AsQueryable();
        }

        public override async Task<Score> GetAsync(Expression<Func<Score, bool>> match)
        {
            return await DbSet.Include(s => s.Week).SingleAsync(match);
        }
    }
}
