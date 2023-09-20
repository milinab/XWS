using Accomodations.Model;

namespace Accomodations.Repository.Interface;

public interface IGradeRespository
{
    Task<List<Grade>> GetAllAsync();
    Task CreateAsync(Grade newHostGrade);
    Task UpdateAsync(Guid id, Grade updateAccomodationGrade);
    Task<Grade> GetGradeByIdAsync(Guid id);
    Task DeleteAsync(Guid id);
    Task<List<Grade>> GetAllByAccomodationIdAsync(Guid hostId);
    Task<List<Grade>> GetAllByGuestIdAsync(Guid guestId);

}