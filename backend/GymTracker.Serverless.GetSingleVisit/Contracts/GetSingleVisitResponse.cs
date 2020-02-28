using System;
using System.Collections.Generic;
using System.Text;

namespace GymTracker.Serverless.GetSingleVisit.Contracts
{
    public class GetSingleVisitResponse
    {
        public int visitId { get; set; }
        public string date { get; set; }
        public string activity { get; set; }
        public string isCheckedOut { get; set; }
        public List<string> subactivities { get; set; }
        public string lockerId { get; set; }
    }
}
