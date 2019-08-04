using System.Linq;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AngularLovelyjubbly.Data.Sql.Models;
using AngularLovelyjubbly.Data.Sql.Contracts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Net;
using Microsoft.AspNetCore.Authorization;

namespace AngularLovelyjubbly.Controller
{
    public class RecordCategoryController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ISqlUnitOfWork _sqlServerUow;

        public RecordCategoryController(
            ISqlUnitOfWork sqlServerUow)
        {
            _sqlServerUow = sqlServerUow;
        }

        // protect views with guard, protect api calls with [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)] 
        //GET: api/RecordCategories
        [HttpGet("api/RecordCategories")]
        public IQueryable<RecordCategory> GetAllRecordCategories()
        {
            return _sqlServerUow.RecordCategories.GetAll().OrderBy(r => r.RecordCategoryName);
        }

        //GET: api/RecordCategories/5
        [HttpGet("api/RecordCategories/{recordCategoryId:int}")]
        public async Task<IActionResult> GetRecordCategoryById(int recordCategoryId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var recordCategory = await _sqlServerUow.RecordCategories.GetAsync(r => r.RecordCategoryId == recordCategoryId);

            if (recordCategory == null)
            {
                return NotFound();
            }

            return Ok(recordCategory);
        }

        //GET: api/RecordCategories/Regular Season Points For
        [HttpGet("api/RecordCategories/{recordCategoryName}")]
        public async Task<IActionResult> GetRecordCategoryByName([FromRoute] string recordCategoryName)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var recordCategory = await _sqlServerUow.RecordCategories.GetAsync(r => r.RecordCategoryName == recordCategoryName);

            if (recordCategory == null)
            {
                return NotFound();
            }

            return Ok(recordCategory);
        }
    }
}