using user_service.Model;

namespace user_service.Repository.Interface;

public interface IGradeRespository
{
    Task<List<Grade>> GetAllAsync();
    Task CreateAsync(Grade newHostGrade);
    Task UpdateAsync(Guid id, Grade updateHostGrade);
    Task<Grade> GetGradeByIdAsync(Guid id);
    Task DeleteAsync(Guid id);

}