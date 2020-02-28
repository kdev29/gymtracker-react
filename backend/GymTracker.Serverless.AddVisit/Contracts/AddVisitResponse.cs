namespace GymTracker.Serverless.AddVisit.Contracts
{
    public class AddVisitResponse
    {
        public bool Created { get; set; }
        public string VisitId { get; set; }
        public string Message { get; set; }
    }
}
