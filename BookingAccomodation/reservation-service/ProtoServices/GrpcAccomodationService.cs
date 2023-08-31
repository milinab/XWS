using Grpc.Core;

namespace reservation_service.ProtoServices;

public class GrpcAccomodationService : GrpcCheckAvailability.GrpcCheckAvailabilityBase
{
    public override async Task<IsAvailableResponse> CheckAccomodationAvailability(ReservationForCheckRequest request, ServerCallContext context)
    {
        var response = new IsAvailableResponse();

        Console.WriteLine($"--> GrpcAccomodationService.CheckAccomodationAvailability reached...");
        response.IsAvailable = true;

        return await Task.FromResult(response);
    }
}