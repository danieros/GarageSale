using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GarageSale.Controllers
{
    public class GarageSalesController : ApiController
    {
        private Models.GarageSaleDataContext db = new Models.GarageSaleDataContext();

        public List<Models.sp_GetGarageSalesResult> GetGarageSales()
        {
            var garageSaledetail = db.sp_GetGarageSales();

            return garageSaledetail.ToList();
        }
    }
}
