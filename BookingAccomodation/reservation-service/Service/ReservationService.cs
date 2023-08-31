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

        public async Task<bool> CancelReservationAsync(Guid id)
        {
            Reservation reservation = GetByIdAsync(id).Result;
            DateTime currentDate = DateTime.Now;
            TimeSpan difference = reservation.StartDate - currentDate;
            if (difference.Days > 1)
            {
                Console.WriteLine("Current date " + currentDate);
                Console.WriteLine("Start date " + reservation.StartDate);
                Console.WriteLine("Difference " + difference.Days);
                await _repository.CancelReservationAsync(id);

                return true;
            } 
            else
            {
                return false;
            }
        }

        public bool IsAccomodationAvailable(string requestAccomodationId, string requestStartDate, string requestEndDate)
        {
            Guid accomodationId = Guid.Parse(requestAccomodationId);
            DateTime startDate = DateTime.Parse(requestStartDate);
            DateTime endDate = DateTime.Parse(requestEndDate);

            return _repository.IsAccomodationAvailable(accomodationId, startDate, endDate);
        }
    }

}
