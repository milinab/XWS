using Accomodations.Service;
using Grpc.Core;
using reservation_service;

namespace Accomodations.ProtoServices
{
    public class GrpcCheckAccomodationAvailabilityService : GrpcCheckAvailability.GrpcCheckAvailabilityBase
    {
        private readonly AccomodationService _accomodationService;

        public GrpcCheckAccomodationAvailabilityService (AccomodationService accomodationService)
        {
            _accomodationService = accomodationService;
        }

        public override async Task<IsAvailableResponse> CheckAccomodationAvailability(ReservationForCheckRequest request, ServerCallContext context)
        {
            var response = new IsAvailableResponse();

            response.IsAvailable = true;

            return await Task.FromResult(response);
        }
    }
}
