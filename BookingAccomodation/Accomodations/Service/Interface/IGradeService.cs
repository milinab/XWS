using Accomodations.Model;

namespace Accomodations.Service.Interface;

public interface IGradeService
{
    Task<List<Grade>> GetAllAsync();
    Task CreateAsync(Grade newHostGrade);
    Task UpdateAsync(Guid id, Grade updateHostGrade);
    Task DeleteAsync(Guid id);
    Task<Grade> GetGradeByIdAsync(Guid id);
    Task<List<Grade>> GetAllByAccomodationIdAsync(Guid hostId);
    Task<List<Grade>> GetAllByGuestIdAsync(Guid guestId);

}