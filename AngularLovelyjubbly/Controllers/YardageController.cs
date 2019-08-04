using System.Linq;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AngularLovelyjubbly.Data.Sql.Models;
using AngularLovelyjubbly.Data.Sql.Contracts;

namespace AngularLovelyjubbly.Controller
{
    public class YardageController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ISqlUnitOfWork _sqlServerUow;

        public YardageController(ISqlUnitOfWork sqlServerUow)
        {
            _sqlServerUow = sqlServerUow;
        }

        //GET: api/Yardages
        [HttpGet("api/Yardages")]
        public IQueryable<Yardage> GetAllYardages()
        {
            return _sqlServerUow.Yardages.GetAll();
        }

        //GET: api/Yardages/1
        [HttpGet("api/Yardages/{yardageId:int}")]
        public async Task<IActionResult> GetYardageById(int yardageId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var yardage = await _sqlServerUow.Yardages
                .GetAsync(t => t.YardageId == yardageId);

            if (yardage == null)
            {
                return NotFound();
            }

            return Ok(yardage);
        }

        //GET: api/YardagesBySeasonName/2023
        [HttpGet("api/YardagesBySeasonName/{seasonName}")]
        public IQueryable<Yardage> GetYardagesBySeasonName([FromRoute] string seasonName)
        {
            return _sqlServerUow.Yardages.GetManyByParam(t => t.Tournament.TournamentName.Substring(t.Tournament.TournamentName.Length - 4) == seasonName);
        }
    }
}