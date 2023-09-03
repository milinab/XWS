using AutoMapper;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using user_service.Model;
using user_service.Repository.Interface;

namespace user_service.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<User> _userCollection;
        private readonly IMapper _mapper;

        public UserRepository(IOptions<UserDatabaseSettings> userDatabaseSettings, IMapper mapper)
        {
            var mongoClient = new MongoClient(userDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(userDatabaseSettings.Value.DatabaseName);
            _userCollection = mongoDatabase.GetCollection<User>(userDatabaseSettings.Value.UserCollectionName);
            _mapper = mapper;
        }

        public async Task<IEnumerable<Model.User>> GetAllAsync() =>
            await _userCollection.Find(_ => true).ToListAsync();

        public async Task CreateAsync(Model.User user)
        {
            var users = _userCollection.Find(x => x.Id == user.Id).FirstOrDefault();
            await _userCollection.InsertOneAsync(user);
            return;

        }
        public async Task<Model.User> FindByUsernameAsync(string username)
        {
            var filter = Builders<Model.User>.Filter.Eq(x => x.Username, username);
            return await _userCollection.Find(filter).FirstOrDefaultAsync();
        }
        public async Task<User> GetByIdAsync(Guid id)
        {
            var filter = Builders<User>.Filter.Eq(x => x.Id, id);
            return await _userCollection.Find(filter).FirstOrDefaultAsync();
        }
        public async Task<User> UpdateUser(User user)
        {
            await _userCollection.ReplaceOneAsync(u => u.Id == user.Id, user);
            return await _userCollection.Find(u => u.Id == user.Id).FirstOrDefaultAsync();

        }

        public async Task DeleteUserByIdAsync(Guid userId)
        {
            // Create a filter to find the user by their ObjectId (_id).
            var filter = Builders<User>.Filter.Eq(x => x.Id, userId);
            

            // Delete the user that matches the filter asynchronously.
            var result = await _userCollection.DeleteOneAsync(filter);

            if (result.DeletedCount == 1)
            {
                // The user was successfully deleted.
                Console.WriteLine($"User with ID {userId} deleted.");
            }
            else
            {
                // No user with the given ID was found.
                Console.WriteLine($"User with ID {userId} not found.");
            }
        }
    }
    
}
