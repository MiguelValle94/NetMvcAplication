﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models
{
    public class Period
    {
        public int IIDPERIODO { get; set; }
        public string NOMBRE { get; set; }
        public DateTime FECHAINICIO { get; set; }
        public DateTime FECHAFIN { get; set; }
        public int BHABILITADO { get; set; }
    }
}