using System.Linq;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AngularLovelyjubbly.Data.Sql.Models;
using AngularLovelyjubbly.Data.Sql.Contracts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Net;
using Microsoft.AspNetCore.Authorization;

namespace AngularLovelyjubbly.Controller
{
    public class DefensivePlayController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ISqlUnitOfWork _sqlServerUow;

        public DefensivePlayController(
            ISqlUnitOfWork sqlServerUow)
        {
            _sqlServerUow = sqlServerUow;
        }

        // protect views with guard, protect api calls with [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)] 
        //GET: api/DefensivePlays
        [HttpGet("api/DefensivePlays")]
        public IQueryable<DefensivePlay> GetAllDefensivePlays()
        {
            return _sqlServerUow.DefensivePlays.GetAll().OrderBy(f => f.DefensivePlayName);
        }

        //GET: api/DefensivePlays/5
        [HttpGet("api/DefensivePlays/{defensivePlayId:int}")]
        public async Task<IActionResult> GetDefensivePlayById(int defensivePlayId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var defensivePlay = await _sqlServerUow.DefensivePlays.GetAsync(t => t.DefensivePlayId == defensivePlayId);

            if (defensivePlay == null)
            {
                return NotFound();
            }

            return Ok(defensivePlay);
        }
    }
}