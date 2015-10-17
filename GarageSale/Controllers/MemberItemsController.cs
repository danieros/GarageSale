using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace GarageSale.Controllers
{

    [EnableCors(origins: "http://localhost:50599", headers: "*", methods: "*")]

    public class MemberItemsController : ApiController
    {
        private Models.GarageSaleDataContext db = new Models.GarageSaleDataContext();

        public List<Models.sp_GetMemberItemsResult> GetMemberItems(string memberid)
        {
            var memberItemdetail = db.sp_GetMemberItems(Convert.ToInt32(memberid));

            return memberItemdetail.ToList();
        }
    }
}
