using System.Linq;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AngularLovelyjubbly.Data.Sql.Models;
using AngularLovelyjubbly.Data.Sql.Contracts;

namespace AngularLovelyjubbly.Controller
{
    public class CountryController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ISqlUnitOfWork _sqlServerUow;

        public CountryController(ISqlUnitOfWork sqlServerUow)
        {
            _sqlServerUow = sqlServerUow;
        }

        //GET: api/Countries
        [HttpGet("api/Countries")]
        public IQueryable<Country> GetAllCountries()
        {
            return _sqlServerUow.Countries.GetAll();
        }

        //GET: api/Countries/2
        [HttpGet("api/Countries/{countryId:int}")]
        public async Task<IActionResult> GetCountryById(int countryId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var country = await _sqlServerUow.Countries.GetAsync(c => c.CountryId == countryId);

            if (country == null)
            {
                return NotFound();
            }

            return Ok(country);
        }
    }
}