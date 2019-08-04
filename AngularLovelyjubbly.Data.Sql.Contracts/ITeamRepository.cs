using AngularLovelyjubbly.Data.Sql.Models;
using System.Threading.Tasks;

namespace AngularLovelyjubbly.Data.Sql.Contracts
{
    public interface ITeamRepository : IGenericRepository<Team>
    {
        //add Team specific methods here
        Task<bool> RemoveAsync(int id);
    }
}
