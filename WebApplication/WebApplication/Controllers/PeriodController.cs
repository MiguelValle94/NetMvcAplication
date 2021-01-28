using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication.Controllers
{
    public class PeriodController : Controller
    {
        // GET: Period
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listPeriod()
        {
            PruebaDataContext bd = new PruebaDataContext();
            var list = bd.Periodo.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new { p.NOMBRE, p.IIDPERIODO, p.FECHAINICIO, p.FECHAFIN }).ToList();

            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}