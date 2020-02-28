using Amazon;
using Amazon.DynamoDBv2;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;
using GymTracker.Serverless.AddVisit.Contracts;
using GymTracker.Serverless.AddVisit.Repositories;
using GymTracker.Serverless.AddVisit.Services;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]
//assembly::namespace.class-name::method-name
//GymTracker.Serverless.AddVisit::GymTracker.Serverless.AddVisit.Functions::Get
namespace GymTracker.Serverless.AddVisit
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
                var queryString = request.QueryStringParameters;

                context.Logger.LogLine("Imprimiendo querystring");
                foreach (var item in queryString)
                {
                    context.Logger.LogLine($"{item.Key}:{item.Value}");
                    
                }

                var contractRequest = GetRequest(request);

                var clientConfig = new AmazonDynamoDBConfig();
                clientConfig.RegionEndpoint = RegionEndpoint.USEast1;

                var client = new AmazonDynamoDBClient(clientConfig);
                var repository = new DynamoRepository(client);
                var service = new AddVisitService(repository);


                await service.SaveNewVisit(contractRequest);

                var response = new APIGatewayProxyResponse
                {
                    StatusCode = 200,
                    Body = "new visit saved",
                    Headers = new Dictionary<string, string>
                    {
                        { "Content-Type", "application/json" },
                        { "Access-Control-Allow-Origin", "*" }
                    }
                };

                return response;
            }
            catch (Exception e)
            {
                context.Logger.LogLine(e.ToString());

                return new APIGatewayProxyResponse
                {
                    StatusCode = (int)HttpStatusCode.InternalServerError,
                    Body = e.Message,
                    Headers = new Dictionary<string, string>
                    {
                        { "Content-Type", "application/json" },
                        { "Access-Control-Allow-Origin", "*" }
                    }
                };
            }
        }

        private AddVisitRequest GetRequest(APIGatewayProxyRequest request)
        {
            var contractRequest = JsonConvert.DeserializeObject<AddVisitRequest>(request.Body);

            return contractRequest;            
        }
    }
}
