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
    public class RecordController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ISqlUnitOfWork _sqlServerUow;

        public RecordController(ISqlUnitOfWork sqlServerUow)
        {
            _sqlServerUow = sqlServerUow;
        }

        //GET: api/Records
        [HttpGet("api/Records")]
        public IQueryable<Record> GetAllRecords()
        {
            return _sqlServerUow.Records.GetAll();
        }

        //GET: api/Records/1
        [HttpGet("api/Records/{recordId:int}")]
        public async Task<IActionResult> GetRecordById(int recordId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var record = await _sqlServerUow.Records.GetAsync(r => r.RecordId == recordId);

            if (record == null)
            {
                return NotFound();
            }

            return Ok(record);
        }

        //GET: api/RecordsByRecordCategory/1
        [HttpGet("api/RecordsByRecordCategory/{recordCategoryId:int}")]
        public IQueryable<Record> GetRecordsByRecordCategory([FromRoute] int recordCategoryId)
        {
            return _sqlServerUow.Records.GetManyByParam(r => r.RecordCategoryId == recordCategoryId);
        }
    }
}
