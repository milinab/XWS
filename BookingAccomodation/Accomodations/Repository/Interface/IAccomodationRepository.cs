using Accomodations.Model;

namespace Accomodations.Repository.Interface
{
    public interface IAccomodationRepository
    {
        Task<IEnumerable<Accomodation>> GetAllAsync();
        Task CreateAsync(Accomodation accomodation);
        Task<Accomodation> GetAccomodationById(Guid id);
        Task DeleteAllWithHostId(Guid id);
    }
}
