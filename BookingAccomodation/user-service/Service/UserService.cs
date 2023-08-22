using user_service.Model;
using user_service.Repository;
using user_service.Service.Interface;

namespace user_service.Service
{
    public class UserService : IUserService
    {
        private readonly UserRepository _userRepository;

        public UserService(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<User>> GetAllAsync() =>
            await _userRepository.GetAllAsync();

        public async Task CreateAsync(User user)
        {
            await _userRepository.CreateAsync(user);
        }
    }
}
