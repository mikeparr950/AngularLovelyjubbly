using System.Linq;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AngularLovelyjubbly.Data.Sql.Models;
using AngularLovelyjubbly.Data.Sql.Contracts;

namespace AngularLovelyjubbly.Controller
{
    public class SeasonController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ISqlUnitOfWork _sqlServerUow;

        public SeasonController(ISqlUnitOfWork sqlServerUow)
        {
            _sqlServerUow = sqlServerUow;
        }

        //GET: api/Seasons
        [HttpGet("api/Seasons")]
        public IQueryable<Season> GetAllSeasons()
        {
            return _sqlServerUow.Seasons.GetAll();
        }
    }
}
