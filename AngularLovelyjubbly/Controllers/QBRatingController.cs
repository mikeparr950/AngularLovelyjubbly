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
    public class QBRatingController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ISqlUnitOfWork _sqlServerUow;

        public QBRatingController(ISqlUnitOfWork sqlServerUow)
        {
            _sqlServerUow = sqlServerUow;
        }

        //GET: api/QBRatings
        [HttpGet("api/QBRatings")]
        public IQueryable<QBRating> GetAllQBRatings()
        {
            return _sqlServerUow.QBRatings.GetAll();
        }

        //GET: api/QBRatings/1
        [HttpGet("api/QBRatings/{qbRatingId:int}")]
        public async Task<IActionResult> GetQBRatingById(int qbRatingId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var qbRating = await _sqlServerUow.QBRatings.GetAsync(q => q.QBRatingId == qbRatingId);

            if (qbRating == null)
            {
                return NotFound();
            }

            return Ok(qbRating);
        }

        //GET: api/QBRatingsBySeasonName/2023
        [HttpGet("api/QBRatingsBySeasonName/{seasonName}")]
        public IQueryable<QBRating> GetQBRatingsBySeasonName([FromRoute] string seasonName)
        {
            return _sqlServerUow.QBRatings.GetManyByParam(t => t.Tournament.TournamentName.Substring(t.Tournament.TournamentName.Length - 4) == seasonName);
        }

        //POST : api/QBRatings/Add
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("api/QBRatings/Add")]
        public async Task<bool> AddQBRating([FromBody] QBRating qbRating)
        {
            bool qbRatingAdded = false;

            try
            {
                qbRatingAdded = await _sqlServerUow.QBRatings.AddAsync(qbRating);
            }
            catch (Exception ex)
            {
            }

            return qbRatingAdded;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut("api/QBRatings/Update")]
        public async Task<bool> UpdateQBRating([FromBody] QBRating qbRating)
        {
            bool qbRatingUpdated = false;

            try
            {
                qbRatingUpdated = await _sqlServerUow.QBRatings.UpdateAsync(qbRating);
            }
            catch (DbUpdateConcurrencyException dex)
            {
            }
            catch (Exception ex)
            {
            }

            return qbRatingUpdated;
        }

        // DELETE: api/QBRatings/Delete/5
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("api/QBRatings/Delete/{qbRatingId:int}")]
        public async Task<bool> DeleteQBRating([FromRoute] int qbRatingId)
        {
            bool qbRatingDeleted = false;

            try
            {
                qbRatingDeleted = await _sqlServerUow.QBRatings.RemoveAsync(qbRatingId);
            }
            catch (Exception ex)
            {
            }

            return qbRatingDeleted;
        }
    }
}
