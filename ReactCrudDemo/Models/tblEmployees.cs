using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConferenceRoomBooking.Models
{
    public class tblEmployees
    {
        public int EmployeeID { get; set; }

        public string Name { get; set; }

        public string MeetingName { get; set; }

        public string Gender { get; set; }

        public bool IsAdmin { get; set; }
    }
}
