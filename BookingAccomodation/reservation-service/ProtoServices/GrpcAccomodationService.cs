using Grpc.Core;
using reservation_service.Service;

namespace reservation_service.ProtoServices;

public class GrpcAccomodationService : GrpcCheckAvailability.GrpcCheckAvailabilityBase
{
    private readonly ReservationService _reservationService;

    public GrpcAccomodationService(ReservationService reservationService)
    {
        _reservationService = reservationService;
    }

    public override async Task<IsAvailableResponse> CheckAccomodationAvailability(ReservationForCheckRequest request, ServerCallContext context)
    {
        Console.WriteLine($"--> GrpcAccomodationService.CheckAccomodationAvailability reached...");

        bool available = _reservationService.IsAccomodationAvailable(request.AccomodationId, request.StartDate, request.EndDate);
        
        var response = new IsAvailableResponse();
        response.IsAvailable = available;

        return await Task.FromResult(response);
    }
}