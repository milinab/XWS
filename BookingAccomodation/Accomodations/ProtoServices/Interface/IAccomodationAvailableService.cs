namespace Accomodations.ProtoServices.Interface;

public interface IAccomodationAvailableService
{
    bool IsAccAvailable(String id, String startDate, String endDate);
}