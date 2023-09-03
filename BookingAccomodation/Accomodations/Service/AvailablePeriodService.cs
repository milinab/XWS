using Accomodations.ProtoServices;
using reservation_service.Model;
using reservation_service.Repository;

namespace reservation_service.Service;

public class AvailablePeriodService
{
    private readonly AvailablePeriodRepository _availablePeriodRepository;
    private readonly AccomodationAvailableService _accomodationAvailableService;
    
    public AvailablePeriodService(AvailablePeriodRepository availablePeriodRepository,
        AccomodationAvailableService accomodationAvailableService)
    {
        _availablePeriodRepository = availablePeriodRepository;
        _accomodationAvailableService = accomodationAvailableService;
    }
    
    public bool Create(AvailablePeriod availablePeriod)
    {
        if (!IsDateCorrect(availablePeriod.Start, availablePeriod.End))
        {
            return false;
        }
        if (!IsAvailablePeriodValidForAdd(availablePeriod))
        {
            return false;
        }

        _availablePeriodRepository.CreateAsync(availablePeriod);
        return true;
    }

    private bool IsAvailablePeriodValidForAdd(AvailablePeriod availablePeriod)
    {
        var availablePeriods = _availablePeriodRepository.GetByAccommodationId(availablePeriod.AccomodationId);
            
        foreach (var ap in availablePeriods)
        {
            if (!ArePeriodsNotOverlapping(availablePeriod.Start, availablePeriod.End, ap.Start, ap.End))
            {
                return false;
            }
        }

        return true;
    }
    
    private bool ArePeriodsNotOverlapping(DateTime start, DateTime end, DateTime start1, DateTime end1)
    {
        return start < start1 && end < start1 || start > end1 && end > end1;
    }
    
    public async Task<bool>  Edit(AvailablePeriod availablePeriod)
    {
        if (!IsDateCorrect(availablePeriod.Start, availablePeriod.End))
        {
            return false;
        }
        
        if (!_accomodationAvailableService.IsAccAvailable(availablePeriod.AccomodationId.ToString(), availablePeriod.Start.ToString(), availablePeriod.End.ToString()))
        {
            return false;
        }

        if (!IsAvailablePeriodValidForEdit(availablePeriod))
        {
            return false;
        }

        var AvailablePeriod2 = _availablePeriodRepository.GetByIdAsync(availablePeriod.Id).Result;

        if (AvailablePeriod2 == null)
        {
            return false;
        }

        var availablePeriod1 = AvailablePeriod2;

        availablePeriod1.Start = availablePeriod.Start;
        availablePeriod1.End = availablePeriod.End;
        availablePeriod1.Price = availablePeriod.Price;
        availablePeriod1.Type = availablePeriod.Type;

        await _availablePeriodRepository.UpdateAsync(availablePeriod1); //(availablePeriod1).Wait();

        return true;
    }

    public bool IsDateCorrect(DateTime startDate, DateTime endDate)
    {
        if (startDate > DateTime.Now && startDate < endDate)
        {
            return true;
        }
        return false;
        
    }
    
    private bool IsAvailablePeriodValidForEdit(AvailablePeriod availablePeriod)
    {
        List<AvailablePeriod> availablePeriods = _availablePeriodRepository.GetByAccommodationId(availablePeriod.AccomodationId);

        foreach (var ap in availablePeriods)
        {
            if (!ArePeriodsNotOverlapping(availablePeriod.Start, availablePeriod.End, ap.Start, ap.End) &&
                availablePeriod.Id != ap.Id)
            {
                return false;
            }
        }

        return true;
    }
    
    
}