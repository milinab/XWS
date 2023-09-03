using reservation_service.Model;

namespace reservation_service.Repository.Interface;

public interface IAvailablePeriodRepository
{
    Task<List<AvailablePeriod>> GetAllAsync();
    Task<AvailablePeriod> GetByIdAsync(Guid id);
    Task CreateAsync(AvailablePeriod newAvalablePeriod);
    Task UpdateAsync(AvailablePeriod newAvalablePeriod);

}