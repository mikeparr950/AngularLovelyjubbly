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
    public class PowerRankingController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ISqlUnitOfWork _sqlServerUow;

        public PowerRankingController(ISqlUnitOfWork sqlServerUow)
        {
            _sqlServerUow = sqlServerUow;
        }

        //GET: api/PowerRankings
        [HttpGet("api/PowerRankings")]
        public IQueryable<PowerRanking> GetAllPowerRankings()
        {
            return _sqlServerUow.PowerRankings.GetAll();
        }

        //GET: api/PowerRankings/1
        [HttpGet("api/PowerRankings/{powerRankingId:int}")]
        public async Task<IActionResult> GetPowerRankingById(int powerRankingId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var powerRanking = await _sqlServerUow.PowerRankings.GetAsync(p => p.PowerRankingId == powerRankingId);

            if (powerRanking == null)
            {
                return NotFound();
            }

            return Ok(powerRanking);
        }

        //GET: api/PowerRankingsByTournament/2
        [HttpGet("api/PowerRankingsByTournament/{tournamentId:int}")]
        public IQueryable<PowerRanking> GetPowerRankingsByTournament([FromRoute] int tournamentId)
        {
            return _sqlServerUow.PowerRankings.GetManyByParam(p => p.Tournament.TournamentId == tournamentId);
        }

        //GET: api/PowerRankingsByTournamentAndWeek/2/12
        [HttpGet("api/PowerRankingsByTournamentAndWeek/{tournamentId:int}/{weekId:int}")]
        public IQueryable<PowerRanking> GetPowerRankingsByTournamentAndWeek([FromRoute] int tournamentId, int weekId)
        {
            return _sqlServerUow.PowerRankings.GetManyByParam(p => p.Tournament.TournamentId == tournamentId
            && p.Week.WeekId == weekId);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut("api/PowerRankings/Update")]
        public async Task<bool> UpdatePowerRankings([FromBody] int[] powerRankingIds)
        {
            bool powerRankingsUpdated = false;

            try
            {
                byte count = 1;

                //make this a transaction?
                foreach (int element in powerRankingIds)
                {
                    PowerRanking pr = new PowerRanking();
                    pr = _sqlServerUow.PowerRankings.Get(p => p.PowerRankingId == element);
                    pr.PreviousRanking = pr.CurrentRanking;
                    pr.CurrentRanking = count;

                    powerRankingsUpdated = await _sqlServerUow.PowerRankings.UpdateAsync(pr);

                    count++;
                }
            }
            catch (DbUpdateConcurrencyException dex)
            {
            }
            catch (Exception ex)
            {
            }

            return powerRankingsUpdated;
        }
    }
}
