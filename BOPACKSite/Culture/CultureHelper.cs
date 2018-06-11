using BOPACKSite.Models.Static;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.SessionState;

namespace BOPACKSite.Culture
{
    public class CultureHelper
    {
        protected HttpSessionState session;

        //constructor 
        public CultureHelper(HttpSessionState httpSessionState)
        {
            session = httpSessionState;
        }

        // Properties
        public static int CurrentCulture
        {
            get
            {
                return 
                    (Thread.CurrentThread.CurrentUICulture.Name == dpEnum_TypeLangue.Francais) ? 1
                                                                                               : 0;
            }
            set
            {
                Thread.CurrentThread.CurrentUICulture = (value == 0) ? new CultureInfo(dpEnum_TypeLangue.Anglais)
                                                                     : (value == 1) ? new CultureInfo(dpEnum_TypeLangue.Francais)
                                                                                    : CultureInfo.InvariantCulture;

                Thread.CurrentThread.CurrentCulture = Thread.CurrentThread.CurrentUICulture;
            }
        }
    }
}