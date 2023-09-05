using Accomodations.Model;
using Accomodations.Repository;
using Accomodations.Service.Interface;

namespace Accomodations.Service;

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
    
    public async Task<List<Grade>> GetAllByAccomodationIdAsync(Guid hostId) =>
        await _gradeRepository.GetAllByAccomodationIdAsync(hostId);
    
    public async Task<List<Grade>> GetAllByGuestIdAsync(Guid guestId) =>
        await _gradeRepository.GetAllByGuestIdAsync(guestId);
}