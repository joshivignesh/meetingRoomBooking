using System;

namespace ConferenceRoomBooking.Models
{
    public class tblMeetings
    {
        public int MeetingID { get; set; }

        public string MeetingName { get; set; }

        public DateTime MeetingStartDate { get; set; }

        public DateTime MeetingendDate { get; set; }

       // public tblEmployeeMeeting EmployeeMeeting { get; set; }
    }
}
