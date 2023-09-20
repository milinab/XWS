using Accomodations.Dtos;
using Accomodations.Model;
using Accomodations.ProtoServices;
using Accomodations.Service;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using reservation_service;
using reservation_service.Model;
using reservation_service.Repository;

namespace Accomodations.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccomodationController : ControllerBase
    {

        private readonly AccomodationService _service;
        private readonly IMapper _mapper;
        private readonly AccomodationAvailableService accomodationAvailableService;
        private readonly AvailablePeriodRepository _availablePeriodRepository;
        private readonly GradeService _gradeService;
        
        public AccomodationController(AccomodationService service, IMapper mapper, AccomodationAvailableService accomodationAvailableService, GradeService gradeService, AvailablePeriodRepository availablePeriodRepository)
        {
            _service = service;
            _mapper = mapper;
            this.accomodationAvailableService = accomodationAvailableService;
            this._gradeService = gradeService;
            this._availablePeriodRepository = availablePeriodRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Accomodation>> GetAccomodations()//bio dto
        {
            var accomodations = await _service.GetAllAsync();
            // var accomodationsReadDto = _mapper.Map<IEnumerable<AccomodationReadDto>>(accomodations);
            return _mapper.Map<IEnumerable<Accomodation>>(accomodations);
        }

        [HttpGet("{id}", Name = "GetAccomodationById")]
        public async Task<ActionResult<Accomodation>> GetAccomodationById(Guid id)
        {
            var accomodationItem = await _service.GetAccomodationById(id);
            if (accomodationItem != null)
            {
                return Ok(_mapper.Map<Accomodation>(accomodationItem));
            }

            return NotFound();
        }

        [HttpPost]
        public async Task<ActionResult<Accomodation>> CreateAsync(Accomodation accomodationCreateDto)
        {
            //var accomodationModel = _mapper.Map<Accomodation>(accomodationCreateDto);

            //return CreatedAtRoute(nameof(GetAccomodationById), new { id = accomodationModel.Id }, accomodationModel);
             await _service.CreateAsync(accomodationCreateDto);
             return CreatedAtAction(nameof(GetAccomodations), new { id = accomodationCreateDto.Id }, accomodationCreateDto);
        }
        
        [HttpPost("available")]
        public async Task<IEnumerable<SearchResponse>> IsAccomodationAvailable(SearchDto searchRequest)
        {
            List<Accomodation> accomodations = _service.checkCityAndNumberOfGuests(searchRequest);
            if (accomodations.Count == 0)
            {
                return Array.Empty<SearchResponse>();
            }

            List<Accomodation> withoutActiveReservation = new List<Accomodation>();

            foreach (var accomodation in accomodations)
            {
                var isAccAvailable = accomodationAvailableService.IsAccAvailable(
                    accomodation.Id.ToString(), 
                    searchRequest.StartDate.ToString(),
                    searchRequest.EndDate.ToString());

                if (isAccAvailable)
                {
                    withoutActiveReservation.Add(accomodation);
                }
            }
            List<SearchResponse> results = new List<SearchResponse>();

            foreach (var accommodation in withoutActiveReservation)
            {
                List<AvailablePeriod> availablePeriodsByAccommodation = _availablePeriodRepository.GetByAccommodationId(accommodation.Id);

                foreach (var availablePeriod in availablePeriodsByAccommodation)
                {
                    if (searchRequest.StartDate >= availablePeriod.Start && availablePeriod.End >= searchRequest.EndDate)
                    {
                        results.Add(new SearchResponse
                        {
                            Accomodation = accommodation,
                            AvailablePeriod = availablePeriod
                        });
                    }
                }
            }
            return results;
        }

        [AllowAnonymous]
        [HttpGet("delete/{id}")]
        public async Task<ActionResult<Accomodation>> DeleteAccommodationsWithHostId(Guid id)
        {
            await _service.DeleteWithHostId(id);
            return Ok(new { message = "Deleted host owned accommodations successfully" });
        }
        
        [AllowAnonymous]
        [HttpGet("getByAccomodation/{id}")]
        public async Task<List<Grade>> GetByAccomodationId(Guid id) =>
            await _gradeService.GetAllByAccomodationIdAsync(id);
        
        [AllowAnonymous]
        [HttpGet("getByGuest/{id}")]
        public async Task<List<Grade>> GetByGuestId(Guid id) =>
            await _gradeService.GetAllByGuestIdAsync(id);
        
        [AllowAnonymous]
        [HttpDelete("deleteGrade/{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var hostGrade = await _gradeService.GetGradeByIdAsync(id);

            if (hostGrade is null)
                return NotFound();

            await _gradeService.DeleteAsync(id);

            return NoContent();
        }
        
        [AllowAnonymous]
        [HttpPut("updateGrade/{id}")]
        public async Task<IActionResult> Update(Guid id, Grade updateHostGrade)
        {
            if (!updateHostGrade.Validate())
                return BadRequest();

            var hostGrade = await _gradeService.GetGradeByIdAsync(id);

            if (hostGrade is null)
                return NotFound();

            updateHostGrade.Id = hostGrade.Id;

            await _gradeService.UpdateAsync(id, updateHostGrade);

            return NoContent();
        }
        [AllowAnonymous]
        [HttpGet("allGrade")]
        public async Task<List<Grade>> Get() =>
            await _gradeService.GetAllAsync();
        
        [AllowAnonymous]
        [HttpPost("grade")]
        public async Task<IActionResult> Create(Grade newHostGrade)
        {
            if(!newHostGrade.Validate())
                return BadRequest();

            await _gradeService.CreateAsync(newHostGrade);
            return CreatedAtAction(nameof(Get), new { id = newHostGrade.Id }, newHostGrade);
        }
    }
}
