using GymTracker.Serverless.AddVisit.Contracts;
using GymTracker.Serverless.AddVisit.Models;
using GymTracker.Serverless.AddVisit.Repositories;
using System.Threading.Tasks;

namespace GymTracker.Serverless.AddVisit.Services
{
    public class AddVisitService
    {
        IAddVisitRepository _repository;

        public AddVisitService()
        {
            _repository = new MockRepository();
        }

        public AddVisitService(IAddVisitRepository dbContext)
        {
            _repository = dbContext;
        }

        public async Task SaveNewVisit(AddVisitRequest request)
        {
            var dbModel = ToDBModel(request);

            await _repository.SaveNewVisit(dbModel);
        }

        private VisitDB ToDBModel(AddVisitRequest request)
        {
            return new VisitDB()
            {
                activity = request.activity,
                date = request.date,
                isCheckedOut = request.isCheckedOut,
                lockerId = request.lockerId,
                subactivities = request.subactivities,
                visitId = request.visitId,
                venue = request.venue
            };
        }
    }
}
