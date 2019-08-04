using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace AngularLovelyjubbly.Web.ViewModels
{
    public class EnableTwoFactorAuthViewModel
    {
        public string UserId { get; set; }
        public bool IsEnable { get; set; }
    }
}
