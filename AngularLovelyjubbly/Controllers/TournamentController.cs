using System.Linq;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AngularLovelyjubbly.Data.Sql.Models;
using AngularLovelyjubbly.Data.Sql.Contracts;

namespace AngularLovelyjubbly.Controller
{
    public class TournamentController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ISqlUnitOfWork _sqlServerUow;

        public TournamentController(ISqlUnitOfWork sqlServerUow)
        {
            _sqlServerUow = sqlServerUow;
        }

        //GET: api/Tournaments
        [HttpGet("api/Tournaments")]
        public IQueryable<Tournament> GetAllTournaments()
        {
            return _sqlServerUow.Tournaments.GetAll();
        }

        //GET: api/Tournaments/5
        [HttpGet("api/Tournaments/{tournamentId:int}")]
        public async Task<IActionResult> GetTournamentById(int tournamentId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tournament = await _sqlServerUow.Tournaments.GetAsync(t => t.TournamentId == tournamentId);

            if (tournament == null)
            {
                return NotFound();
            }

            return Ok(tournament);
        }

        //GET: api/Tournaments/Gameplan Advanced NFLC League 1992
        [HttpGet("api/Tournaments/{tournamentName}")]
        public async Task<IActionResult> GetTournamentByName([FromRoute] string tournamentName)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tournament = await _sqlServerUow.Tournaments.GetAsync(t => t.TournamentName == tournamentName);

            if (tournament == null)
            {
                return NotFound();
            }

            return Ok(tournament);
        }
    }
}
