using System;

namespace AngularLovelyjubbly.Data.Sql.Models
{
    public class UserProfile
    {
        public UserProfile()
        {
        }

        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public DateTime RegistrationDate { get; set; }
        public int? CountryId { get; set; }
        public virtual Country Country { get; set; }
        public int? LanguageId { get; set; }
        public virtual Language Language { get; set; }
        public DateTime? BirthDate { get; set; }
        public int? GenderId { get; set; }
        public virtual Gender Gender { get; set; }
        //for concurrency purposes
        public byte[] Timestamp { get; set; }
        public virtual ApplicationUser User { get; set; }
    }
}
