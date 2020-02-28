using GymTracker.Serverless.GetSingleVisit.Contracts;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace GymTracker.Serverless.GetSingleVisit.Services
{
    public interface IGetSingleService
    {
        Task<GetSingleVisitResponse> GetVisitById(string id, string date);
    }
}
