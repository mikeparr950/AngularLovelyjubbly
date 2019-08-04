using AngularLovelyjubbly.Data.Sql.Models;
using System;
using System.Linq;
using System.Linq.Expressions;

namespace AngularLovelyjubbly.Data.Sql.Contracts
{
    public interface IYardageRepository : IGenericRepository<Yardage>
    {
        //add Yardage specific methods here
        IQueryable<Yardage> GetManyByParam(Expression<Func<Yardage, bool>> match);
        //Task<bool> RemoveAsync(int id);
    }
}
