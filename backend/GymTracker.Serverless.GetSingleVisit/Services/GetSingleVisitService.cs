using GymTracker.Serverless.GetSingleVisit.Contracts;
using GymTracker.Serverless.GetSingleVisit.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace GymTracker.Serverless.GetSingleVisit.Services
{
    class GetSingleVisitService : IGetSingleService
    {
        IGetSingleRepository _repository;

        public GetSingleVisitService()
        {
            _repository = new MockRepository();
        }

        public GetSingleVisitService(IGetSingleRepository repo)
        {
            _repository = repo;
        }
        public async Task<GetSingleVisitResponse> GetVisitById(string id, string date)
        {
            var response = await _repository.GetVisitById(id, date);

            var responseContract = new GetSingleVisitResponse()
            {
                activity = response.activity,
                date = response.date,
                isCheckedOut = response.isCheckedOut,
                lockerId = response.lockerId,
                subactivities = response.subactivities,
                visitId = response.visitId
            };

            return responseContract;
        }
    }
}
