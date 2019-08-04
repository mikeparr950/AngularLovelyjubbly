using AngularLovelyjubbly.Data.Sql.Models;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace AngularLovelyjubbly.Data.Sql.Contracts
{
    public interface IFixtureRepository : IGenericRepository<Fixture>
    {
        //add Fixture specific methods here
        IQueryable<Fixture> GetManyByParam(Expression<Func<Fixture, bool>> match);
        Task<bool> RemoveAsync(int id);
    }
}
