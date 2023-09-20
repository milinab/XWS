using Grpc.Net.Client;
using user_service.ProtoServices.Interfaces;

namespace user_service.ProtoServices
{
    public class CheckRemovalEligibility : ICheckRemovalEligibility
    {
        private readonly IConfiguration _configuration;

        public CheckRemovalEligibility(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public bool CheckEligibility(Guid id)
        {
            Console.WriteLine($"--> Calling GRPC Service {_configuration["GrpcCheckRemovalEligibility"]} ");
            var channel = GrpcChannel.ForAddress(_configuration["GrpcCheckRemovalEligibility"]);
            var client = new GrpcCheckRemovalEligibility.GrpcCheckRemovalEligibilityClient(channel);
            var request = new CheckRemovalEligibilityRequest { UserId = id.ToString()};

            try
            {
                var reply = client.CheckRemovalEligibility(request);
                return reply.IsEligible;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"--> Couldnot call GRPC Server {ex.Message}");
                return false;
            }
        }
    }
}
