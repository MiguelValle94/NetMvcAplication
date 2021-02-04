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

        public JsonResult filterByContract(int iidcontrato)
        {
            PruebaDataContext bd = new PruebaDataContext();
            var list = bd.Docente.Where(p => p.BHABILITADO.Equals(1) && p.IIDMODALIDADCONTRATO.Equals(iidcontrato))
                 .Select(p => new { p.NOMBRE, p.IIDDOCENTE, p.APPATERNO, p.APMATERNO, p.EMAIL }).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult recoverData(int id)
        {
            PruebaDataContext bd = new PruebaDataContext();
            var list = bd.Docente.Where(p => p.BHABILITADO.Equals(1) && p.IIDDOCENTE.Equals(id))
                .Select(p => new { p.NOMBRE, p.IIDDOCENTE, p.APPATERNO, p.APMATERNO, p.DIRECCION, p.TELEFONOCELULAR, p.TELEFONOFIJO, p.EMAIL, p.IIDSEXO, p.IIDMODALIDADCONTRATO, FECHACONTRATO = ((DateTime)p.FECHACONTRATO).ToShortDateString(),p.FOTO }).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public int deleteData(int id)
        {
            PruebaDataContext bd = new PruebaDataContext();
            int afectedData = 0;

            try
            {
                Docente selected = bd.Docente.Where(p => p.IIDDOCENTE.Equals(id)).First();
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