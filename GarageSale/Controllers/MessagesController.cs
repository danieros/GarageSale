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

    public class MessagesController : ApiController
    {
        private Models.GarageSaleDataContext db = new Models.GarageSaleDataContext();

        public List<Models.sp_GetMessagesResult> GetMessages(string itemid)
        {
            var messagesdetail = db.sp_GetMessages(Convert.ToInt32(itemid));

            return messagesdetail.ToList();
        }
    }
}
