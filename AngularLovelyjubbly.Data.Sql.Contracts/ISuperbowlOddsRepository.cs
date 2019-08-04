using AngularLovelyjubbly.Data.Sql.Models;
using System;
using System.Linq;
using System.Linq.Expressions;

namespace AngularLovelyjubbly.Data.Sql.Contracts
{
    public interface ISuperbowlOddsRepository : IGenericRepository<SuperbowlOdds>
    {
        //add SuperbowlOdds specific methods here
        IQueryable<SuperbowlOdds> GetManyByParam(Expression<Func<SuperbowlOdds, bool>> match);
    }
}
