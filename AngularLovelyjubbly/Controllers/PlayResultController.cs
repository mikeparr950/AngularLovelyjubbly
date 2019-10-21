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

namespace AngularLovelyjubbly.Controller
{
    public class PlayResultController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ISqlUnitOfWork _sqlServerUow;

        public PlayResultController(ISqlUnitOfWork sqlServerUow)
        {
            _sqlServerUow = sqlServerUow;
        }

        //GET: api/PlayResults
        [HttpGet("api/PlayResults")]
        public IQueryable<PlayResult> GetAllPlayResults()
        {
            return _sqlServerUow.PlayResults.GetAll();
        }

        //GET: api/PlayResults/1
        [HttpGet("api/PlayResults/{playResultId:int}")]
        public async Task<IActionResult> GetPlayResultById(int playResultId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var playResult = await _sqlServerUow.PlayResults.GetAsync(p => p.PlayResultId == playResultId);

            if (playResult == null)
            {
                return NotFound();
            }

            return Ok(playResult);
        }

        ////GET: api/FixturesByTeam/1
        //[HttpGet("api/FixturesByTeam/{teamId:int}")]
        //public IQueryable<Fixture> GetFixturesByTeam([FromRoute] int teamId)
        //{
        //    return _sqlServerUow.Fixtures.GetManyByParam(t => t.HomeTeamId == teamId || t.AwayTeamId == teamId);
        //}

        //POST : api/PlayResults/Add
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("api/PlayResults/Add")]
        public async Task<bool> AddPlayResult([FromBody] PlayResult playResult)
        {
            bool playResultAdded = false;

            try
            {
                playResultAdded = await _sqlServerUow.PlayResults.AddAsync(playResult);
            }
            catch (Exception ex)
            {
            }

            return playResultAdded;
        }

        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //[HttpPut("api/Fixtures/Update")]
        //public async Task<bool> UpdateFixture([FromBody] Fixture fixture)
        //{
        //    bool fixtureUpdated = false;

        //    try
        //    {
        //        fixtureUpdated = await _sqlServerUow.Fixtures.UpdateAsync(fixture);
        //    }
        //    catch (DbUpdateConcurrencyException dex)
        //    {
        //    }
        //    catch (Exception ex)
        //    {
        //    }

        //    return fixtureUpdated;
        //}

        //// DELETE: api/Fixtures/Delete/5
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //[HttpDelete("api/Fixtures/Delete/{fixtureId:int}")]
        //public async Task<bool> DeleteFixture([FromRoute] int fixtureId)
        //{
        //    bool fixtureDeleted = false;

        //    try
        //    {
        //        fixtureDeleted = await _sqlServerUow.Fixtures.RemoveAsync(fixtureId);
        //    }
        //    catch (Exception ex)
        //    {
        //    }

        //    return fixtureDeleted;
        //}
    }
}