using user_service.Model;
using user_service.Repository;
using user_service.Service.Interface;

namespace user_service.Service;

public class GradeService : IGradeService
{
    private readonly GradeRepository _gradeRepository;

    public GradeService(GradeRepository repository)
    {
        _gradeRepository = repository;
    }
    public async Task CreateAsync(Grade newHostGrade) =>
        await _gradeRepository.CreateAsync(newHostGrade);

    public async Task DeleteAsync(Guid id) =>
        await _gradeRepository.DeleteAsync(id);

    public async Task<List<Grade>> GetAllAsync() =>
        await _gradeRepository.GetAllAsync();
    public async Task UpdateAsync(Guid id, Grade updateHostGrade) =>
        await _gradeRepository.UpdateAsync(id, updateHostGrade);

    public async Task<Grade> GetGradeByIdAsync(Guid id) =>
        await _gradeRepository.GetGradeByIdAsync(id);
}