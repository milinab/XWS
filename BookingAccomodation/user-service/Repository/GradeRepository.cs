using Microsoft.Extensions.Options;
using MongoDB.Driver;
using user_service.Model;
using user_service.Repository.Interface;

namespace user_service.Repository;

public class GradeRepository : IGradeRespository
{
    private readonly IMongoCollection<Grade> _hostGradeCollection;

    public GradeRepository(IOptions<UserDatabaseSettings> userDatabaseSettings)
    {
        var mongoClient = new MongoClient(userDatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(userDatabaseSettings.Value.DatabaseName);
        _hostGradeCollection = mongoDatabase.GetCollection<Grade>(userDatabaseSettings.Value.HostGradeCollectionName);
    }
    
    public async Task<List<Grade>> GetAllAsync() =>
    await _hostGradeCollection.Find(_ => true).ToListAsync();
    

    public async Task CreateAsync(Grade newHostGrade) =>
        await _hostGradeCollection.InsertOneAsync(newHostGrade);

    public async Task DeleteAsync(Guid id) =>
        await _hostGradeCollection.DeleteOneAsync(x => x.Id == id);

    public async Task UpdateAsync(Guid id, Grade updateHostGrade) =>  
        await _hostGradeCollection.ReplaceOneAsync(x => x.Id == id, updateHostGrade);
    public async Task<List<Grade>> GetAllByHostIdAsync(Guid hostId) =>
        await _hostGradeCollection.Find(x => x.HostId == hostId).ToListAsync();
    
    public async Task<List<Grade>> GetAllByGuestIdAsync(Guid guestId) =>
        await _hostGradeCollection.Find(x => x.GuestId == guestId).ToListAsync();

    public async Task<Grade> GetGradeByIdAsync(Guid id) =>
        await _hostGradeCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
}