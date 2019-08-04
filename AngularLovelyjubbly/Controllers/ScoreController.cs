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
    public class ScoreController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ISqlUnitOfWork _sqlServerUow;

        public ScoreController(ISqlUnitOfWork sqlServerUow)
        {
            _sqlServerUow = sqlServerUow;
        }

        //GET: api/Scores
        [HttpGet("api/Scores")]
        public IQueryable<Score> GetAllScores()
        {
            return _sqlServerUow.Scores.GetAll();
        }

        //GET: api/Scores/1
        [HttpGet("api/Scores/{scoreId:int}")]
        public async Task<IActionResult> GetScoreById(int scoreId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var score = await _sqlServerUow.Scores.GetAsync(s => s.ScoreId == scoreId);

            if (score == null)
            {
                return NotFound();
            }

            return Ok(score);
        }
    }
}