using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularLovelyjubbly.Web.ViewModels
{
    public class RegistrationViewModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string Country { get; set; }
        public string BirthDate { get; set; }
    }
}
