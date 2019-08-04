using System.Linq;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AngularLovelyjubbly.Data.Sql.Models;
using AngularLovelyjubbly.Data.Sql.Contracts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using System;

namespace AngularLovelyjubbly.Controller
{
    public class WeekController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ISqlUnitOfWork _sqlServerUow;

        public WeekController(ISqlUnitOfWork sqlServerUow)
        {
            _sqlServerUow = sqlServerUow;
        }

        //GET: api/Weeks
        [HttpGet("api/Weeks")]
        public IQueryable<Week> GetAllWeeks()
        {
            return _sqlServerUow.Weeks.GetAll();
        }

        //GET: api/Weeks/5
        [HttpGet("api/Weeks/{weekNumber:int}")]
        public async Task<IActionResult> GetWeekByWeekNumber(int weekNumber)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var week = await _sqlServerUow.Weeks.GetAsync(w => Convert.ToInt32(w.WeekNumber) == weekNumber);

            if (week == null)
            {
                return NotFound();
            }

            return Ok(week);
        }
    }
}
