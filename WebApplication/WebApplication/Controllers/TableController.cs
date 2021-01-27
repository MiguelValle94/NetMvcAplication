using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication.Models;

namespace WebApplication.Controllers
{
    public class TableController : Controller
    {
        // GET: Default
        public ActionResult TableJs()
        {
            return View();
        }

        public JsonResult ListOfPeople()
        {
            List<Person> listOfPersons = new List<Person>
            {
                new Person{firstSurname = "Martin", secondSurname = "Perez", idPerson = 1 },
                new Person{firstSurname = "Izquierdo", secondSurname = "Marquina", idPerson = 2 },
                new Person{firstSurname = "Valle", secondSurname = "Gil", idPerson = 3 }
            };
            return Json(listOfPersons, JsonRequestBehavior.AllowGet);
        }
    }
}