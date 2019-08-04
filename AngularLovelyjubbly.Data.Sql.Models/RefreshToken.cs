using System;

namespace AngularLovelyjubbly.Data.Sql.Models
{
    public class RefreshToken
    {
        public RefreshToken()
        {
        }

        public Guid RefreshTokenId { get; set; }

        //foreign key
        public string UserId { get; set; }
        //navigation property
        public virtual ApplicationUser User { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public bool IsEnabled { get; set; }
    }
}
