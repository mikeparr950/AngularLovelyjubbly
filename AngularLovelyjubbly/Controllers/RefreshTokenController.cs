using System.Linq;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AngularLovelyjubbly.Data.Sql.Models;
using AngularLovelyjubbly.Data.Sql.Contracts;
using System;

namespace AngularLovelyjubbly.Controller
{
    public class RefreshTokenController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ISqlUnitOfWork _sqlServerUow;

        public RefreshTokenController(ISqlUnitOfWork sqlServerUow)
        {
            _sqlServerUow = sqlServerUow;
        }

        //GET: api/ValidRefreshTokens
        [HttpGet("api/ValidRefreshTokens")]
        public IQueryable<RefreshToken> GetValidRefreshTokens()
        {
            return _sqlServerUow.RefreshTokens.GetAll().Where(r => r.IsEnabled && r.EndDate > DateTime.UtcNow); //all valid
        }

        //GET: api/RefreshTokens/CCE50ABF-A56C-4A4F-B8A0-DBF38E05B423
        [HttpGet("api/RefreshTokens/{refreshTokenId}")]
        public async Task<IActionResult> GetRefreshTokenById([FromRoute] string refreshTokenId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var refreshToken = await _sqlServerUow.RefreshTokens.GetAsync(r => r.RefreshTokenId.ToString() == refreshTokenId);

            if (refreshToken == null)
            {
                return NotFound();
            }

            return Ok(refreshToken);
        }

        //POST : api/RefreshTokens/Add
        [HttpPost("api/RefreshTokens/Add")]
        public async Task<bool> AddRefreshToken([FromBody] RefreshToken refreshToken)
        {
            bool refreshTokenAdded = false;

            try
            {
                refreshTokenAdded = await _sqlServerUow.RefreshTokens.AddAsync(refreshToken);
            }
            catch (Exception ex)
            {
            }

            return refreshTokenAdded;
        }
    }
}
