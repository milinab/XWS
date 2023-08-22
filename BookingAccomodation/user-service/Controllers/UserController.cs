using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using user_service.Model;
using user_service.Service;

namespace user_service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly IMapper _mapper;

        public UserController(UserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _userService.GetAllAsync();
            return _mapper.Map<IEnumerable<User>>(users);
        }

        [HttpPost]
        public async Task<ActionResult<User>> CreateAsync(User user)
        {
            //var accomodationModel = _mapper.Map<Accomodation>(accomodationCreateDto);

            //return CreatedAtRoute(nameof(GetAccomodationById), new { id = accomodationModel.Id }, accomodationModel);
            await _userService.CreateAsync(user);
            return CreatedAtAction(nameof(GetUsers), new { id = user.Id }, user);
        }
    }
}
