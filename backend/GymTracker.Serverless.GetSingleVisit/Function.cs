using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;
using GymTracker.Serverless.GetSingleVisit.Contracts;
using Newtonsoft.Json;
using GymTracker.Serverless.GetSingleVisit.Services;
using Amazon.DynamoDBv2;
using Amazon;
using GymTracker.Serverless.GetSingleVisit.Repositories;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]
//GymTracker.Serverless.GetSingleVisit::GymTracker.Serverless.GetSingleVisit.Functions::Get
namespace GymTracker.Serverless.GetSingleVisit
{
    public class Functions
    {
        /// <summary>
        /// Default constructor that Lambda will invoke.
        /// </summary>
        public Functions()
        {
        }


        /// <summary>
        /// A Lambda function to respond to HTTP Get methods from API Gateway
        /// </summary>
        /// <param name="request"></param>
        /// <returns>The list of blogs</returns>
        public async Task<APIGatewayProxyResponse> Get(APIGatewayProxyRequest request, ILambdaContext context)
        {
            try
            {
                context.Logger.LogLine("Get Request\n");
                context.Logger.LogLine("Imprimiendo body");
                context.Logger.LogLine(request.Body);

                if (request.QueryStringParameters is null)
                    throw new ApplicationException("QueryString is null.");

                context.Logger.LogLine("Imprimiendo querystring");
                foreach (var item in request.QueryStringParameters)
                {
                    context.Logger.LogLine($"{item.Key}:{item.Value}");
                }
                
                var requestContract = new GetSingleVisitRequest()
                {
                    date = request.QueryStringParameters["fecha"],
                    visitId = request.QueryStringParameters["visitId"]
                };

                context.Logger.LogLine($"Imprimiendo request visit {requestContract.visitId}, date {requestContract.date}  ");                

                AmazonDynamoDBConfig clientConfig = new AmazonDynamoDBConfig();
                clientConfig.RegionEndpoint = RegionEndpoint.USEast1;

                var client = new AmazonDynamoDBClient(clientConfig);
                var repository = new DynamoRepository(client);

                var service = new GetSingleVisitService(repository);
                var visit = await service.GetVisitById(requestContract.visitId, requestContract.date);

                var response = CreateResponse(visit);

                return response;
            }
            catch (Exception e)
            {
                var APIresponse = new APIGatewayProxyResponse
                {
                    StatusCode = (int)HttpStatusCode.InternalServerError,
                    Body = e.ToString(),
                    Headers = new Dictionary<string, string>
                    {
                        { "Content-Type", "application/json" },
                        { "Access-Control-Allow-Origin", "*" }
                    }
                }; 

                return APIresponse;
            }
        }

        private APIGatewayProxyResponse CreateResponse(GetSingleVisitResponse result)
        {
            int statusCode = (result != null) ?
                (int)HttpStatusCode.OK :
                (int)HttpStatusCode.InternalServerError;

            string body = (result != null) ?
                JsonConvert.SerializeObject(result) : string.Empty;

            var APIresponse = new APIGatewayProxyResponse
            {
                StatusCode = statusCode,
                Body = body,
                Headers = new Dictionary<string, string>
                {
                    { "Content-Type", "application/json" },
                    { "Access-Control-Allow-Origin", "*" }
                }
            };

            return APIresponse;
        }
    }
}
