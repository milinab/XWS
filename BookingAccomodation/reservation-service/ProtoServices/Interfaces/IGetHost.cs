namespace reservation_service.ProtoServices.Interfaces;

public interface IGetHost
{
    String GetHostId(Guid accomodationId);
}