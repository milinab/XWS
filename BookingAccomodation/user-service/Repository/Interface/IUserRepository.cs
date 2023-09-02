using user_service.Model;

namespace user_service.Repository.Interface
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task CreateAsync(User user);
        Task<User> UpdateUser(User user);

    }
}
