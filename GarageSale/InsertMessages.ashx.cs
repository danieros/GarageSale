using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GarageSale
{
    /// <summary>
    /// Summary description for InsertMessages
    /// </summary>
    public class InsertMessages : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string memberid = "";
            string messagetext = "";
            string seller = "";
            string itemid = "";
            string email = "";

            if (context.Request.HttpMethod == "POST")
            {
                foreach (string key in context.Request.Form.AllKeys)
                {
                    switch (key)
                    {
                        case "memberid":
                            memberid = context.Request.Form[key];
                            break;
                        case "messagetext":
                            messagetext = context.Request.Form[key];
                            break;
                        case "seller":
                            seller = context.Request.Form[key];
                            break;
                        case "itemid":
                            itemid = context.Request.Form[key];
                            break;
                        case "email":
                            email = context.Request.Form[key];
                            break;
                        default:
                            // You can use the default case.
                            break;
                    }
                }
            }

            Models.GarageSaleDataContext db = new Models.GarageSaleDataContext();
            var linqmessages = db.sp_InsertMessages(Convert.ToInt32(memberid), messagetext, Convert.ToInt32(seller), Convert.ToInt32(itemid));

            if (email != "")
            {
                var linqemailnotifications = db.sp_EmailNotificationCreate(Convert.ToInt32(itemid), email);
            }
           
            context.Response.ContentType = "text/plain";
            context.Response.Write("Message successful sent");
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}