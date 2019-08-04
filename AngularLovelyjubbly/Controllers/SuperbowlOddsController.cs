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
    public class SuperbowlOddsController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ISqlUnitOfWork _sqlServerUow;

        public SuperbowlOddsController(ISqlUnitOfWork sqlServerUow)
        {
            _sqlServerUow = sqlServerUow;
        }

        //GET: api/SuperbowlOdds
        [HttpGet("api/SuperbowlOdds")]
        public IQueryable<SuperbowlOdds> GetAllSuperbowlOdds()
        {
            return _sqlServerUow.SuperbowlOdds.GetAll();
        }

        //GET: api/SuperbowlOdds/1
        [HttpGet("api/SuperbowlOdds/{superbowlOddsId:int}")]
        public async Task<IActionResult> GeSuperbowlOddById(int superbowlOddsId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var superbowlOdd = await _sqlServerUow.SuperbowlOdds
                .GetAsync(t => t.SuperbowlOddsId == superbowlOddsId);

            if (superbowlOdd == null)
            {
                return NotFound();
            }

            return Ok(superbowlOdd);
        }

        //GET: api/SuperbowlOddsBySeasonName/2023
        [HttpGet("api/SuperbowlOddsBySeasonName/{seasonName}")]
        public IQueryable<SuperbowlOdds> GetSuperbowlOddsBySeasonName([FromRoute] string seasonName)
        {
            return _sqlServerUow.SuperbowlOdds.GetManyByParam(t => t.Tournament.TournamentName.Substring(t.Tournament.TournamentName.Length - 4) == seasonName);
        }
    }
}
