using AngularLovelyjubbly.Data.Sql.Models;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace AngularLovelyjubbly.Data.Sql.Contracts
{
    public interface IQBRatingRepository : IGenericRepository<QBRating>
    {
        //add QBRating specific methods here
        IQueryable<QBRating> GetManyByParam(Expression<Func<QBRating, bool>> match);
        Task<bool> RemoveAsync(int id);
    }
}
