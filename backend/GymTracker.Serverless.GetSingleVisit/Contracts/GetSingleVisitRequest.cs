using System;
using System.Collections.Generic;
using System.Text;

namespace GymTracker.Serverless.GetSingleVisit.Contracts
{
    public class GetSingleVisitRequest
    {
        public string clientId { get; set; }
        public string token { get; set; }
        public string visitId { get; set; }
        public string date { get; set; }
    }
}
