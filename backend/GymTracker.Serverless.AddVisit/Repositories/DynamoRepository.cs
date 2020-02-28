using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using GymTracker.Serverless.AddVisit.Models;
using System.Threading.Tasks;

namespace GymTracker.Serverless.AddVisit.Repositories
{
    public class DynamoRepository : IAddVisitRepository
    {
        DynamoDBContext _context;

        public DynamoRepository(IAmazonDynamoDB db)
        {
            _context = new DynamoDBContext(db);
        }

        public async Task SaveNewVisit(VisitDB visit)
        {
            await _context.SaveAsync(visit);
        }
    }
}
