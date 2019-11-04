using AngularLovelyjubbly.Data.Sql.Models;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace AngularLovelyjubbly.Data.Sql.Contracts
{
    public interface IPlayResultRepository : IGenericRepository<PlayResult>
    {
        //add PlayResult specific methods here
        IQueryable<PlayResult> GetManyByParam(Expression<Func<PlayResult, bool>> match);
    }
}
