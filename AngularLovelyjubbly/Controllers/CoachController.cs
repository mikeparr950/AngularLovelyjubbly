using System.Linq;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AngularLovelyjubbly.Data.Sql.Models;
using AngularLovelyjubbly.Data.Sql.Contracts;

namespace AngularLovelyjubbly.Controllers
{
    public class CoachController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ISqlUnitOfWork _sqlServerUow;

        public CoachController(ISqlUnitOfWork sqlServerUow)
        {
            _sqlServerUow = sqlServerUow;
        }

        //GET: api/Coaches
        [HttpGet("api/Coaches")]
        public IQueryable<Coach> GetAllCoaches()
        {
            return _sqlServerUow.Coaches.GetAll().OrderBy(c => c.CoachName);
        }

        //GET: api/Coaches/5
        [HttpGet("api/Coaches/{coachId:int}")]
        public async Task<IActionResult> GetCoachById(int coachId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var coach = await _sqlServerUow.Coaches.GetAsync(c => c.CoachId == coachId);

            if (coach == null)
            {
                return NotFound();
            }

            return Ok(coach);
        }

        //GET: api/Coaches/Mike Parr
        [HttpGet("api/Coaches/{coachName}")]
        public async Task<IActionResult> GetCoachByName([FromRoute] string coachName)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var coach = await _sqlServerUow.Coaches.GetAsync(c => c.CoachName == coachName);

            if (coach == null)
            {
                return NotFound();
            }

            return Ok(coach);
        }
    }
}