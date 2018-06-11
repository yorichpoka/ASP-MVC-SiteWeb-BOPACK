using BOPACKSite.Models.Static;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BOPACKSite.Controllers
{
    public class HomeController : BPController
    {
        #region [HttpGet]
        [HttpGet]
        public ActionResult Index(string lang)
        {
            // -- Charger les paramètres OG sur la page -- //
            Charger_Parametres_OG("BOPACK Bussiness - Partnership");

            // -- Charger les paramètres de la page -- //
            Parametre_Page("acceuil");

            return View();
        }

        [HttpGet]
        public ActionResult Maintenance(string lang)
        {
            // -- Charger les paramètres OG sur la page -- //
            Charger_Parametres_OG("BOPACK Maintenance");

            // -- Charger les paramètres de la page -- //
            Parametre_Page("maintenance");

            return View();
        }

        protected override void Parametre_Page(string page)
        {
            // -- Paramètres dynamique -- //
            switch (page)
            {
                case "acceuil":
                    this.ViewBag.OG_URL = "https://www.google.com/";
                    this.ViewBag.OG_DESCRIPTION = "BOPACK Bussiness - Partnership";
                    this.ViewBag.OG_TITLE = "BOPACK Bussiness - Partnership";
                    // -- Clé d'activation Google Map -- //
                    this.ViewBag.MAPS_API_KEY = AppSetting.MAPS_API_KEY;
                    this.ViewBag.MAPS_ADRESSE = AppSetting.MAPS_ADRESSE;
                    this.ViewBag.MAPS_LATITUDE = AppSetting.MAPS_LATITUDE;
                    this.ViewBag.MAPS_LONGITUDE = AppSetting.MAPS_LONGITUDE;
                    // -- Contacts -- //
                    this.ViewBag.Contact.Tel = AppSetting.CONTACTS_TEL;
                    this.ViewBag.Contact.Email = AppSetting.CONTACTS_EMAIL;
                    this.ViewBag.Contact.Fax = AppSetting.CONTACTS_FAX;
                    this.ViewBag.Contact.BP = AppSetting.CONTACTS_BP;
                    this.ViewBag.Contact.Web = AppSetting.CONTACTS_WEB;
                    this.ViewBag.Contact.Facebook = AppSetting.CONTACTS_FACEBOOK;
                    // -- Nobre d'images -- //
                    this.ViewBag.Images_Nutriva = System.IO.Directory.GetFiles(url_resources_images + "png/nutriva").Count();
                    this.ViewBag.Images_Fricon = System.IO.Directory.GetFiles(url_resources_images + "png/fricon").Count();
                    this.ViewBag.Images_Licor = System.IO.Directory.GetFiles(url_resources_images + "jpg/licor").Count();
                    this.ViewBag.Images_Quinas = System.IO.Directory.GetFiles(url_resources_images + "png/quinas").Count();
                    this.ViewBag.Images_Paladin = new ExpandoObject();
                    this.ViewBag.Images_Paladin.ket_chup = System.IO.Directory.GetFiles(url_resources_images + "png/palandin/ket-chup").Count();
                    this.ViewBag.Images_Paladin.mayonaise = System.IO.Directory.GetFiles(url_resources_images + "png/palandin/mayonaise").Count();
                    this.ViewBag.Images_Paladin.moutarde = System.IO.Directory.GetFiles(url_resources_images + "png/palandin/moutarde").Count();
                    this.ViewBag.Images_Paladin.restaurant = System.IO.Directory.GetFiles(url_resources_images + "png/palandin/restaurant").Count();
                    this.ViewBag.Images_Paladin.sauce = System.IO.Directory.GetFiles(url_resources_images + "png/palandin/sauce").Count();
                    this.ViewBag.Images_Paladin.sauce_piquante = System.IO.Directory.GetFiles(url_resources_images + "png/palandin/sauce-piquante").Count();
                    this.ViewBag.Images_Paladin.vinaigre = System.IO.Directory.GetFiles(url_resources_images + "png/palandin/vinaigre").Count();
                    break;
                case "maintenance":
                    this.ViewBag.OG_URL = "https://www.google.com/Maintenance";
                    this.ViewBag.OG_DESCRIPTION = "BOPACK Maintenance";
                    this.ViewBag.OG_TITLE = "BOPACK Maintenance";
                    // -- Contacts -- //
                    this.ViewBag.Contact.Facebook = AppSetting.CONTACTS_FACEBOOK;
                    // -- Durée de maintenance de l'application -- //
                    this.ViewBag.DELAI_MAINTENANCE = AppSetting.DELAI_MAINTENANCE;
                    break;
            }
        }
        #endregion
    }
}