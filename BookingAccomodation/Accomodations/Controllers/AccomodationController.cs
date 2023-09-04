using Accomodations.Dtos;
using Accomodations.Model;
using Accomodations.ProtoServices;
using Accomodations.Service;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using reservation_service;

namespace Accomodations.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccomodationController : ControllerBase
    {

        private readonly AccomodationService _service;
        private readonly IMapper _mapper;
        private readonly AccomodationAvailableService accomodationAvailableService;

        public AccomodationController(AccomodationService service, IMapper mapper, AccomodationAvailableService accomodationAvailableService)
        {
            _service = service;
            _mapper = mapper;
            this.accomodationAvailableService = accomodationAvailableService;
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
        public async Task<IEnumerable<Accomodation>> IsAccomodationAvailable(SearchDto searchRequest)
        {
            List<Accomodation> accomodations = _service.checkCityAndNumberOfGuests(searchRequest);
            if (accomodations.Count == 0)
            {
                return Array.Empty<Accomodation>();
            }

            List<Accomodation> results = new List<Accomodation>();

            foreach (var accomodation in accomodations)
            {
                var isAccAvailable = accomodationAvailableService.IsAccAvailable(
                    accomodation.Id.ToString(), 
                    searchRequest.StartDate.ToString(),
                    searchRequest.EndDate.ToString());

                if (isAccAvailable)
                {
                    results.Add(accomodation);
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

    }
}
