using AngularLovelyjubbly.Data.Sql.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace AngularLovelyjubbly.Data.Sql.Contracts
{
    public interface IRegularSeasonWinsRepository : IGenericRepository<RegularSeasonWins>
    {
        //add RegularSeasonWins specific methods here
        IQueryable<RegularSeasonWins> GetManyByParam(Expression<Func<RegularSeasonWins, bool>> match);
    }
}
