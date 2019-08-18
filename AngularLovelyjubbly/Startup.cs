using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using AngularLovelyjubbly.Data.Sql.Repository;
using System;
using AngularLovelyjubbly.Data.Sql.Models;
using AngularLovelyjubbly.Data.Sql.Contracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using AngularLovelyjubbly.Web.Auth;
using AngularLovelyjubbly.Web.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using AngularLovelyjubbly.Web.Models;
using System.Text;
using Microsoft.Net.Http.Headers;

namespace AngularLovelyjubbly
{
    public class Startup
    {
        private const string SecretKey = "iNivDmHLpUA223sqsfhqGbMRdRj1PVkH"; // todo: get this from somewhere secure
        private readonly SymmetricSecurityKey _signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretKey));

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //1 start
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"),
                o => o.MigrationsAssembly("AngularLovelyjubbly")));

            //3 start
            services.AddSingleton<IJwtFactory, JwtFactory>();

            // jwt wire up
            // Get options from app settings
            var jwtAppSettingOptions = Configuration.GetSection(nameof(JwtIssuerOptions));

            // Configure JwtIssuerOptions
            services.Configure<JwtIssuerOptions>(options =>
            {
                options.Issuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
                options.Audience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)];
                options.SigningCredentials = new SigningCredentials(_signingKey, SecurityAlgorithms.HmacSha256);
            });

            // api user claim policy
            services.AddAuthorization(options =>
            {
                options.AddPolicy("ApiUser", policy => policy.RequireClaim(Constants.Strings.JwtClaimIdentifiers.Rol, Constants.Strings.JwtClaims.ApiAccess));
            });

            services.AddAuthentication(jwt =>
            {
                jwt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                jwt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
        .AddJwtBearer(jwt =>
        {
            jwt.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)],

                ValidateAudience = true,
                ValidAudience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)],

                ValidateIssuerSigningKey = true,
                IssuerSigningKey = _signingKey,

                RequireExpirationTime = true,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };
        });
        //3 end

            services.AddIdentity<ApplicationUser, ApplicationRole>(config =>
            {
                config.Password.RequireDigit = true;
                config.Password.RequiredLength = 6;
                config.Password.RequireLowercase = true;
                config.Password.RequireNonAlphanumeric = false;
                config.Password.RequireUppercase = true;
                config.Tokens.ChangePhoneNumberTokenProvider = "Phone"; //need this in current version for phone number change token to be phone readable
                config.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(10); //2fa lockout to prevent brute force attacks
                config.Lockout.MaxFailedAccessAttempts = 10;
            }).AddEntityFrameworkStores<ApplicationDbContext>()
                    .AddDefaultTokenProviders();

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    builder =>
                    {
                        builder
                            .AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });

            // Add framework services.
            services.AddScoped<ISqlUnitOfWork, SqlUnitOfWork>();
            //1 end

            services.AddResponseCaching();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            //2
            app.UseCors("AllowAllOrigins");
            app.UseAuthentication();
            //2 end

            app.UseHttpsRedirection();

            app.UseResponseCaching();

            //cache static files for 24 hours 
            //https://andrewlock.net/adding-cache-control-headers-to-static-files-in-asp-net-core/
            app.UseStaticFiles(new StaticFileOptions
            {
                OnPrepareResponse = ctx =>
                {
                    const int durationInSeconds = 60 * 60 * 24;
                    ctx.Context.Response.Headers[HeaderNames.CacheControl] =
                        "public,max-age=" + durationInSeconds;
                }
            });

            app.UseSpaStaticFiles(new StaticFileOptions
            {
                OnPrepareResponse = ctx =>
                {
                    const int durationInSeconds = 60 * 60 * 24;
                    ctx.Context.Response.Headers[HeaderNames.CacheControl] =
                        "public,max-age=" + durationInSeconds;
                }
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
