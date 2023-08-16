using Grpc.Net.Client;
using reservation_service.ProtoServices.Interfaces;

namespace reservation_service.ProtoServices
{
    public class CheckAccomodationAvailability : ICheckAccomodationAvailability
    {
        private readonly IConfiguration _configuration;

        public CheckAccomodationAvailability(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public bool  CheckAccomodadtions(Guid id, DateTime startDate, DateTime endDate)
        {
            Console.WriteLine($"--> Calling GRPC Service {_configuration["GrpcCheckAccomodations"]} ");
            var channel = GrpcChannel.ForAddress(_configuration["GrpcCheckAccomodations"]);
            var client = new GrpcCheckAvailability.GrpcCheckAvailabilityClient(channel);
            var request = new ReservationForCheckRequest { AccomodationId = id.ToString(), StartDate = startDate.ToString(), EndDate = endDate.ToString() };

            try
            {
                var reply = client.CheckAccomodationAvailability(request);
                return reply.IsAvailable;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"--> Couldnot call GRPC Server {ex.Message}");
                return false;
            }
        }
    }
}
