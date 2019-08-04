using System.Linq;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AngularLovelyjubbly.Data.Sql.Models;
using AngularLovelyjubbly.Data.Sql.Contracts;
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace AngularLovelyjubbly.Controllers
{
    public class TeamController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ISqlUnitOfWork _sqlServerUow;

        public TeamController(ISqlUnitOfWork sqlServerUow)
        {
            _sqlServerUow = sqlServerUow;
        }

        //GET: api/Teams
        [HttpGet("api/Teams")]
        public IQueryable<Team> GetAllTeams()
        {
            return _sqlServerUow.Teams.GetAll();
        }

        //GET: api/Teams/1
        [HttpGet("api/Teams/{teamId:int}")]
        public async Task<IActionResult> GetTeamById(int teamId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var team = await _sqlServerUow.Teams.GetAsync(t => t.TeamId == teamId);

            if (team == null)
            {
                return NotFound();
            }

            return Ok(team);
        }

        //GET: api/Teams/Arizona Cardinals
        [HttpGet("api/Teams/{teamName}")]
        public async Task<IActionResult> GetTeamByName([FromRoute] string teamName)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var team = await _sqlServerUow.Teams.GetAsync(t => t.TeamName == teamName);

            if (team == null)
            {
                return NotFound();
            }

            return Ok(team);
        }

        //POST : api/Teams/Add
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("api/Teams/Add")]
        public async Task<bool> AddTeam([FromBody] Team team)
        {
            bool teamAdded = false;

            try
            {
                teamAdded = await _sqlServerUow.Teams.AddAsync(team);
            }
            catch (Exception ex)
            {
            }

            return teamAdded;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut("api/Teams/Update")]
        public async Task<bool> UpdateTeam([FromBody] Team team)
        {
            bool teamUpdated = false;

            try
            {
                teamUpdated = await _sqlServerUow.Teams.UpdateAsync(team);
            }
            catch (DbUpdateConcurrencyException dex)
            {
            }
            catch (Exception ex)
            {
            }

            return teamUpdated;
        }

        // DELETE: api/Teams/Delete/5
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)] 
        [HttpDelete("api/Teams/Delete/{teamId:int}")]
        public async Task<bool> DeleteTeam([FromRoute] int teamId)
        {
            bool teamDeleted = false;

            try
            {
                teamDeleted = await _sqlServerUow.Teams.RemoveAsync(teamId);
            }
            catch (Exception ex)
            {
            }

            return teamDeleted;
        }
    }
}
