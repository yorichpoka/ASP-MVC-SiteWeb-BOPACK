using BOPACKSite.Models;
using BOPACKSite.Models.Static;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Dynamic;
using System.Threading;
using BOPACKSite.Culture;

namespace BOPACKSite.Controllers
{
    public abstract class BPController : Controller
    {
        // -- Variables -- //
        #region Variables
        protected Connexion con                 { get { return Session["Connexion"] as Connexion; } set { Session["Connexion"] = value; } }
        public int culture                      { get { if (Session["CurrentCulture"] == null) { return 0; } else { return (int)Session["CurrentCulture"]; } } set { Session["CurrentCulture"] = value; } }
        protected string url_resources_images   { get { return Server.MapPath("~/Resources/images/"); } }
        protected string url_resources_app_data { get { return Server.MapPath("~/App_Data/"); } }
        #endregion

        // -- Charger les paramètre d'application de la page -- //
        protected abstract void Parametre_Page(string page);

        // -- Model OG de referencement de la page -- //
        protected void Charger_Parametres_OG(string titre)
        {
            // -- Version de l'application -- //
            this.ViewBag.App_Version = AppSetting.APP_VERSION;

            // -- Langue de la page -- //
            this.ViewBag.Lang = "fr";

            // -- Titre de la page -- //
            this.ViewBag.Titre = titre;

            // -- Mots clés -- //
            this.ViewBag.Mot_Cles = BPClass.GetKeyword(url_resources_app_data + "Keyword.txt");

            // -- Paramètres OG -- //
            this.ViewBag.OG_TYPE = "article";
            this.ViewBag.OG_IMAGE = this.url_resources_images + "jpg/OG_Shared.jpg";

            // -- Contacts -- //
            this.ViewBag.Contact = new ExpandoObject();

            // -- Urlde changement de langue de l'application -- //
            ViewBag.url_changer_langue = Url.Action("ChangeCurrentCulture", "BP", new {
                                                                                    lang = (culture == 0) ? "fr"
                                                                                                          : "en"
                                                                                    });
        }

        // -- Code de gestion de la langue en session -- //
        #region Code de gestion de la langue en session
        protected override void ExecuteCore()
        {
            try
            {
                int Culture = 0;
                if (this.Session == null || Session["CurrentCulture"] == null)
                {
                    int.TryParse(Thread.CurrentThread.CurrentCulture.Name, out Culture);
                    this.culture = Culture;
                }
                else
                {
                    Culture = this.culture;
                }
                // calling CultureHelper class properties for setting
                CultureHelper.CurrentCulture = Culture;

                base.ExecuteCore();
            }
            catch (Exception ex)
            {
                // -- Log -- //
                BPClass.Log.Error(ex);
            }
        }

        protected override bool DisableAsyncSupport
        {
            get { return true; }
        }

        [HttpPost]
        public ActionResult ChangeCurrentCulture(string lang)
        {
            // Change the current culture for this user.
            CultureHelper.CurrentCulture = lang == "fr" ? 1 
                                                        : 0;

            // Cache the new current culture into the user HTTP session. 
            culture = lang == "fr" ? 1
                                   : 0;

            // -- Mise à jour de la langue dans le cookie utilisateur -- //
            MiseAJourCookieLangue(lang == "fr" ? 1
                                               : 0);

            // Redirect to the same page from where the request was made! 
            return Redirect(Request.UrlReferrer.ToString());
        }

        // -- Mise à jour de la langue dans le cookie utilisateur -- //
        public void MiseAJourCookieLangue(int id_lang)
        {
            // -- Teste si queulqu'un s'est déjà connecté et deconnecté sur cette machine avant -- //
            if (Request.Cookies["bopack"] != null &&
                Request.Cookies["bopack"]["langue"] != null)
            {
                // -- Ajout/Modifier du cookie au navigateur -- //
                Response.Cookies["bopack"]["cookies_est_active"]    = Request.Cookies["bopack"]["cookies_est_active"];
                Response.Cookies["bopack"]["langue"]                = id_lang.ToString();
            }
        }
        #endregion
    }
}