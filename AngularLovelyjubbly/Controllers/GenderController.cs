using System.Linq;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AngularLovelyjubbly.Data.Sql.Models;
using AngularLovelyjubbly.Data.Sql.Contracts;

namespace AngularLovelyjubbly.Controller
{
    public class GenderController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ISqlUnitOfWork _sqlServerUow;

        public GenderController(ISqlUnitOfWork sqlServerUow)
        {
            _sqlServerUow = sqlServerUow;
        }

        //GET: api/Genders
        [HttpGet("api/Genders")]
        public IQueryable<Gender> GetAllGenders()
        {
            return _sqlServerUow.Genders.GetAll().OrderBy(d => d.GenderDescription);
        }

        //GET: api/Genders/2
        [HttpGet("api/Genders/{genderId:int}")]
        public async Task<IActionResult> GetGenderById(int genderId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var gender = await _sqlServerUow.Genders.GetAsync(g => g.GenderId == genderId);

            if (gender == null)
            {
                return NotFound();
            }

            return Ok(gender);
        }

        //GET: api/Genders/Female
        [HttpGet("api/Genders/{genderDescription}")]
        public async Task<IActionResult> GetGenderByDescription([FromRoute] string genderDescription)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var gender = await _sqlServerUow.Genders.GetAsync(g => g.GenderDescription == genderDescription);

            if (gender == null)
            {
                return NotFound();
            }

            return Ok(gender);
        }
    }
}
