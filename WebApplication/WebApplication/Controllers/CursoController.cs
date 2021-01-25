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
            return salutation + "How are you " + name;
        }

    }
}