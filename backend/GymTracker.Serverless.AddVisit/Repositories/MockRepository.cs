using GymTracker.Serverless.AddVisit.Models;
using System.Threading.Tasks;

namespace GymTracker.Serverless.AddVisit.Repositories
{
    public class MockRepository: IAddVisitRepository
    {
        public async Task SaveNewVisit(VisitDB visit)
        {
            await Task.Run(() => { return; });
        }
    }
}
