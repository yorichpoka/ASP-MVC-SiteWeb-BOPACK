using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace BOPACKSite.Models.Static
{
    public static class BPConvert
    {
        /// <summary>Conevrti er retourne un objet en string </summary>
        public static string To_JavaScript(object dObject)
        {
            try
            {
                return
                    new JavaScriptSerializer().Serialize(dObject);
            }
            catch
            {
                return
                    string.Empty;
            }
        }
    }
}