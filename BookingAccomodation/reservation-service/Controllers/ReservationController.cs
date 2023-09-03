using Microsoft.AspNetCore.Mvc;
using reservation_service.Model;
using reservation_service.ProtoServices;
using reservation_service.Service;

namespace reservation_service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationController : ControllerBase
    {
        private readonly ReservationService _reservationService;
        private readonly CheckAccomodationAvailability checkAccomodationAvailability;
        private readonly GetHost _getHost;
        public ReservationController(ReservationService reservationService, CheckAccomodationAvailability checkAccomodationAvailability, GetHost getHost)
        {
            _reservationService = reservationService;
            this.checkAccomodationAvailability = checkAccomodationAvailability;
            this._getHost = getHost;
        }

        [HttpGet]
        public async Task<List<Reservation>> Get() =>
        await _reservationService.GetAllAsync();

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<Reservation>> Get(Guid id)
        {
            var reservation = await _reservationService.GetByIdAsync(id);

            if (reservation is null)
                return NotFound();

            return reservation;
        }
        [HttpPost]
        public async Task<IActionResult> Post(Reservation newReservation)
        {
            await _reservationService.CreateAsync(newReservation);

            return CreatedAtAction(nameof(Get), new { id = newReservation.Id }, newReservation);
        }

        [HttpPost("available")]
        public async Task<bool> GetBool(Reservation reservation)
        {
            return checkAccomodationAvailability.CheckAccomodadtions(reservation.AccomodationId,reservation.StartDate,reservation.EndDate);
        }

        [HttpPost("host")]
        public async Task<string> GetHost(Reservation reservation)
        {
            return _getHost.GetHostId(reservation.AccomodationId);
        }

        [HttpPut("{id:guid}/cancel")]
        public async Task<bool> Cancel(Guid id)
        {
            return await _reservationService.CancelReservationAsync(id);
        }
        [HttpPut("{id:guid}/accept")]
        public async Task<bool> Accept(Guid id)
        {
            return await _reservationService.AcceptReservationAsync(id);
        }
        [HttpPut("{id:guid}/decline")]
        public async Task<bool> Decline(Guid id)
        {
            return await _reservationService.DeclineReservationAsync(id);
        }
        
        [HttpGet("by-guest/{guestId:guid}")]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetByGuestId(Guid guestId)
        {
            var reservations = await _reservationService.GetReservationsByGuestIdAsync(guestId);

            if (reservations == null || !reservations.Any())
                return NotFound("No reservations found for the specified guest.");

            return Ok(reservations);
        }
    }

}
