using user_service.Model;

namespace user_service.Service.Interface
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task CreateAsync(User user);
        Task EditUser(Guid id, EditUserDto editUserDTO);
        Task<User> ChangePassword(Guid id, PasswordRequest passwordRequest);
        Task Register(RegisterRequest model);
        Task<AuthenticateResponse> Authenticate(AuthenticateRequest model);
        Task<User> GetByIdAsync(Guid id);


    }
}
