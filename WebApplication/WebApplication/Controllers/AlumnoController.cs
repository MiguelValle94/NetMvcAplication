using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication.Controllers
{
    public class AlumnoController : Controller
    {
        // GET: Alumno
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listStudents()
        {
            PruebaDataContext bd = new PruebaDataContext();
            var list = bd.Alumno.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new { p.NOMBRE, p.IIDALUMNO, p.APPATERNO,p.APMATERNO, p.TELEFONOPADRE }).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult listGender()
        {
            PruebaDataContext bd = new PruebaDataContext();
            var list = bd.Sexo.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new { p.NOMBRE, IID = p.IIDSEXO }).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult filterByGender(int iidsexo)
        {
            PruebaDataContext bd = new PruebaDataContext();
            var list = bd.Alumno.Where(p => p.BHABILITADO.Equals(1) && p.IIDSEXO.Equals(iidsexo))
                .Select(p => new { p.NOMBRE, p.IIDALUMNO, p.APPATERNO, p.APMATERNO, p.TELEFONOPADRE }).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}