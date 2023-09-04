using Accomodations.Model;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using reservation_service.Model;
using reservation_service.Repository.Interface;

namespace reservation_service.Repository;

public class AvailablePeriodRepository : IAvailablePeriodRepository
{

    private readonly IMongoCollection<AvailablePeriod> _availablePeriodCollection;

    public AvailablePeriodRepository(IOptions<AccomodationDatabaseSettings> accomodationDatabaseSettings)
    {
        var mongoClient = new MongoClient(accomodationDatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(accomodationDatabaseSettings.Value.DatabaseName);
        _availablePeriodCollection =
            mongoDatabase.GetCollection<AvailablePeriod>(accomodationDatabaseSettings.Value
                .AvailablePeriodCollectionName);
    }

    public async Task<List<AvailablePeriod>> GetAllAsync() =>
        await _availablePeriodCollection.Find(_ => true).ToListAsync();

    public async Task<AvailablePeriod> GetByIdAsync(Guid id) =>
        await _availablePeriodCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
    
    public async Task<AvailablePeriod> GetByAccomodationIdAsync(Guid id) =>
        await _availablePeriodCollection.Find(x => x.AccomodationId == id).FirstOrDefaultAsync();


    public async Task CreateAsync(AvailablePeriod newAvalablePeriod) =>
        await _availablePeriodCollection.InsertOneAsync(newAvalablePeriod);

    public List<AvailablePeriod> GetByAccommodationId(Guid accommodationId)
    {
        // var filter = Builders<AvailablePeriod>.Filter.Eq(ap => ap.accomodationId, accommodationId);
        // var availablePeriods =  _availablePeriodCollection.Find(filter).ToList();
        var availablePeriods = _availablePeriodCollection.Find(x => x.AccomodationId == accommodationId).ToList();
        return availablePeriods;
    }

    // public async Task UpdateAsync(AvailablePeriod updateAvailablePeriod) =>
    //     await _availablePeriodCollection.UpdateOneAsync(x => x.AccomodationId == updateAvailablePeriod.AccomodationId, updateAvailablePeriod);

    public async Task UpdateAsync(AvailablePeriod availablePeriod)
    {
        var update = Builders<AvailablePeriod>.Update.Set(r => r.Start, availablePeriod.Start)
            .Set(r => r.End, availablePeriod.End)
            .Set(r => r.Price, availablePeriod.Price)
            .Set(r => r.Type, availablePeriod.Type);
        await _availablePeriodCollection.UpdateOneAsync(r => r.Id == availablePeriod.Id, update);
    }
}