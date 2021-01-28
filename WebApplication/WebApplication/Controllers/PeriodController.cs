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
                .Select(p => new { p.NOMBRE, p.IIDPERIODO, FECHAINICIO = ((DateTime) p.FECHAINICIO).ToShortDateString(), FECHAFIN = ((DateTime) p.FECHAFIN).ToShortDateString() }).ToList();

            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}