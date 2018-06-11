using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BOPACKSite.Controllers
{
    public class ErreurController : BPController
    {
        #region [HttpGet]
        [HttpGet]
        public ActionResult Index(string lang)
        {
            // -- Charger les paramètres OG sur la page -- //
            Charger_Parametres_OG("acceuil", "BOPACK Bussiness - Partnership");

            return View();
        }
        #endregion
    }
}