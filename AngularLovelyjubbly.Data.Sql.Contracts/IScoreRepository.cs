using AngularLovelyjubbly.Data.Sql.Models;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace AngularLovelyjubbly.Data.Sql.Contracts
{
    public interface IScoreRepository : IGenericRepository<Score>
    {
        //add Score specific methods here
    }
}
