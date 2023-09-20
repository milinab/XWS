using Accomodations.Model;

namespace Accomodations.Service.Interface
{
    public interface IAccomodationService
    {
        Task<IEnumerable<Accomodation>> GetAllAsync();
        Task CreateAsync(Accomodation newAccomodation);
        Task<Accomodation> GetAccomodationById(Guid id);
    }
}
