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
    public class OffensivePlayController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ISqlUnitOfWork _sqlServerUow;

        public OffensivePlayController(
            ISqlUnitOfWork sqlServerUow)
        {
            _sqlServerUow = sqlServerUow;
        }

        // protect views with guard, protect api calls with [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)] 
        //GET: api/OffensivePlays
        [HttpGet("api/OffensivePlays")]
        public IQueryable<OffensivePlay> GetAllOffensivePlays()
        {
            return _sqlServerUow.OffensivePlays.GetAll().OrderBy(f => f.OffensivePlayName);
        }

        //GET: api/OffensivePlays/5
        [HttpGet("api/OffensivePlays/{offensivePlayId:int}")]
        public async Task<IActionResult> GetOffensivePlayById(int offensivePlayId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var offensivePlay = await _sqlServerUow.OffensivePlays.GetAsync(t => t.OffensivePlayId == offensivePlayId);

            if (offensivePlay == null)
            {
                return NotFound();
            }

            return Ok(offensivePlay);
        }
    }
}