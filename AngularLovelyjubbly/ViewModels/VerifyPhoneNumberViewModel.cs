using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace AngularLovelyjubbly.Web.ViewModels
{
    public class VerifyPhoneNumberViewModel
    {
        public string UserId { get; set; }
        public string Code { get; set; }
        public string PhoneNumber { get; set; }
    }
}
