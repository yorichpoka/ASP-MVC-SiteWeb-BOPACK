using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BOPACKSite.Models
{
    public class Connexion
    {
        public string session_id { get; set; }

        public Connexion(string session_id)
        {
            this.session_id = session_id;
        }
    }
}