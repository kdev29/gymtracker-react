using GymTracker.Serverless.GetSingleVisit.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace GymTracker.Serverless.GetSingleVisit.Repositories
{
    public interface IGetSingleRepository
    {
        Task<VisitDB> GetVisitById(string visitId, string date);
    }
}
