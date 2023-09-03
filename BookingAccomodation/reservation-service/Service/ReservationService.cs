using reservation_service.Model;
using reservation_service.ProtoServices;
using reservation_service.ProtoServices.Interfaces;
using reservation_service.Repository;
using reservation_service.Service.Interface;

namespace reservation_service.Service
{
    public class ReservationService : IReservationService
    {
        private readonly ReservationRepository _repository;
        private readonly GetHost _getHost;

        public ReservationService(ReservationRepository repository, GetHost getHost)
        {
            _repository = repository;
            _getHost = getHost;
        }

        public async Task<List<Reservation>> GetAllAsync() =>
            await _repository.GetAllAsync();

        public async Task<Reservation> GetByIdAsync(Guid id) =>
            await _repository.GetByIdAsync(id);
        public async Task CreateAsync(Reservation newReservation)
        {
            List<Reservation> reservations = await GetAllAsync();
            List<Reservation> filteredReservations = reservations.FindAll(r => r.AccomodationId.Equals(newReservation.AccomodationId));
            newReservation.hostId = _getHost.GetHostId(newReservation.AccomodationId);
            await _repository.CreateAsync(newReservation);
        }

        public async Task<bool> CancelReservationAsync(Guid id)
        {
            Reservation reservation = GetByIdAsync(id).Result;
            DateTime currentDate = DateTime.Now;
            TimeSpan difference = reservation.StartDate - currentDate;
            if (difference.Days > 1 && ReservationStatus.Canceled != reservation.Status)
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
        public async Task<bool> AcceptReservationAsync(Guid id)
        {
            Reservation reservation = await GetByIdAsync(id);
            if (reservation != null)
            {
                reservation.Status = ReservationStatus.Active;
                await _repository.UpdateAsync(reservation); // Assuming you have an UpdateAsync method in your repository.
                return true;
            }
            return false;
        }

        public async Task<bool> DeclineReservationAsync(Guid id)
        {
            Reservation reservation = await GetByIdAsync(id);
            if (reservation != null)
            {
                reservation.Status = ReservationStatus.Canceled;
                await _repository.UpdateAsync(reservation); // Assuming you have an UpdateAsync method in your repository.
                return true;
            }
            return false;
        }
        
        public async Task<IEnumerable<Reservation>> GetReservationsByGuestIdAsync(Guid guestId)
        {
            var reservations = await _repository.GetReservationsByGuestIdAsync(guestId);
            return reservations;
        }
    }

}
