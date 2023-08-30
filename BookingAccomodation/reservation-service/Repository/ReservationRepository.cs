﻿using Microsoft.Extensions.Options;
using MongoDB.Driver;
using reservation_service.Model;
using reservation_service.Repository.Interface;

namespace reservation_service.Repository
{
    public class ReservationRepository : IReservationRepository
    {
        private readonly IMongoCollection<Reservation> _reservationsCollection;

        public ReservationRepository(IOptions<ReservationsDatabaseSettings> reservationsDatabaseSettings)
        {
            var mongoClient = new MongoClient(reservationsDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(reservationsDatabaseSettings.Value.DatabaseName);
            _reservationsCollection = mongoDatabase.GetCollection<Reservation>(reservationsDatabaseSettings.Value.ReservationsCollectionName);
        }
        public async Task<List<Reservation>> GetAllAsync() =>
            await _reservationsCollection.Find(_ => true).ToListAsync();

        public async Task<Reservation> GetByIdAsync(Guid id) =>
            await _reservationsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Reservation newReservation) =>
    await _reservationsCollection.InsertOneAsync(newReservation);

    }
}