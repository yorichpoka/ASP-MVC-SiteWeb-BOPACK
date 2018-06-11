using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BOPACKSite.Models.Static
{
    public static class AppSetting
    {
        public static string MAPS_API_KEY           { get { return System.Configuration.ConfigurationManager.AppSettings["MAPS_API_KEY"]; } }
        public static string CONTACTS_TEL           { get { return System.Configuration.ConfigurationManager.AppSettings["CONTACTS_TEL"]; } }
        public static string CONTACTS_EMAIL         { get { return System.Configuration.ConfigurationManager.AppSettings["CONTACTS_EMAIL"]; } }
        public static string CONTACTS_FAX           { get { return System.Configuration.ConfigurationManager.AppSettings["CONTACTS_FAX"]; } }
        public static string CONTACTS_BP            { get { return System.Configuration.ConfigurationManager.AppSettings["CONTACTS_BP"]; } }
        public static string CONTACTS_WEB           { get { return System.Configuration.ConfigurationManager.AppSettings["CONTACTS_WEB"]; } }
        public static string CONTACTS_FACEBOOK      { get { return System.Configuration.ConfigurationManager.AppSettings["CONTACTS_FACEBOOK"]; } }
        public static string APP_VERSION            { get { return System.Configuration.ConfigurationManager.AppSettings["APP_VERSION"]; } }
        public static Boolean MAINTENANCE           { get { return Convert.ToBoolean(System.Configuration.ConfigurationManager.AppSettings["MAINTENANCE"]); } }
        public static string SITE_ADRESSE           { get { return System.Configuration.ConfigurationManager.AppSettings["SITE_ADRESSE"]; } }
        public static string MAPS_ADRESSE           { get { return System.Configuration.ConfigurationManager.AppSettings["MAPS_ADRESSE"]; } }
        public static string MAPS_LATITUDE          { get { return System.Configuration.ConfigurationManager.AppSettings["MAPS_LATITUDE"]; } }
        public static string MAPS_LONGITUDE         { get { return System.Configuration.ConfigurationManager.AppSettings["MAPS_LONGITUDE"]; } }
        public static string ENCRYPTION_KEY_AES     { get { return System.Configuration.ConfigurationManager.AppSettings["ENCRYPTION_KEY_AES"]; } }
        public static string DELAI_MAINTENANCE      { get { return System.Configuration.ConfigurationManager.AppSettings["DELAI_MAINTENANCE"]; } }
    }
}