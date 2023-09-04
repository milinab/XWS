using account_service.Authorization;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver.Core.Operations;
using user_service.Helpers;
using user_service.Model;
using user_service.Repository;
using user_service.Service;

namespace user_service.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly GradeService _gradeService;
        private readonly UserService _userService;
        private readonly IMapper _mapper;
        private readonly AppSettings _appSettings;


        public UserController(UserService userService, IMapper mapper, IOptions<AppSettings> appSettings, GradeService gradeService)
        {
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
            _gradeService = gradeService;
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
        [HttpGet("getByHost/{id}")]
        public async Task<List<Grade>> GetByHostId(Guid id) =>
            await _gradeService.GetAllByHostIdAsync(id);
        
        [AllowAnonymous]
        [HttpGet("getByGuest/{id}")]
        public async Task<List<Grade>> GetByGuestId(Guid id) =>
            await _gradeService.GetAllByGuestIdAsync(id);
    }
}