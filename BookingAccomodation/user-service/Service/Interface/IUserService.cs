using user_service.Model;

namespace user_service.Service.Interface
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task CreateAsync(User user);
    }
}
