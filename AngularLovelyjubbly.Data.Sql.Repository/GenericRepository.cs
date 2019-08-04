using AngularLovelyjubbly.Data.Sql.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace AngularLovelyjubbly.Data.Sql.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected ApplicationDbContext DbContext { get; set; }
        protected DbSet<T> DbSet { get; set; }

        public GenericRepository(ApplicationDbContext dbContext)
        {
            if (dbContext == null)
            {
                throw new ArgumentNullException("dbContext");
            }

            DbContext = dbContext;
            DbSet = DbContext.Set<T>();
        }

        public virtual IQueryable<T> GetAll()
        {
            return DbSet.AsQueryable();
        }

        public virtual async Task<T> GetAsync(Expression<Func<T, bool>> match)
        {
            return await DbSet.SingleAsync(match);
        }

        public virtual T Get(Expression<Func<T, bool>> match)
        {
            return DbSet.Single(match);
        }

        public virtual async Task<bool> AddAsync(T entity)
        {
            DbSet.Add(entity);

            return await DbContext.SaveChangesAsync() > 0;
        }

        public virtual async Task<bool> UpdateAsync(T entity)
        {
            DbSet.Attach(entity);

            return await DbContext.SaveChangesAsync() > 0;
        }

        public virtual async Task<bool> RemoveAsync(T entity)
        {
            DbSet.Attach(entity);
            DbSet.Remove(entity);

            return await DbContext.SaveChangesAsync() > 0;
        }
    }
}
