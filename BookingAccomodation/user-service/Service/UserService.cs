using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using user_service.Authorization;
using user_service.Helpers;
using user_service.Model;
using user_service.Repository;
using user_service.Service.Interface;


namespace user_service.Service
{
    public class UserService : IUserService
    {
        private readonly UserRepository _userRepository;
        private readonly IJwtUtils _jwtUtils;
        private readonly IMapper _mapper;

        public UserService(UserRepository userRepository, IJwtUtils jwtUtils, IMapper mapper)
        {
            _userRepository = userRepository;
            _jwtUtils = jwtUtils;
            _mapper = mapper;
        }

        public async Task<IEnumerable<User>> GetAllAsync() =>
            await _userRepository.GetAllAsync();

        public async Task CreateAsync(User user)
        {
            await _userRepository.CreateAsync(user);
        }

        public async Task<AuthenticateResponse> Authenticate(AuthenticateRequest model)
        {
            var user = await _userRepository.FindByUsernameAsync(model.Username);

            // validate
            if (user == null || !await Task.Run(() => BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash)))
            {
                throw new AppException("Username or password is incorrect");
                
            }

            // authentication successful
            var response = _mapper.Map<AuthenticateResponse>(user);
            response.Token = _jwtUtils.GenerateToken(user);
            return response;
        }

        public async Task Register(RegisterRequest model)
        {
            // validate
            var existingUser = await _userRepository.FindByUsernameAsync(model.Username);

            if (existingUser != null)
            {
                throw new AppException("Username '" + model.Username + "' is already taken");
            }

            // map model to new user object
            var user = _mapper.Map<User>(model);

            // hash password
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password);

            // save user
            await _userRepository.CreateAsync(user);
        }

        public async Task EditUser(Guid id, EditUserDto editUserDto)
        {
            if (editUserDto == null)
            {
                throw new AppException("Faulty edit information");
            }

            var existingUser = await _userRepository.GetByIdAsync(id);

            if (existingUser == null)
            {
                throw new AppException("User doesn't exist");
            }

            // Update the user's information based on the DTO.
            existingUser.FirstName = editUserDto.FirstName;
            existingUser.LastName = editUserDto.LastName;
            existingUser.Username = editUserDto.Username;

            // Update the user in the repository.
            
            await _userRepository.UpdateUser(existingUser);

        }

        public async Task<User> ChangePassword(Guid id, PasswordRequest passwordRequest)
        {
            if (passwordRequest.Password == "")
            {
                throw new AppException("Password not allowed");
            }

            var existingUser = await _userRepository.GetByIdAsync(id);

            if (existingUser == null)
            {
                throw new AppException("User doesn't exist ");
            }

            // Update the user's information based on the DTO.
            existingUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword(passwordRequest.Password);

            // Update the user in the repository.

            return await _userRepository.UpdateUser(existingUser);

        }


        public async Task<User> GetByIdAsync(Guid id) =>
        await _userRepository.GetByIdAsync(id);

        public Task DeleteUser(Guid id)
        {
            return  _userRepository.DeleteUserByIdAsync(id);
        }
    }
}