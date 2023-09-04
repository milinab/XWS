using Accomodations.Model;
using Accomodations.Repository.Interface;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Accomodations.Repository;

public class GradeRepository : IGradeRespository
{
    private readonly IMongoCollection<Grade> _hostGradeCollection;

    public GradeRepository(IOptions<AccomodationDatabaseSettings> accomodationDatabaseSettings)
    {
        var mongoClient = new MongoClient(accomodationDatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(accomodationDatabaseSettings.Value.DatabaseName);
        _hostGradeCollection = mongoDatabase.GetCollection<Grade>(accomodationDatabaseSettings.Value.AccomodationGradesCollectionName);
    }
    
    public async Task<List<Grade>> GetAllAsync() =>
        await _hostGradeCollection.Find(_ => true).ToListAsync();
    

    public async Task CreateAsync(Grade newHostGrade) =>
        await _hostGradeCollection.InsertOneAsync(newHostGrade);

    public async Task DeleteAsync(Guid id) =>
        await _hostGradeCollection.DeleteOneAsync(x => x.Id == id);

    public async Task UpdateAsync(Guid id, Grade updateHostGrade) =>  
        await _hostGradeCollection.ReplaceOneAsync(x => x.Id == id, updateHostGrade);
    
    public async Task<List<Grade>> GetAllByAccomodationIdAsync(Guid accomodationId) =>
        await _hostGradeCollection.Find(x => x.AccomodationId == accomodationId).ToListAsync();
    
    public async Task<List<Grade>> GetAllByGuestIdAsync(Guid guestId) =>
        await _hostGradeCollection.Find(x => x.GuestId == guestId).ToListAsync();

    public async Task<Grade> GetGradeByIdAsync(Guid id) =>
        await _hostGradeCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
}