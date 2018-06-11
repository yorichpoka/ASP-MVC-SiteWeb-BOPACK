﻿using BOPACKSite.Models.Static;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace BOPACKSite.Models.ActionFilter
{
    public class ResponseErreur : MemoryStream
    {
        private StringBuilder responseContent = new StringBuilder();
        private Stream outputStream = null;
        private string dt = null;


        public ResponseErreur(Stream output, string dt)
        {
            outputStream = output;
            this.dt = dt;
        }


        public override void Write(byte[] buffer, int offset, int count)
        {
            // -- Réccupération du string de la page HTML -- //
            string page = BPClass.HTML_Site_Web($"{AppSetting.SITE_ADRESSE}/Erreur/Index/?dt={dt}");

            // -- Ajout de la page dans la reponse -- //
            responseContent.Append(page);

            // Write contentWithCopyright to the outputStream
            byte[] outputBuffer = UTF8Encoding.UTF8.GetBytes(responseContent.ToString());

            // -- Mise à jour de la page dans le stream de sortie --//
            outputStream.Write(outputBuffer, 0, outputBuffer.Length);
        }
    }
}