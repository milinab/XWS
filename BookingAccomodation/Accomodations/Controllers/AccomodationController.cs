using Accomodations.Model;
using Accomodations.Service;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Accomodations.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccomodationController : ControllerBase
    {

        private readonly AccomodationService _service;
        private readonly IMapper _mapper;

        public AccomodationController(AccomodationService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
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

    }
}
