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

        public JsonResult searchPeriodByName(string name)
        {
            PruebaDataContext bd = new PruebaDataContext();
            var list = bd.Periodo.Where(p => p.BHABILITADO.Equals(1) && p.NOMBRE.Contains(name))
                 .Select(p => new { p.NOMBRE, p.IIDPERIODO, FECHAINICIO = ((DateTime)p.FECHAINICIO).ToShortDateString(), FECHAFIN = ((DateTime)p.FECHAFIN).ToShortDateString() }).ToList();

            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult recoverData(int id)
        {
            PruebaDataContext bd = new PruebaDataContext();
            var list = bd.Periodo.Where(p => p.BHABILITADO.Equals(1) && p.IIDPERIODO.Equals(id))
                .Select(p => new { p.NOMBRE, p.IIDPERIODO, FECHAINICIO = ((DateTime)p.FECHAINICIO).ToShortDateString(), FECHAFIN = ((DateTime)p.FECHAFIN).ToShortDateString() }).ToList();

            return Json(list, JsonRequestBehavior.AllowGet);
        }


        public int deleteData(Periodo operiodo)
        {
            PruebaDataContext bd = new PruebaDataContext();
            int afectedData = 0;

            try
            {
                Periodo selected = bd.Periodo.Where(p => p.IIDPERIODO.Equals(operiodo.IIDPERIODO)).First();
                selected.BHABILITADO = 0;

                bd.SubmitChanges();
                afectedData = 1;
            }
            catch (Exception ex)
            {
                afectedData = 0;
            }

            return afectedData;
        }
    }
}