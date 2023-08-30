using account_service.Authorization;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver.Core.Operations;
using user_service.Helpers;
using user_service.Model;
using user_service.Service;

namespace user_service.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly IMapper _mapper;
        private readonly AppSettings _appSettings;


        public UserController(UserService userService, IMapper mapper, IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
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

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _userService.Authenticate(model);
            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register(RegisterRequest model)
        {
            _userService.Register(model).Wait(); // Wait for the async method to complete
            return Ok(new { message = "Registration successful" });
        }
    }
}