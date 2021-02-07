﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication.Controllers
{
    public class GradoSeccionController : Controller
    {
        // GET: GradoSeccion
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listGradoSeccion()
        {
            PruebaDataContext bd = new PruebaDataContext();
            var list = (from gradosec in bd.GradoSeccion
                       join sec in bd.Seccion
                       on gradosec.IIDSECCION equals sec.IIDSECCION
                       join grad in bd.Grado
                       on gradosec.IIDGRADO equals grad.IIDGRADO
                       select new
                       {
                           gradosec.IID,
                           NOMBREGRADO = grad.NOMBRE,
                           NOMBRESECCION = sec.NOMBRE
                       }).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult recoverData(int id)
        {
            PruebaDataContext bd = new PruebaDataContext();
            var list = bd.GradoSeccion.Where(p => p.IID.Equals(id))
                .Select(p => new
                {
                    p.IID,
                    p.IIDGRADO,
                    p.IIDSECCION
                })
                .First();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult listSection ()
        {
            PruebaDataContext bd = new PruebaDataContext();
            var list = bd.Seccion.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new { p.NOMBRE, IID = p.IIDSECCION }).ToList();

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult listGrade ()
        {
            PruebaDataContext bd = new PruebaDataContext();
            var list = bd.Grado.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new { p.NOMBRE, IID = p.IIDGRADO }).ToList();

            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}