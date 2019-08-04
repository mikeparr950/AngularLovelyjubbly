using System.Linq;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AngularLovelyjubbly.Data.Sql.Models;
using AngularLovelyjubbly.Data.Sql.Contracts;

namespace AngularLovelyjubbly.Controller
{
    public class LanguageController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ISqlUnitOfWork _sqlServerUow;

        public LanguageController(ISqlUnitOfWork sqlServerUow)
        {
            _sqlServerUow = sqlServerUow;
        }

        //GET: api/Languages
        [HttpGet("api/Languages")]
        public IQueryable<Language> GetAllLanguages()
        {
            return _sqlServerUow.Languages.GetAll().OrderBy(l => l.LanguageName);
        }

        //GET: api/Languages/2
        [HttpGet("api/Languages/{languageId:int}")]
        public async Task<IActionResult> GetLanguageById(int languageId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var language = await _sqlServerUow.Languages.GetAsync(l => l.LanguageId == languageId);

            if (language == null)
            {
                return NotFound();
            }

            return Ok(language);
        }

        //GET: api/Languages/English
        [HttpGet("api/Languages/{languageName}")]
        public async Task<IActionResult> GetLanguageByName([FromRoute] string languageName)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var language = await _sqlServerUow.Languages.GetAsync(l => l.LanguageName == languageName);

            if (language == null)
            {
                return NotFound();
            }

            return Ok(language);
        }
    }
}
