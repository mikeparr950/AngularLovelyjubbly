using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Newtonsoft.Json;
using System;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using AngularLovelyjubbly.Data.Sql.Models;
using AngularLovelyjubbly.Data.Sql.Contracts;
using AngularLovelyjubbly.Data.Sql.Repository;
using AngularLovelyjubbly.Web.Models;
using Microsoft.Extensions.Options;
using AngularLovelyjubbly.Web.ViewModels;
using AngularLovelyjubbly.Web.Helpers;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Collections.Generic;
using AngularLovelyjubbly.Web.Auth;

namespace AngularLovelyjubbly.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IJwtFactory _jwtFactory;
        private readonly JsonSerializerSettings _serializerSettings;
        private JwtIssuerOptions _jwtOptions;
        private readonly ISqlUnitOfWork _sqlServerUow;
        private readonly ApplicationDbContext _ctx;
        private readonly SignInManager<ApplicationUser> _signInManager;

        //private const string SecretKey = "iNivDmHLpUA223sqsfhqGbMRdRj1PVkH"; // todo: get this from somewhere secure
        //private readonly SymmetricSecurityKey _signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretKey));


        public AuthController(UserManager<ApplicationUser> userManager, 
            IJwtFactory jwtFactory, 
            IOptions<JwtIssuerOptions> jwtOptions, 
            ISqlUnitOfWork sqlServerUow,
            SignInManager<ApplicationUser> signInManager, ApplicationDbContext ctx)
        {
            _userManager = userManager;
            _jwtFactory = jwtFactory;
            _jwtOptions = jwtOptions.Value;
            _signInManager = signInManager;
            _sqlServerUow = sqlServerUow;
            _ctx = ctx;

            _serializerSettings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented
            };
        }

        // POST api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Post([FromBody]CredentialsViewModel credentials)
        {
            var x = _jwtOptions;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _signInManager.PasswordSignInAsync(credentials.UserName, credentials.Password, false, false);

            if (result.RequiresTwoFactor)
            {
                //get 2 factor auth user
                var identity = await GetClaimsIdentity(credentials.UserName, credentials.Password);
                string userId = identity.Claims.Single(c => c.Type == "id").Value;
                ApplicationUser user = _ctx.Users.FirstOrDefault(t => t.Id == userId);

                if (user == null)
                {
                    return BadRequest(ModelState);
                }

                var code = await _userManager.GenerateTwoFactorTokenAsync(user, "Phone");

                var message = "Your security code is: " + code;

                //await _smsSender.SendSmsAsync(await _userManager.GetPhoneNumberAsync(user), message);

                var response = new
                {
                    two_factor_auth_enabled = true
                };

                var json = JsonConvert.SerializeObject(response, _serializerSettings);
                return new OkObjectResult(json);
            }
            else if (result.Succeeded)
            {
                var identity = await GetClaimsIdentity(credentials.UserName, credentials.Password);

                if (identity == null)
                {
                    return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid username or password.", ModelState));
                }

                string userId = identity.Claims.Single(c => c.Type == "id").Value;
                ApplicationUser user = _ctx.Users.Include(t => t.UserProfile).FirstOrDefault(t => t.Id == userId);

                //check if user has refresh token
                var validRefreshToken = _ctx.RefreshTokens.FirstOrDefault(r => r.UserId == userId && r.IsEnabled);

                if (validRefreshToken != null)
                {
                    if (validRefreshToken.EndDate.AddMinutes(-30) < DateTime.UtcNow)
                    {
                        //create new refresh token
                        RefreshToken rt = new RefreshToken();

                        rt.StartDate = DateTime.UtcNow;

                        DateTime dtmRefreshTokenEndDate = DateTime.UtcNow;
                        dtmRefreshTokenEndDate = dtmRefreshTokenEndDate.AddMonths(6);
                        rt.EndDate = dtmRefreshTokenEndDate;

                        rt.IsEnabled = true;
                        rt.UserId = identity.Claims.Single(c => c.Type == "id").Value;

                        bool refreshTokenAdded = false;

                        refreshTokenAdded = await _sqlServerUow.RefreshTokens.AddAsync(rt);

                        // Serialize and return the response
                        var response = new
                        {
                            id = userId,
                            auth_token = await _jwtFactory.GenerateEncodedToken(credentials.UserName, identity),
                            auth_token_valid = (int)_jwtOptions.ValidFor.TotalSeconds,
                            auth_token_created = _jwtOptions.IssuedAt,
                            auth_token_expires = _jwtOptions.Expiration,
                            refresh_token = rt.RefreshTokenId,
                            two_factor_auth_enabled = false,
                            phone_number = user.PhoneNumber,
                            email = user.Email,
                            first_name = user.UserProfile.FirstName,
                            surname = user.UserProfile.Surname
                        };

                        var json = JsonConvert.SerializeObject(response, _serializerSettings);
                        return new OkObjectResult(json);
                    }
                    else
                    {
                        // Serialize and return the response
                        var response = new
                        {
                            id = userId,
                            auth_token = await _jwtFactory.GenerateEncodedToken(credentials.UserName, identity),
                            auth_token_valid = (int)_jwtOptions.ValidFor.TotalSeconds,
                            auth_token_created = _jwtOptions.IssuedAt,
                            auth_token_expires = _jwtOptions.Expiration,
                            refresh_token = validRefreshToken.RefreshTokenId,
                            two_factor_auth_enabled = false,
                            phone_number = user.PhoneNumber,
                            email = user.Email,
                            first_name = user.UserProfile.FirstName,
                            surname = user.UserProfile.Surname
                        };

                        var json = JsonConvert.SerializeObject(response, _serializerSettings);
                        return new OkObjectResult(json);
                    }
                }
                else
                {
                    //create refresh token
                    RefreshToken rt = new RefreshToken();

                    rt.StartDate = DateTime.UtcNow;

                    DateTime dtmRefreshTokenEndDate = DateTime.UtcNow;
                    dtmRefreshTokenEndDate = dtmRefreshTokenEndDate.AddMonths(6);
                    rt.EndDate = dtmRefreshTokenEndDate;

                    rt.IsEnabled = true;
                    rt.UserId = identity.Claims.Single(c => c.Type == "id").Value;

                    bool refreshTokenAdded = false;

                    refreshTokenAdded = await _sqlServerUow.RefreshTokens.AddAsync(rt);

                    // Serialize and return the response
                    var response = new
                    {
                        id = userId,
                        auth_token = await _jwtFactory.GenerateEncodedToken(credentials.UserName, identity),
                        auth_token_valid = (int)_jwtOptions.ValidFor.TotalSeconds,
                        auth_token_created = _jwtOptions.IssuedAt,
                        auth_token_expires = _jwtOptions.Expiration,
                        refresh_token = rt.RefreshTokenId,
                        two_factor_auth_enabled = false,
                        phone_number = user.PhoneNumber,
                        email = user.Email,
                        first_name = user.UserProfile.FirstName,
                        surname = user.UserProfile.Surname
                    };

                    var json = JsonConvert.SerializeObject(response, _serializerSettings);
                    return new OkObjectResult(json);
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        // POST api/auth/loginwith2fa
        [HttpPost("loginwith2fa")]
        public async Task<IActionResult> Post([FromBody]LoginWith2faViewModel model)
        {
            var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();

            if (user == null)
            {
                return BadRequest(Errors.AddErrorToModelState("user loading failure", "Unable to load user", ModelState));
            }

            var authenticatorCode = model.TwoFactorCode.Replace(" ", string.Empty).Replace("-", string.Empty);

            var result = await _signInManager.TwoFactorSignInAsync("Phone", authenticatorCode, false, false);

            if (result.Succeeded)
            {
                var identity = await GetClaimsIdentity(user.UserName);
                var profile = _ctx.UserProfiles.FirstOrDefault(t => t.UserId == user.Id);

                //check if user has refresh token
                var validRefreshToken = _ctx.RefreshTokens.FirstOrDefault(r => r.UserId == user.Id.ToString() && r.IsEnabled);

                if (validRefreshToken != null)
                {
                    if (validRefreshToken.EndDate.AddMinutes(-30) < DateTime.UtcNow)
                    {
                        //create new refresh token
                        RefreshToken rt = new RefreshToken();

                        rt.StartDate = DateTime.UtcNow;

                        DateTime dtmRefreshTokenEndDate = DateTime.UtcNow;
                        dtmRefreshTokenEndDate = dtmRefreshTokenEndDate.AddMonths(6);
                        rt.EndDate = dtmRefreshTokenEndDate;

                        rt.IsEnabled = true;
                        rt.UserId = user.Id;

                        bool refreshTokenAdded = false;

                        refreshTokenAdded = await _sqlServerUow.RefreshTokens.AddAsync(rt);

                        // Serialize and return the response
                        var response = new
                        {
                            id = user.Id,
                            auth_token = await _jwtFactory.GenerateEncodedToken(user.UserName, identity),
                            auth_token_valid = (int)_jwtOptions.ValidFor.TotalSeconds,
                            auth_token_created = _jwtOptions.IssuedAt,
                            auth_token_expires = _jwtOptions.Expiration,
                            refresh_token = rt.RefreshTokenId,
                            two_factor_auth_enabled = true,
                            phone_number = user.PhoneNumber,
                            email = user.Email,
                            first_name = profile.FirstName,
                            surname = profile.Surname
                        };

                        var json = JsonConvert.SerializeObject(response, _serializerSettings);
                        return new OkObjectResult(json);
                    }
                    else
                    {
                        // Serialize and return the response
                        var response = new
                        {
                            id = user.Id,
                            auth_token = await _jwtFactory.GenerateEncodedToken(user.UserName, identity),
                            auth_token_valid = (int)_jwtOptions.ValidFor.TotalSeconds,
                            auth_token_created = _jwtOptions.IssuedAt,
                            auth_token_expires = _jwtOptions.Expiration,
                            refresh_token = validRefreshToken.RefreshTokenId,
                            two_factor_auth_enabled = true,
                            phone_number = user.PhoneNumber,
                            email = user.Email,
                            first_name = profile.FirstName,
                            surname = profile.Surname
                        };

                        var json = JsonConvert.SerializeObject(response, _serializerSettings);
                        return new OkObjectResult(json);
                    }
                }
                else
                {
                    //create refresh token
                    RefreshToken rt = new RefreshToken();

                    rt.StartDate = DateTime.UtcNow;

                    DateTime dtmRefreshTokenEndDate = DateTime.UtcNow;
                    dtmRefreshTokenEndDate = dtmRefreshTokenEndDate.AddMonths(6);
                    rt.EndDate = dtmRefreshTokenEndDate;

                    rt.IsEnabled = true;
                    rt.UserId = identity.Claims.Single(c => c.Type == "id").Value;

                    bool refreshTokenAdded = false;

                    refreshTokenAdded = await _sqlServerUow.RefreshTokens.AddAsync(rt);

                    // Serialize and return the response
                    var response = new
                    {
                        id = user.Id,
                        auth_token = await _jwtFactory.GenerateEncodedToken(user.UserName, identity),
                        auth_token_valid = (int)_jwtOptions.ValidFor.TotalSeconds,
                        auth_token_created = _jwtOptions.IssuedAt,
                        auth_token_expires = _jwtOptions.Expiration,
                        refresh_token = rt.RefreshTokenId,
                        two_factor_auth_enabled = true,
                        phone_number = user.PhoneNumber,
                        email = user.Email,
                        first_name = profile.FirstName,
                        surname = profile.Surname
                    };

                    var json = JsonConvert.SerializeObject(response, _serializerSettings);
                    return new OkObjectResult(json);
                }
            }
            else if (result.IsLockedOut)
            {
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Locked out.", ModelState));
            }
            else
            {
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid authenticator code.", ModelState));
            }
        }

        [HttpPost("autologin")]
        public async Task<IActionResult> Post([FromBody]AutoLoginViewModel credentials)
        {
            //reset jwt options
            //_jwtOptions = null;
            //_jwtOptions = new JwtIssuerOptions();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var identity = await GetClaimsIdentity(credentials.UserName);

            if (identity == null)
            {
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid username.", ModelState));
            }

            string userId = identity.Claims.Single(c => c.Type == "id").Value;
            ApplicationUser user = _ctx.Users.Include(t => t.UserProfile).FirstOrDefault(t => t.Id == userId);

            //check if user has refresh token
            var validRefreshToken = _ctx.RefreshTokens.FirstOrDefault(r => r.UserId == userId && r.IsEnabled && r.EndDate > DateTime.UtcNow 
                                                    && r.RefreshTokenId.ToString() == credentials.RefreshTokenId);

            if (validRefreshToken != null)
            {
                if (validRefreshToken.EndDate.AddMinutes(-30) < DateTime.UtcNow)
                {
                    //create new refresh token
                    RefreshToken rt = new RefreshToken();

                    rt.StartDate = DateTime.UtcNow;

                    DateTime dtmRefreshTokenEndDate = DateTime.UtcNow;
                    dtmRefreshTokenEndDate = dtmRefreshTokenEndDate.AddMonths(6);
                    rt.EndDate = dtmRefreshTokenEndDate;

                    rt.IsEnabled = true;
                    rt.UserId = identity.Claims.Single(c => c.Type == "id").Value;

                    bool refreshTokenAdded = false;

                    refreshTokenAdded = await _sqlServerUow.RefreshTokens.AddAsync(rt);

                    // Serialize and return the response
                    var response = new
                    {
                        id = userId,
                        auth_token = await _jwtFactory.GenerateEncodedToken(credentials.UserName, identity),
                        auth_token_valid = (int)_jwtOptions.ValidFor.TotalSeconds,
                        auth_token_created = _jwtOptions.IssuedAt,
                        auth_token_expires = _jwtOptions.Expiration,
                        refresh_token = rt.RefreshTokenId,
                        two_factor_auth_enabled = user.TwoFactorEnabled,
                        phone_number = user.PhoneNumber,
                        email = user.Email,
                        first_name = user.UserProfile.FirstName,
                        surname = user.UserProfile.Surname
                    };

                    var json = JsonConvert.SerializeObject(response, _serializerSettings);
                    return new OkObjectResult(json);
                }
                else
                {
                    // Serialize and return the response
                    var response = new
                    {
                        id = userId,
                        auth_token = await _jwtFactory.GenerateEncodedToken(credentials.UserName, identity),
                        auth_token_valid = (int)_jwtOptions.ValidFor.TotalSeconds,
                        auth_token_created = _jwtOptions.IssuedAt,
                        auth_token_expires = _jwtOptions.Expiration,
                        refresh_token = validRefreshToken.RefreshTokenId,
                        two_factor_auth_enabled = user.TwoFactorEnabled,
                        phone_number = user.PhoneNumber,
                        email = user.Email,
                        first_name = user.UserProfile.FirstName,
                        surname = user.UserProfile.Surname
                    };

                    var json = JsonConvert.SerializeObject(response, _serializerSettings);
                    return new OkObjectResult(json);
                }
            }
            else
            {
                //create refresh token
                RefreshToken rt = new RefreshToken();

                rt.StartDate = DateTime.UtcNow;

                DateTime dtmRefreshTokenEndDate = DateTime.UtcNow;
                dtmRefreshTokenEndDate = dtmRefreshTokenEndDate.AddMonths(6);
                rt.EndDate = dtmRefreshTokenEndDate;

                rt.IsEnabled = true;
                rt.UserId = identity.Claims.Single(c => c.Type == "id").Value;

                bool refreshTokenAdded = false;

                refreshTokenAdded = await _sqlServerUow.RefreshTokens.AddAsync(rt);

                // Serialize and return the response
                var response = new
                {
                    id = userId,
                    auth_token = await _jwtFactory.GenerateEncodedToken(credentials.UserName, identity),
                    auth_token_valid = (int)_jwtOptions.ValidFor.TotalSeconds,
                    auth_token_created = _jwtOptions.IssuedAt,
                    auth_token_expires = _jwtOptions.Expiration,
                    refresh_token = rt.RefreshTokenId,
                    two_factor_auth_enabled = user.TwoFactorEnabled,
                    phone_number = user.PhoneNumber,
                    email = user.Email,
                    first_name = user.UserProfile.FirstName,
                    surname = user.UserProfile.Surname
                };

                var json = JsonConvert.SerializeObject(response, _serializerSettings);
                return new OkObjectResult(json);
            }
        }

        // POST api/auth/verifyphonenumber
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("verifyphonenumber")]
        public async Task<IActionResult> Post([FromBody]VerifyPhoneNumberViewModel model)
        {
            ApplicationUser currentUser = await _userManager.FindByIdAsync(model.UserId);

            if (currentUser == null)
            {
                return BadRequest(Errors.AddErrorToModelState("user loading failure", "Unable to load user", ModelState));
            }

            var result = await _userManager.VerifyChangePhoneNumberTokenAsync(currentUser, model.Code, model.PhoneNumber);

            if (result)
            {
                //change PhoneNumber, PhoneNumberConfirmed fields
                currentUser.PhoneNumber = model.PhoneNumber;
                currentUser.PhoneNumberConfirmed = true;

                await _userManager.UpdateAsync(currentUser);

                return new OkResult();
            }
            else
            {
                return BadRequest(Errors.AddErrorToModelState("verify phone number failure", "Invalid code.", ModelState));
            }
        }

        // POST api/auth/enabletwofactorauth
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("enabletwofactorauth")]
        public async Task<IActionResult> Post([FromBody]EnableTwoFactorAuthViewModel model)
        {
            ApplicationUser currentUser = await _userManager.FindByIdAsync(model.UserId);

            if (currentUser == null)
            {
                return BadRequest(Errors.AddErrorToModelState("user loading failure", "Unable to load user", ModelState));
            }

            try
            {
                currentUser.TwoFactorEnabled = model.IsEnable;

                await _userManager.UpdateAsync(currentUser);

                return new OkResult();
            }
            catch
            {
                return BadRequest(Errors.AddErrorToModelState("enable/disable two factor auth failure", "Error.", ModelState));
            }
        }

        private async Task<ClaimsIdentity> GetClaimsIdentity(string userName, string password)
        {
            if (!string.IsNullOrEmpty(userName) && !string.IsNullOrEmpty(password))
            {
                // get the user to verifty
                var userToVerify = await _userManager.FindByNameAsync(userName);

                if (userToVerify != null)
                {
                    // check the credentials  
                    if (await _userManager.CheckPasswordAsync(userToVerify, password))
                    {
                        return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(userName, userToVerify.Id));
                    }
                }
            }

            // Credentials are invalid, or account doesn't exist
            return await Task.FromResult<ClaimsIdentity>(null);
        }

        private async Task<ClaimsIdentity> GetClaimsIdentity(string userName)
        {
            if (!string.IsNullOrEmpty(userName))
            {
                // get the user to verifty
                var userToVerify = await _userManager.FindByNameAsync(userName);

                if (userToVerify != null)
                {
                    return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(userName, userToVerify.Id));
                }
            }

            // Credentials are invalid, or account doesn't exist
            return await Task.FromResult<ClaimsIdentity>(null);
        }
    }
}