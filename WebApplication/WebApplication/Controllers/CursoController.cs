using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication.Controllers
{
    public class CursoController : Controller
    {
        // GET: Curso
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listOfCourses()
        {
            PruebaDataContext bd = new PruebaDataContext();
            var list = bd.Curso.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new{p.NOMBRE, p.IIDCURSO, p.DESCRIPCION }).ToList();

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult searchCourseByName(string name)
        {
            PruebaDataContext bd = new PruebaDataContext();
            var list = bd.Curso.Where(p => p.BHABILITADO.Equals(1) && p.NOMBRE.Contains(name))
                .Select(p => new { p.NOMBRE, p.IIDCURSO, p.DESCRIPCION }).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}