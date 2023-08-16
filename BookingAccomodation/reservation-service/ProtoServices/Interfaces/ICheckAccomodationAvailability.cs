namespace reservation_service.ProtoServices.Interfaces
{
    public interface ICheckAccomodationAvailability
    {
        bool CheckAccomodadtions(Guid id, DateTime startDate, DateTime endDate);
    }
}
