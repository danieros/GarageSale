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
            string garagename = id;
            if (garagename != null)
            {
                Models.GarageSaleDataContext db = new Models.GarageSaleDataContext();
                var linqMember = db.sp_GetMemberID(garagename).SingleOrDefault();

                HttpCookie cookie = new HttpCookie("memberid");
                cookie.Value = linqMember.memberid.ToString();
                cookie.Expires = DateTime.Now.AddDays(30);
                //cookie.Path = "/StaticViews";
                Response.AppendCookie(cookie);

                Response.Redirect("../../Index.html#/default", true);
            }
            else
            {
                Response.Redirect("Index.html", true);
            }

            return View();
        }
    }
}
