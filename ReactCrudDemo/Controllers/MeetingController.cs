using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ConferenceRoomBooking.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ConferenceRoomBooking.Controllers
{
    public class MeetingController : Controller
    {

        MeetingDataAccessLayer objmeeting = new MeetingDataAccessLayer();

        [HttpGet]
        [Route("api/Meeting/Index")]
        public IEnumerable<tblMeetings> Index()
        {
            return objmeeting.GetAllMeeting();
        }

        [HttpPost]
        [Route("api/Meeting/Create")]
        public int Create(tblMeetings employee)
        {
            return objmeeting.AddMeeting(employee);
        }

        [HttpGet]
        [Route("api/Meeting/Details/{id}")]
        public tblMeetings Details(int id)
        {
            return objmeeting.GetMeetingData(id);
        }

        [HttpPut]
        [Route("api/Meeting/Edit")]
        public int Edit(tblMeetings employee)
        {
            return objmeeting.UpdateMeeting(employee);
        }

        [HttpDelete]
        [Route("api/Meeting/Delete/{id}")]
        public int Delete(int id)
        {
            return objmeeting.DeleteMeeting(id);
        }

        //[HttpGet]
        //[Route("api/Employee/GetCityList")]
        //public IEnumerable<TblCities> Details()
        //{
        //    return objmeeting.GetCities();
        //}

    }
}