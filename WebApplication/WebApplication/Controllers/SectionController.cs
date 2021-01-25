using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication.Controllers
{
    public class SectionController : Controller
    {
        // GET: Section
        public ActionResult Render()
        {
            return View();
        }
    }
}