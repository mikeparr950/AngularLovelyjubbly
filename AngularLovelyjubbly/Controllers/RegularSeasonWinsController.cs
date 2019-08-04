using System.Linq;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AngularLovelyjubbly.Data.Sql.Models;
using AngularLovelyjubbly.Data.Sql.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System;
using Microsoft.EntityFrameworkCore;

namespace AngularLovelyjubbly.Controllers
{
    public class RegularSeasonWinsController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ISqlUnitOfWork _sqlServerUow;

        public RegularSeasonWinsController(ISqlUnitOfWork sqlServerUow)
        {
            _sqlServerUow = sqlServerUow;
        }

        //GET: api/RegularSeasonWins/5
        [HttpGet("api/RegularSeasonWins/{regularSeasonWinsId:int}")]
        public async Task<IActionResult> GetRegularSeasonWinsById(int regularSeasonWinsId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var regularSeasonWins = await _sqlServerUow.RegularSeasonWins.GetAsync(r => r.RegularSeasonWinsId == regularSeasonWinsId);

            if (regularSeasonWins == null)
            {
                return NotFound();
            }

            return Ok(regularSeasonWins);
        }

        //GET: api/RegularSeasonWinsByTeamId/1
        [HttpGet("api/RegularSeasonWinsByTeamId/{teamId:int}")]
        public IQueryable<RegularSeasonWins> GetRegularSeasonWinsByTeamId([FromRoute] int teamId)
        {
            return _sqlServerUow.RegularSeasonWins.GetManyByParam(r => r.TeamId == teamId);
        }

        //GET: api/RegularSeasonWinsByTeamName/Arizona Cardinals
        [HttpGet("api/RegularSeasonWinsByTeamName/{teamName}")]
        public IQueryable<RegularSeasonWins> GetRegularSeasonWinsByTeamName([FromRoute] string teamName)
        {
            return _sqlServerUow.RegularSeasonWins.GetManyByParam(r => r.Team.TeamName == teamName);
        }
    }
}
