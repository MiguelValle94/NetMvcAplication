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
        public JsonResult recoverData(int id)
        {
            PruebaDataContext bd = new PruebaDataContext();
            var list = bd.Alumno.Where(p => p.BHABILITADO.Equals(1) && p.IIDALUMNO.Equals(id))
                .Select(p => new { p.NOMBRE, p.IIDALUMNO, p.APPATERNO, p.APMATERNO, FECHANACIMIENTO = ((DateTime)p.FECHANACIMIENTO).ToShortDateString(), p.TELEFONOPADRE, p.TELEFONOMADRE, p.NUMEROHERMANOS, p.IIDSEXO }).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public int saveData(Alumno alumno)
        {
            PruebaDataContext bd = new PruebaDataContext();
            int afectedData = 0;

            try
            {
                if (alumno.IIDALUMNO == 0)
                {
                    bd.Alumno.InsertOnSubmit(alumno);
                    bd.SubmitChanges();
                    afectedData = 1;
                }
                else
                {
                    Alumno selected = bd.Alumno.Where(p => p.IIDALUMNO.Equals(alumno.IIDALUMNO)).First();
                    selected.NOMBRE = alumno.NOMBRE;
                    selected.APPATERNO = alumno.APPATERNO;
                    selected.APMATERNO = alumno.APMATERNO;
                    selected.IIDSEXO = alumno.IIDSEXO;
                    selected.TELEFONOPADRE = alumno.TELEFONOPADRE;
                    selected.TELEFONOMADRE = alumno.TELEFONOMADRE;
                    selected.FECHANACIMIENTO = alumno.FECHANACIMIENTO;
                    selected.NUMEROHERMANOS = alumno.NUMEROHERMANOS;

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

        public int deleteData (int id)
        {
            PruebaDataContext bd = new PruebaDataContext();
            int afectedData = 0;

            try
            {
                Alumno selected = bd.Alumno.Where(p => p.IIDALUMNO.Equals(id)).First();
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