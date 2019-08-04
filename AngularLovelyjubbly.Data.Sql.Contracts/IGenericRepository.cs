using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace AngularLovelyjubbly.Data.Sql.Contracts
{
    public interface IGenericRepository<T> where T : class
    {
        IQueryable<T> GetAll();
        Task<T> GetAsync(Expression<Func<T, bool>> match);
        T Get(Expression<Func<T, bool>> match);
        Task<bool> AddAsync(T entity);
        Task<bool> UpdateAsync(T entity);
        Task<bool> RemoveAsync(T entity);
    }
}
