using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication.Controllers
{
    public class SeccionController : Controller
    {
        // GET: Seccion
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listSection()
        {
            PruebaDataContext bd = new PruebaDataContext();
            var list = bd.Seccion.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new { p.NOMBRE, p.IIDSECCION }).ToList();

            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}