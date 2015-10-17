using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GarageSale.Controllers
{
    public class SingleItemController : ApiController
    {
        private Models.GarageSaleDataContext db = new Models.GarageSaleDataContext();

        public List<Models.sp_GetMemberItems_SingleResult> GetItem(string memberid, string itemid)
        {
            var Itemdetail = db.sp_GetMemberItems_Single(Convert.ToInt32(memberid), Convert.ToInt32(itemid));

            return Itemdetail.ToList();
        }
    }
}
