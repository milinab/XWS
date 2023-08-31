using Accomodations.ProtoServices.Interface;
using Grpc.Net.Client;
using reservation_service;

namespace Accomodations.ProtoServices;

public class AccomodationAvailableService : IAccomodationAvailableService
{
    
    private readonly IConfiguration _configuration;

    public AccomodationAvailableService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public bool IsAccAvailable(String id, String startDate, String endDate)
    {
        Console.WriteLine($"--> Calling GRPC Service {_configuration["GrpcCheckAccomodationsReservation"]} ");
        var channel = GrpcChannel.ForAddress(_configuration["GrpcCheckAccomodationsReservation"]);
        var client = new GrpcCheckAvailability.GrpcCheckAvailabilityClient(channel);
        var request = new ReservationForCheckRequest {
            AccomodationId = id, 
            StartDate = startDate, 
            EndDate = endDate
        };

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