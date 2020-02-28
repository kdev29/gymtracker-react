using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using GymTracker.Serverless.GetSingleVisit.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace GymTracker.Serverless.GetSingleVisit.Repositories
{
    public class DynamoRepository : IGetSingleRepository
    {
        DynamoDBContext _context;

        public DynamoRepository(IAmazonDynamoDB context)
        {
            _context = new DynamoDBContext(context);
        }

        public Task<VisitDB> GetVisitById(string visitId, string date)
        {
            return _context.LoadAsync<VisitDB>(Convert.ToInt32(visitId), date);
        }
    }
}
