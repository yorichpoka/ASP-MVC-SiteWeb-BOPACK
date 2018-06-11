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

        // -- Model OG de referencement de la page -- //
        protected void Charger_Parametres_OG(string page, string titre)
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

            // -- Paramètres dynamique -- //
            switch (page)
            {
                case "acceuil":
                    this.ViewBag.OG_URL                 = "https://www.google.com/";
                    this.ViewBag.OG_DESCRIPTION         = "BOPACK Bussiness - Partnership";
                    this.ViewBag.OG_TITLE               = "BOPACK Bussiness - Partnership";
                    // -- Clé d'activation Google Map -- //
                    this.ViewBag.MAPS_API_KEY           = AppSetting.MAPS_API_KEY;
                    this.ViewBag.MAPS_ADRESSE           = AppSetting.MAPS_ADRESSE;
                    this.ViewBag.MAPS_LATITUDE          = AppSetting.MAPS_LATITUDE;
                    this.ViewBag.MAPS_LONGITUDE         = AppSetting.MAPS_LONGITUDE;
                    // -- Contacts -- //
                    this.ViewBag.Contact.Tel            = AppSetting.CONTACTS_TEL;
                    this.ViewBag.Contact.Email          = AppSetting.CONTACTS_EMAIL;
                    this.ViewBag.Contact.Fax            = AppSetting.CONTACTS_FAX;
                    this.ViewBag.Contact.BP             = AppSetting.CONTACTS_BP;
                    this.ViewBag.Contact.Web            = AppSetting.CONTACTS_WEB;
                    this.ViewBag.Contact.Facebook       = AppSetting.CONTACTS_FACEBOOK;
                    // -- Nobre d'images -- //
                    this.ViewBag.Images_Nutriva         = System.IO.Directory.GetFiles(url_resources_images + "png/nutriva").Count();
                    this.ViewBag.Images_Fricon          = System.IO.Directory.GetFiles(url_resources_images + "png/fricon").Count();
                    this.ViewBag.Images_Licor           = System.IO.Directory.GetFiles(url_resources_images + "jpg/licor").Count();
                    this.ViewBag.Images_Quinas          = System.IO.Directory.GetFiles(url_resources_images + "png/quinas").Count();
                    this.ViewBag.Images_Paladin         = new ExpandoObject();
                    this.ViewBag.Images_Paladin.ket_chup        = System.IO.Directory.GetFiles(url_resources_images + "png/palandin/ket-chup").Count();
                    this.ViewBag.Images_Paladin.mayonaise       = System.IO.Directory.GetFiles(url_resources_images + "png/palandin/mayonaise").Count();
                    this.ViewBag.Images_Paladin.moutarde        = System.IO.Directory.GetFiles(url_resources_images + "png/palandin/moutarde").Count();
                    this.ViewBag.Images_Paladin.restaurant      = System.IO.Directory.GetFiles(url_resources_images + "png/palandin/restaurant").Count();
                    this.ViewBag.Images_Paladin.sauce           = System.IO.Directory.GetFiles(url_resources_images + "png/palandin/sauce").Count();
                    this.ViewBag.Images_Paladin.sauce_piquante  = System.IO.Directory.GetFiles(url_resources_images + "png/palandin/sauce-piquante").Count();
                    this.ViewBag.Images_Paladin.vinaigre        = System.IO.Directory.GetFiles(url_resources_images + "png/palandin/vinaigre").Count();
                    break;
                case "maintenance":
                    this.ViewBag.OG_URL                 = "https://www.google.com/Maintenance";
                    this.ViewBag.OG_DESCRIPTION         = "BOPACK Maintenance";
                    this.ViewBag.OG_TITLE               = "BOPACK Maintenance";
                    // -- Contacts -- //
                    this.ViewBag.Contact.Facebook       = AppSetting.CONTACTS_FACEBOOK;
                    break;
            }
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

                // -- Jeter l'exception -- //
                throw ex;
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