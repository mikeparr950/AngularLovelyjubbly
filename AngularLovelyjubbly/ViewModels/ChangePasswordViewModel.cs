using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularLovelyjubbly.Web.ViewModels
{
    public class ChangePasswordViewModel
    {
        public string UserId { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
