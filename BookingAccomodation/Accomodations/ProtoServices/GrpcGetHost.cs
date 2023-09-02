using Accomodations.Model;
using Accomodations.Service;
using Grpc.Core;
using reservation_service;

namespace Accomodations.ProtoServices;

public class GrpcGetHost : GrpcGetHostByAccomodation.GrpcGetHostByAccomodationBase
{
    private readonly AccomodationService _accomodationService;

    public GrpcGetHost(AccomodationService accomodationService)
    {
        _accomodationService = accomodationService;
    }

    public override async Task<HostResponse> GetHostByAccomodation(AccomodationRequest request, ServerCallContext context)
    {
        Accomodation accomodation = await _accomodationService.GetAccomodationById(new Guid(request.AccomodationId));
        var response = new HostResponse();
        response.HostId = accomodation.HostId.ToString();
        return await Task.FromResult(response);
    }
}