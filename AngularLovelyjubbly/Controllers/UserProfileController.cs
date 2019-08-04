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
    public class UserProfileController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ISqlUnitOfWork _sqlServerUow;

        public UserProfileController(
            ISqlUnitOfWork sqlServerUow)
        {
            _sqlServerUow = sqlServerUow;
        }

        //GET: api/UserProfiles
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("api/UserProfiles")]
        public IQueryable<UserProfile> GetAllUserProfiles()
        {
            return _sqlServerUow.UserProfiles.GetAll();
        }

        //GET: api/UserProfiles/524c706e-af69-4635-9eed-d52bace6f960
        [HttpGet("api/UserProfiles/{userId}")]
        public async Task<IActionResult> GetUserProfileById([FromRoute] string userId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userProfile = await _sqlServerUow.UserProfiles.GetAsync(t => t.UserId == userId);

            if (userProfile == null)
            {
                return NotFound();
            }

            return Ok(userProfile);
        }
    }
}
