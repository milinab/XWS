using Grpc.Net.Client;
using reservation_service.ProtoServices.Interfaces;

namespace reservation_service.ProtoServices;

public class GetHost : IGetHost
{
    private readonly IConfiguration _configuration;

    public GetHost(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GetHostId(Guid accomodationId)
    {
        Console.WriteLine($"--> Calling GRPC Service {_configuration["GrpcGetHost"]}");
        var channel = GrpcChannel.ForAddress(_configuration["GrpcGetHost"]);
        var client = new GrpcGetHostByAccomodation.GrpcGetHostByAccomodationClient(channel);
        var request = new AccomodationRequest { AccomodationId = accomodationId.ToString() };

        try
        {
            Console.WriteLine(request);
            var reply = client.GetHostByAccomodation(request);
            Console.WriteLine(reply);
            return reply.HostId;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"--> Could not call GRPC Server {ex.Message}");
            return "greska";
        }
    }
}