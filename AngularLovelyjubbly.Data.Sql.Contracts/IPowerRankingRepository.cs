using System;
using AngularLovelyjubbly.Data.Sql.Models;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace AngularLovelyjubbly.Data.Sql.Contracts
{
    public interface IPowerRankingRepository : IGenericRepository<PowerRanking>
    {
        //add PowerRanking specific methods here
        IQueryable<PowerRanking> GetManyByParam(Expression<Func<PowerRanking, bool>> match);
    }
}
