using System.Linq;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AngularLovelyjubbly.Data.Sql.Models;
using AngularLovelyjubbly.Data.Sql.Contracts;
using AngularLovelyjubbly.Contracts;
using System.Collections.Generic;

namespace AngularLovelyjubbly.Controller
{
    public class MainController : Microsoft.AspNetCore.Mvc.Controller
    {
        //private readonly IEmailSender _emailSender;
        //private readonly ISmsSender _smsSender;

        public MainController(
            //IEmailSender emailSender,
            //ISmsSender smsSender
            )
        {
            //_emailSender = emailSender;
            //_smsSender = smsSender;
        }

         public async Task<IActionResult> SendEmailTest()
        {
            //await _emailSender.SendEmailAsync("mike.parr@gmail.com", "Send Email Test",
            //       "This is a test", "test@me.com", "", "");

            return RedirectToAction("Index", "Home", null);
        }
    }
}
