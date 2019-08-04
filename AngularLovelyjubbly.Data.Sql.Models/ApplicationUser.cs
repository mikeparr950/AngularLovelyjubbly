using Microsoft.AspNetCore.Identity;
namespace AngularLovelyjubbly.Data.Sql.Models
{
    public class ApplicationUser : IdentityUser
    {
        //add additional profile data for application users here
        public virtual UserProfile UserProfile { get; set; }
    }
}
