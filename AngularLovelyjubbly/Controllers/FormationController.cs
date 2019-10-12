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
    public class FormationController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ISqlUnitOfWork _sqlServerUow;

        public FormationController(
            ISqlUnitOfWork sqlServerUow)
        {
            _sqlServerUow = sqlServerUow;
        }

        // protect views with guard, protect api calls with [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)] 
        //GET: api/Formations
        [HttpGet("api/Formations")]
        public IQueryable<Formation> GetAllFormations()
        {
            return _sqlServerUow.Formations.GetAll().OrderBy(f => f.FormationName);
        }

        //GET: api/Formations/5
        [HttpGet("api/Formations/{formationId:int}")]
        public async Task<IActionResult> GetFormationById(int formationId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var formation = await _sqlServerUow.Formations.GetAsync(t => t.FormationId == formationId);

            if (formation == null)
            {
                return NotFound();
            }

            return Ok(formation);
        }
    }
}