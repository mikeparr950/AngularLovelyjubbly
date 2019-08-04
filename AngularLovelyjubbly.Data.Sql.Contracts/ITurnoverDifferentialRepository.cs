using AngularLovelyjubbly.Data.Sql.Models;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace AngularLovelyjubbly.Data.Sql.Contracts
{
    public interface ITurnoverDifferentialRepository : IGenericRepository<TurnoverDifferential>
    {
        //add TurnoverDifferential specific methods here
        IQueryable<TurnoverDifferential> GetManyByParam(Expression<Func<TurnoverDifferential, bool>> match);
        Task<bool> RemoveAsync(int id);
    }
}
