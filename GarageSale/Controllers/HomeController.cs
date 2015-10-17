using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GarageSale.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index(string id)
        {
            string text = id;
            Response.Redirect("../../Index.html", true);

            return View();
        }
    }
}
