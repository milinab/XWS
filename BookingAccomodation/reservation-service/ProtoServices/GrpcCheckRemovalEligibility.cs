using Grpc.Core;
using reservation_service.Service;

namespace reservation_service.ProtoServices;

public class GrpcCheckRemovalEligibility : reservation_service.GrpcCheckRemovalEligibility.GrpcCheckRemovalEligibilityBase
{
    private readonly ReservationService _reservationService;

    public GrpcCheckRemovalEligibility (ReservationService reservationService)
    {
        _reservationService = reservationService;
    }

    public override async Task<IsEligibleResponse> CheckRemovalEligibility(CheckRemovalEligibilityRequest request, ServerCallContext context)
    {
        var eligibleToRemove = _reservationService.IsEligibleToRemove(request.UserId);
        var response = new IsEligibleResponse();

        response.IsEligible = eligibleToRemove.Result;

        return await Task.FromResult(response);
    }
}