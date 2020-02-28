using GymTracker.Serverless.GetSingleVisit.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace GymTracker.Serverless.GetSingleVisit.Repositories
{
    public class MockRepository : IGetSingleRepository
    {
        public async Task<VisitDB> GetVisitById(string visitId, string date)
        {
            return new VisitDB() { activity = "fuerza", date = DateTime.Now.ToString(), isCheckedOut = "true", subactivities = new List<string>() { "Brazo", "Pecho", "Espalda" }, visitId = 1 };
        }
    }
}
