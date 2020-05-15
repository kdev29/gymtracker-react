using Amazon.DynamoDBv2.DataModel;
using System.Collections.Generic;

namespace GymTracker.Serverless.AddVisit.Models
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
        public string venue { get; set; }
        public int calories { get; set; }
    }
}
