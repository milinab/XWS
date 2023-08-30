﻿using Accomodations.Model;
using Accomodations.Repository;
using Accomodations.Service.Interface;

namespace Accomodations.Service
{
    public class AccomodationService : IAccomodationService
    {
        private readonly AccomodationRepository _repository;

        public AccomodationService(AccomodationRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Accomodation>> GetAllAsync() =>
            await _repository.GetAllAsync();

        public async Task CreateAsync(Accomodation newAccomodation)
        {
            await _repository.CreateAsync(newAccomodation);
        }

        public async Task<Accomodation> GetAccomodationById(Guid id) =>
            await _repository.GetAccomodationById(id);
    }
}