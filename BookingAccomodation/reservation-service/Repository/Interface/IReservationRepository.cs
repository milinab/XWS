using reservation_service.Model;

namespace reservation_service.Repository.Interface
{
    public interface IReservationRepository
    {
        Task<List<Reservation>> GetAllAsync();
        Task<Reservation> GetByIdAsync(Guid id);
        Task CreateAsync(Reservation newReservation);
        //ask<List<Reservation>> GetReservationsByGuestIdAsync(string guestId);
    }
}
