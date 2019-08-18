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
    public class DivisionController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ISqlUnitOfWork _sqlServerUow;

        public DivisionController(
            ISqlUnitOfWork sqlServerUow)
        {
            _sqlServerUow = sqlServerUow;
        }

        // protect views with guard, protect api calls with [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)] 
        //GET: api/Divisions
        [ResponseCache(Duration = 2419200)] //cache 28 days
        [HttpGet("api/Divisions")]
        public IQueryable<Division> GetAllDivisions()
        {
            return _sqlServerUow.Divisions.GetAll().OrderBy(d => d.DivisionName);
        }

        //GET: api/Divisions/5
        [HttpGet("api/Divisions/{divisionId:int}")]
        public async Task<IActionResult> GetDivisionById(int divisionId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var division = await _sqlServerUow.Divisions.GetAsync(t => t.DivisionId == divisionId);

            if (division == null)
            {
                return NotFound();
            }

            return Ok(division);
        }

        //GET: api/Divisions/AFC East
        [HttpGet("api/Divisions/{divisionName}")]
        public async Task<IActionResult> GetDivisionByName([FromRoute] string divisionName)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var division = await _sqlServerUow.Divisions.GetAsync(t => t.DivisionName == divisionName);

            if (division == null)
            {
                return NotFound();
            }

            return Ok(division);
        }
    }
}