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

        public JsonResult recoverData(int id)
        {
            PruebaDataContext bd = new PruebaDataContext();
            var list = bd.Curso.Where(p => p.BHABILITADO.Equals(1) && p.IIDCURSO.Equals(id))
                .Select(p => new { p.NOMBRE, p.IIDCURSO, p.DESCRIPCION }).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public int saveData (Curso curso)
        {
            PruebaDataContext bd = new PruebaDataContext();
            int afectedData = 0;

            try
            {
                if (curso.IIDCURSO == 0)
                {
                    bd.Curso.InsertOnSubmit(curso);
                    bd.SubmitChanges();
                    afectedData = 1;
                } 
                else {
                    Curso selected = bd.Curso.Where(p => p.IIDCURSO.Equals(curso.IIDCURSO)).First();
                    selected.NOMBRE = curso.NOMBRE;
                    selected.DESCRIPCION = curso.DESCRIPCION;

                    bd.SubmitChanges();
                    afectedData = 1;
                }
            }
            catch (Exception ex)
            {
                afectedData = 0;
            }

            return afectedData;
        }

        public int deleteData(Curso curso)
        {
            PruebaDataContext bd = new PruebaDataContext();
            int afectedData = 0;

            try
            {
                Curso selected = bd.Curso.Where(p => p.IIDCURSO.Equals(curso.IIDCURSO)).First();
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