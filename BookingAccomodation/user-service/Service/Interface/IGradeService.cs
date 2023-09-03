using user_service.Model;

namespace user_service.Service.Interface;

public interface IGradeService
{
    Task<List<Grade>> GetAllAsync();
    Task CreateAsync(Grade newHostGrade);
    Task UpdateAsync(Guid id, Grade updateHostGrade);
    Task DeleteAsync(Guid id);
    Task<Grade> GetGradeByIdAsync(Guid id);
}