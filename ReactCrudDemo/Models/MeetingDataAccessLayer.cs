using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace ConferenceRoomBooking.Models
{
    public class MeetingDataAccessLayer
    {
        meetingDBContext db = new meetingDBContext();

        public IEnumerable<tblMeetings> GetAllMeeting()
        {
            try
            {
                return db.tblMeetings.ToList();
            }
            catch
            {
                throw;
            }
        }

        ////public IEnumerable<tblMeetings> GetAllEmployeeMeeting(int employeeID)
        ////{
        ////    try
        ////    {
        ////        //tblMeetings employee = db.tblMeetings.ToList();
        ////        //tblEmployeeMeeting employeemeeting = db.tblEmployeeMeeting.ToList();
        ////        //return employee;

        ////        return  db.tblMeetings.Where(s => db.tblEmployeeMeeting.Any(e => e.EmployeeID == employeeID) );

               
        ////    }
        ////    catch
        ////    {
        ////        throw;
        ////    }
        ////}

        //To Add new employee record   
        public int AddMeeting(tblMeetings meeting)
        {
            try
            {
                db.tblMeetings.Add(meeting);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //To Update the records of a particluar employee  
        public int UpdateMeeting(tblMeetings meeting)
        {
            try
            {
                db.Entry(meeting).State = EntityState.Modified;
                db.SaveChanges();

                return 1;
            }
            catch
            {
                throw;
            }
        }

        //Get the details of a particular employee  
        public tblMeetings GetMeetingData(int id)
        {
            try
            {
                tblMeetings employee = db.tblMeetings.Find(id);
                return employee;
            }
            catch
            {
                throw;
            }
        }

        //To Delete the record of a particular employee  
        public int DeleteMeeting(int id)
        {
            try
            {
                tblMeetings emp = db.tblMeetings.Find(id);
                db.tblMeetings.Remove(emp);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

       
    }
}
