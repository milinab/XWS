using reservation_service.Model;
using reservation_service.Repository;
using reservation_service.Service.Interface;

namespace reservation_service.Service
{
    public class ReservationService : IReservationService
    {
        private readonly ReservationRepository _repository;

        public ReservationService(ReservationRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<Reservation>> GetAllAsync() =>
            await _repository.GetAllAsync();

        public async Task<Reservation> GetByIdAsync(Guid id) =>
            await _repository.GetByIdAsync(id);
        public async Task CreateAsync(Reservation newReservation)
        {
            List<Reservation> reservations = await GetAllAsync();
            List<Reservation> filteredReservations = reservations.FindAll(r => r.AccomodationId.Equals(newReservation.AccomodationId));


            await _repository.CreateAsync(newReservation);
        }
    }

}
