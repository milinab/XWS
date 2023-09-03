using account_service.Authorization;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver.Core.Operations;
using user_service.Helpers;
using user_service.Model;
using user_service.ProtoServices;
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
        private readonly CheckRemovalEligibility _checkRemovalEligibility;


        public UserController(UserService userService, IMapper mapper, IOptions<AppSettings> appSettings, CheckRemovalEligibility checkRemovalEligibility)
        {
            _userService = userService;
            _checkRemovalEligibility = checkRemovalEligibility;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpGet("get/{id}")]
        public async Task<User> GetUser(Guid id)
        {
            var user = await _userService.GetByIdAsync(id);
            return _mapper.Map<User>(user);
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
        public async Task<IActionResult> Authenticate(AuthenticateRequest model)
        {
            var response = await _userService.Authenticate(model);
            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register(RegisterRequest model)
        {
            _userService.Register(model).Wait(); // Wait for the async method to complete
            return Ok(new { message = "Registration successful" });
        }
        [AllowAnonymous]
        [HttpPost("{id}")]
        public async Task<IActionResult> EditUser(Guid id, [FromBody] EditUserDto editUserDto)
        {
            await _userService.EditUser(id, editUserDto); 
            return Ok(new { message = "Updated information successfully"});
        }
        [AllowAnonymous]
        [HttpPost("change-password/{id}")]
        public async Task<IActionResult> ChangePassword(Guid id, [FromBody] PasswordRequest password)
        {
            await _userService.ChangePassword(id, password);
            return Ok(new { message = "Updated information successfully" });
        }
        
        [AllowAnonymous]
        [HttpGet("delete/{id}")]
        public async Task<IActionResult> GetBool(Guid id)
        {
            var isEligible = _checkRemovalEligibility.CheckEligibility(id);
            if (isEligible)
            {
                await _userService.DeleteUser(id);
                return Ok(new { message = "Deleted user successfully" });
            }
            else
            {
                return NotFound(new { message = "User not found or not eligible for deletion" });
            }
        }
    }
}