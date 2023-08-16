using Accomodations.Model;
using Accomodations.Repository.Interface;
using AutoMapper;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Accomodations.Repository
{
    public class AccomodationRepository : IAccomodationRepository
    {
        private readonly IMongoCollection<Model.Accomodation> _accomodationsCollection;
        private readonly IMapper _mapper;

        public AccomodationRepository(IOptions<AccomodationDatabaseSettings> accomodationDatabaseSettings, IMapper mapper)
        {
            var mongoClient = new MongoClient(accomodationDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(accomodationDatabaseSettings.Value.DatabaseName);
            _accomodationsCollection = mongoDatabase.GetCollection<Model.Accomodation>(accomodationDatabaseSettings.Value.AccomodationsCollectionName);
            _mapper = mapper;
        }

        public async Task<IEnumerable<Model.Accomodation>> GetAllAsync() =>
            await _accomodationsCollection.Find(_ => true).ToListAsync();

        public async Task CreateAsync(Model.Accomodation newAccomodation)
        {
            if (newAccomodation == null)
            {
                throw new ArgumentNullException(nameof(newAccomodation));
            }
            var accomodation = _accomodationsCollection.Find(x => x.Name == newAccomodation.Name).FirstOrDefault();
            if (accomodation == null)
            {
                await _accomodationsCollection.InsertOneAsync(newAccomodation);
                return;
            }

            throw new Exception("Accomodation with that name already exists!");

        }
        public async Task<Model.Accomodation> GetAccomodationById(Guid id)
        {
            return await _accomodationsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        }
    }
}
