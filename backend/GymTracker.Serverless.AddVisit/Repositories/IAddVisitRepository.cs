using GymTracker.Serverless.AddVisit.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace GymTracker.Serverless.AddVisit.Repositories
{
    public interface IAddVisitRepository
    {
        Task SaveNewVisit(VisitDB visit); 
    }
}
