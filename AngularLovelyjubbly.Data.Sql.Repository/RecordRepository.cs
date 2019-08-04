using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AngularLovelyjubbly.Data.Sql.Contracts;
using AngularLovelyjubbly.Data.Sql.Models;

namespace AngularLovelyjubbly.Data.Sql.Repository
{
    public class RecordRepository : GenericRepository<Record>, IRecordRepository
    {
        public RecordRepository(ApplicationDbContext context) : base(context)
        {
        }

        public override IQueryable<Record> GetAll()
        {
            return DbSet.Include(r => r.Team)
                .Include(r => r.Season)
                .Include(r => r.RecordCategory)
                .Include(r => r.Coach)
                .Include(r => r.Week)
                .OrderBy(r => r.RecordCategory).ThenBy(r => r.Rank).AsQueryable();
        }

        public override async Task<Record> GetAsync(Expression<Func<Record, bool>> match)
        {
            return await DbSet.Include(r => r.Team)
                .Include(r => r.Season)
                .Include(r => r.RecordCategory)
                .Include(r => r.Coach)
                .Include(r => r.Week)
                .SingleAsync(match);
        }

        public IQueryable<Record> GetManyByParam(Expression<Func<Record, bool>> match)
        {
            return DbSet.Include(r => r.Team)
                .Include(r => r.Season)
                .Include(r => r.RecordCategory)
                .Include(r => r.Coach)
                .Include(r => r.Week)
                .OrderBy(r => r.RecordCategory).ThenBy(r => r.Rank)
                .Where(match).AsQueryable();
        }
    }
}
