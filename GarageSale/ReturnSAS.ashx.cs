using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.WindowsAzure.Storage.Blob;
using System.Globalization;

namespace GarageSale
{
    /// <summary>
    /// Summary description for ReturnSAS
    /// </summary>
    public class ReturnSAS : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string blobname = "";
            if (context.Request.HttpMethod == "GET")
            {
                foreach (string key in context.Request.QueryString.AllKeys)
                {
                    switch (key)
                    {
                        case "blobName":
                            blobname = context.Request.QueryString[key];
                            break;
                        default:
                            // You can use the default case.
                            break;
                    }
                }
            }

            AzureCommon.InitializeAccountPropeties();
            CloudBlockBlob blob = AzureCommon.ImagesContainer.GetBlockBlobReference(blobname);
            string sas = GetSasForBlob(blob);

            context.Response.ContentType = "text/plain";
            context.Response.Write(sas);
        }

        /// <summary>
        /// Generate a blob SAS
        /// </summary>
        /// <param name="blob">CloudBlockBlob</param>
        /// <returns>SAS string for the specified CLoudBlockBlob</returns>
        private static string GetSasForBlob(CloudBlockBlob blob)
        {
            if (blob == null)
            {
                throw new ArgumentNullException("blob can't be null");
            }

            var sas = blob.GetSharedAccessSignature(
                new SharedAccessBlobPolicy()
                {
                    Permissions = SharedAccessBlobPermissions.Write | SharedAccessBlobPermissions.Read | SharedAccessBlobPermissions.List,
                    SharedAccessExpiryTime = DateTime.UtcNow.AddMinutes(30),
                });
            return string.Format(CultureInfo.InvariantCulture, "{0}{1}", blob.Uri, sas);
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