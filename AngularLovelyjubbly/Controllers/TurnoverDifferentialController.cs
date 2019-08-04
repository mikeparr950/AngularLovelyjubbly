using System.Linq;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AngularLovelyjubbly.Data.Sql.Models;
using AngularLovelyjubbly.Data.Sql.Contracts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using System;
using Microsoft.EntityFrameworkCore;

namespace AngularLovelyjubbly.Controller
{
    public class TurnoverDifferentialController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ISqlUnitOfWork _sqlServerUow;

        public TurnoverDifferentialController(ISqlUnitOfWork sqlServerUow)
        {
            _sqlServerUow = sqlServerUow;
        }

        //GET: api/TurnoverDifferentials
        [HttpGet("api/TurnoverDifferentials")]
        public IQueryable<TurnoverDifferential> GetAllTurnoverDifferentials()
        {
            return _sqlServerUow.TurnoverDifferentials.GetAll();
        }

        //GET: api/TurnoverDifferentials/1
        [HttpGet("api/TurnoverDifferentials/{turnoverDifferentialId:int}")]
        public async Task<IActionResult> GetTurnoverDifferentialById(int turnoverDifferentialId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var turnoverDifferential = await _sqlServerUow.TurnoverDifferentials
                .GetAsync(t => t.TurnoverDifferentialId == turnoverDifferentialId);

            if (turnoverDifferential == null)
            {
                return NotFound();
            }

            return Ok(turnoverDifferential);
        }

        //GET: api/TurnoverDifferentialsBySeasonName/2023
        [HttpGet("api/TurnoverDifferentialsBySeasonName/{seasonName}")]
        public IQueryable<TurnoverDifferential> GetTurnoverDifferentialsBySeasonName([FromRoute] string seasonName)
        {
            return _sqlServerUow.TurnoverDifferentials.GetManyByParam(t => t.Tournament.TournamentName.Substring(t.Tournament.TournamentName.Length - 4) == seasonName);
        }

        //POST : api/TurnoverDifferentials/Add
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("api/TurnoverDifferentials/Add")]
        public async Task<bool> AddTurnoverDifferential([FromBody] TurnoverDifferential turnoverDifferential)
        {
            bool turnoverDifferentialAdded = false;

            try
            {
                turnoverDifferentialAdded = await _sqlServerUow.TurnoverDifferentials.AddAsync(turnoverDifferential);
            }
            catch (Exception ex)
            {
            }

            return turnoverDifferentialAdded;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut("api/TurnoverDifferentials/Update")]
        public async Task<bool> UpdateTurnoverDifferential([FromBody] TurnoverDifferential turnoverDifferential)
        {
            bool turnoverDifferentialUpdated = false;

            try
            {
                turnoverDifferentialUpdated = await _sqlServerUow.TurnoverDifferentials.UpdateAsync(turnoverDifferential);
            }
            catch (DbUpdateConcurrencyException dex)
            {
            }
            catch (Exception ex)
            {
            }

            return turnoverDifferentialUpdated;
        }

        // DELETE: api/TurnoverDifferentials/Delete/5
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("api/TurnoverDifferentials/Delete/{turnoverDifferentialId:int}")]
        public async Task<bool> DeleteTurnoverDifferential([FromRoute] int turnoverDifferentialId)
        {
            bool turnoverDifferentialDeleted = false;

            try
            {
                turnoverDifferentialDeleted = await _sqlServerUow.TurnoverDifferentials.RemoveAsync(turnoverDifferentialId);
            }
            catch (Exception ex)
            {
            }

            return turnoverDifferentialDeleted;
        }
    }
}
