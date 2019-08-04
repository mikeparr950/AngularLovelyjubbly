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
    public class FixtureController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ISqlUnitOfWork _sqlServerUow;

        public FixtureController(ISqlUnitOfWork sqlServerUow)
        {
            _sqlServerUow = sqlServerUow;
        }

        //GET: api/Fixtures
        [HttpGet("api/Fixtures")]
        public IQueryable<Fixture> GetAllFixtures()
        {
            return _sqlServerUow.Fixtures.GetAll();
        }

        //GET: api/Fixtures/1
        [HttpGet("api/Fixtures/{fixtureId:int}")]
        public async Task<IActionResult> GetFixtureById(int fixtureId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var fixture = await _sqlServerUow.Fixtures.GetAsync(f => f.FixtureId == fixtureId);

            if (fixture == null)
            {
                return NotFound();
            }

            return Ok(fixture);
        }

        //GET: api/FixturesByTeam/1
        [HttpGet("api/FixturesByTeam/{teamId:int}")]
        public IQueryable<Fixture> GetFixturesByTeam([FromRoute] int teamId)
        {
            return _sqlServerUow.Fixtures.GetManyByParam(t => t.HomeTeamId == teamId || t.AwayTeamId == teamId);
        }

        //GET: api/FixturesByTournament/2
        [HttpGet("api/FixturesByTournament/{tournamentId:int}")]
        public IQueryable<Fixture> GetFixturesByTournament([FromRoute] int tournamentId)
        {
            return _sqlServerUow.Fixtures.GetManyByParam(t => t.Tournament.TournamentId == tournamentId);
        }

        //GET: api/FixturesByTeamAndTournament/1/2024
        [HttpGet("api/FixturesByTeamAndTournament/{teamId:int}/{tournamentId:int}")]
        public IQueryable<Fixture> GetFixturesByTeamAndTournament([FromRoute] int teamId, int tournamentId)
        {
            return _sqlServerUow.Fixtures.GetManyByParam(t => (t.HomeTeamId == teamId || t.AwayTeamId == teamId) && (t.Tournament.TournamentId == tournamentId)).OrderBy(t => t.Week);
        }

        //POST : api/Fixtures/Add
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("api/Fixtures/Add")]
        public async Task<bool> AddFixture([FromBody] Fixture fixture)
        {
            bool fixtureAdded = false;

            try
            {
                fixtureAdded = await _sqlServerUow.Fixtures.AddAsync(fixture);
            }
            catch (Exception ex)
            {
            }

            return fixtureAdded;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut("api/Fixtures/Update")]
        public async Task<bool> UpdateFixture([FromBody] Fixture fixture)
        {
            bool fixtureUpdated = false;

            try
            {
                fixtureUpdated = await _sqlServerUow.Fixtures.UpdateAsync(fixture);
            }
            catch (DbUpdateConcurrencyException dex)
            {
            }
            catch (Exception ex)
            {
            }

            return fixtureUpdated;
        }

        // DELETE: api/Fixtures/Delete/5
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("api/Fixtures/Delete/{fixtureId:int}")]
        public async Task<bool> DeleteFixture([FromRoute] int fixtureId)
        {
            bool fixtureDeleted = false;

            try
            {
                fixtureDeleted = await _sqlServerUow.Fixtures.RemoveAsync(fixtureId);
            }
            catch (Exception ex)
            {
            }

            return fixtureDeleted;
        }
    }
}