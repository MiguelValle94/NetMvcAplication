using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication.Controllers
{
    public class DocenteController : Controller
    {
        // GET: Docente
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listTeachers()
        {
            PruebaDataContext bd = new PruebaDataContext();
            var list = bd.Docente.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new { p.NOMBRE, p.IIDDOCENTE, p.APPATERNO, p.APMATERNO, p.EMAIL }).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult listContracts()
        {
            PruebaDataContext bd = new PruebaDataContext();
            var list = bd.ModalidadContrato.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new { p.NOMBRE, IID = p.IIDMODALIDADCONTRATO }).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}