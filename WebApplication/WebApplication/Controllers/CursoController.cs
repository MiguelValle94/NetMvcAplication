﻿using System;
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

        public string sayHello()
        {
            return "Welcome to the course";
        }

        public string howAreYou(string name)
        {
            return "How are you " + name;
        }
        public string howAreYouHello(string name, string salutation)
        {
            return salutation + " How are you " + name;
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