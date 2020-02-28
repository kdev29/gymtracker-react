using System.Collections.Generic;

namespace GymTracker.Serverless.AddVisit.Contracts
{
    public class AddVisitRequest
    {
        public int visitId { get; set; }
        public string date { get; set; }
        public string activity { get; set; }
        public string isCheckedOut { get; set; }
        public List<string> subactivities { get; set; }
        public string lockerId { get; set; }
        public string clientId { get; set; }
        public string token { get; set; }
    }
}
