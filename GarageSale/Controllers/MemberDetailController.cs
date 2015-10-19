using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GarageSale.Controllers
{
    public class MemberDetailController : ApiController
    {

        private Models.GarageSaleDataContext db = new Models.GarageSaleDataContext();

        public List<Models.sp_GetMemberDetailsResult> GetMemberDetails(string memberid)
        {
            var MemberDetail = db.sp_GetMemberDetails(Convert.ToInt32(memberid));

            return MemberDetail.ToList();
        }
    }
}
