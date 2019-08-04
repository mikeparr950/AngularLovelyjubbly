using System;
using System.Linq;
using System.Linq.Expressions;
using AngularLovelyjubbly.Data.Sql.Models;

namespace AngularLovelyjubbly.Data.Sql.Contracts
{
    public interface IRecordRepository : IGenericRepository<Record>
    {
        //add Record specific methods here
        IQueryable<Record> GetManyByParam(Expression<Func<Record, bool>> match);
    }
}
