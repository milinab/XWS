using reservation_service.Model;

namespace reservation_service.Service.Interface
{
    public interface IReservationService
    {
        Task<List<Reservation>> GetAllAsync();
        Task<Reservation> GetByIdAsync(Guid id);
        Task CreateAsync(Reservation newReservation);
    }
}
