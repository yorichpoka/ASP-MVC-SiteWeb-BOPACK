using BOPACKSite.Models;
using BOPACKSite.Models.ActionFilter;
using BOPACKSite.Models.Static;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace BOPACKSite
{
    public class MvcApplication : System.Web.HttpApplication
    {
        // -- Variables -- //
        #region Variables
        private Connexion con   { get { return Session["Connexion"] as Connexion; } set { Session["Connexion"] = value; } }
        public int culture      { get { if (Session["CurrentCulture"] == null) { return 0; } else { return (int)Session["CurrentCulture"]; } } set { Session["CurrentCulture"] = value; } }
        #endregion

        // -- Lorsque l'application est démarrée -- //
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            // -- Autoriser la configuration de log4net -- //
            log4net.Config.XmlConfigurator.Configure();

            // -- Log du démarage de l'application -- //
            BPClass.Log.Info("Démarrage de l'application");
        }

        // -- Lors que l'application s'arrête -- //
        protected void Application_End()
        {
            // -- Log de l'arrêt de l'application -- //
            BPClass.Log.Info("Arrèt de l'application");
        }
        
        // -- Lorsque la session d'un nouvel utilisateur est initialisée -- //
        protected void Session_OnStart()
        {
            // -- Initialisation de l'objet session -- //
            con = new Connexion(Session.SessionID);

            // -- Mise à jour de la langue en fonction du dernier utilisateur connecté -- //
            #region Langue manager
            if (this.Request.Cookies["bopack"] != null && this.Request.Cookies["bopack"]["langue"] != null)
            {
                this.culture                                            = int.Parse(this.Request.Cookies["bopack"]["langue"]);
                this.Response.Cookies["bopack"]["cookies_est_active"]   = this.Request.Cookies["bopack"]["cookies_est_active"];
                this.Response.Cookies["bopack"]["langue"]               = this.Request.Cookies["bopack"]["langue"];
            }
            else
            {
                this.culture                                            = 0;
                this.Response.Cookies["bopack"]["cookies_est_active"]   = "false";
                this.Response.Cookies["bopack"]["langue"]               = "0";
            }
            #endregion

            // -- Log du fin d'une session -- //
            BPClass.Log.Info("Début session: {session:" + con.session_id + "}");
        }

        // -- Lorsque la session se termine -- //
        protected void Session_OnEnd()
        {
            // -- Log du fin d'une session -- //
            BPClass.Log.Info("Fin session: {session:" + con.session_id + "}");
        }

        // -- Lorsqu'une erreur est survenu dans l'application -- //
        protected void Application_Error(object sender, EventArgs e)
        {
            try
            {
                // -- Réccupération des détails de l'exception -- //
                HttpException ex = Server.GetLastError().GetBaseException() as HttpException;

                // -- Log -- //
                BPClass.Log.Error(ex);

                // -- Variable paramètre à envoyer à la page -- //
                string dt = Cryptage.EncryptStringAES(
                                BPConvert.To_JavaScript(new
                                {
                                    code = ex.GetHttpCode(),
                                    message = ex.Message
                                })
                            );

                // -- Mise à jour du filtre de réponse -- //
                Response.Filter = new ResponseErreur(Response.Filter, dt);
            }
            catch (Exception ex)
            {
                // -- Log -- //
                BPClass.Log.Error(ex);
            }
        }

        // -- Lorsque l'application reçoit une requête -- //
        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            // -- Redirection de www.diasporasante.com vers diasporasante.com -- //
            //if (AppSetting.MAINTENANCE)
            //{
            //    // -- Mise à jour de la requete -- //
            //    HttpContext.Current.Response.Clear();
            //    HttpContext.Current.Response.Status = "301 Moved Permanently";
            //    HttpContext.Current.Response.AddHeader(
            //        "Location", 
            //        AppSetting.SITE_ADRESSE + "/" + 
            //        ((HttpContext.Current.Request.Cookies["bopack"] != null && HttpContext.Current.Request.Cookies["bopack"]["langue"] != null) ? HttpContext.Current.Request.Cookies["bopack"]["langue"] == "0" ? "en" 
            //                                                                                                                                                                                                     : "fr" 
            //                                                                                                                                    : "fr") + "/Home/Maintenance"
            //    );
            //}
            //else
            //{
            //    // -- Mise à jour de l'adresse -- //
            //}
        }
    }
}
