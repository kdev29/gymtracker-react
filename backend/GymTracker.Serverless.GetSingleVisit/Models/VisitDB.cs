using Amazon.DynamoDBv2.DataModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace GymTracker.Serverless.GetSingleVisit.Models
{
    [DynamoDBTable("visitasgym")]
    public class VisitDB
    {
        [DynamoDBHashKey]
        [DynamoDBProperty("visitaId")]
        public int visitId { get; set; }

        [DynamoDBRangeKey]
        [DynamoDBProperty("fecha")]
        public string date { get; set; }

        [DynamoDBProperty("actividad")]
        public string activity { get; set; }
        public string isCheckedOut { get; set; }
        public List<string> subactivities { get; set; }
        public string lockerId { get; set; }
    }
}
