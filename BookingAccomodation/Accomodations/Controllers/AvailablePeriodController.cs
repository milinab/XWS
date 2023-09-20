using Microsoft.AspNetCore.Mvc;
using reservation_service.Model;
using reservation_service.Service;

namespace reservation_service.Controllers;

[ApiController]
[Route("api/[controller]")]

public class AvailablePeriodController : ControllerBase
{
    private readonly AvailablePeriodService _availablePeriodService;

    public AvailablePeriodController(AvailablePeriodService availablePeriodService)
    {
        _availablePeriodService = availablePeriodService;
    }

    [HttpPost]
    public IActionResult Create(AvailablePeriod availablePeriod)
    {
        bool success = _availablePeriodService.Create(availablePeriod);
        if (success)
        {
            return Ok(); // 200 OK
        }
        return Conflict(); // 409 Conflict
    }

    [HttpPut]
    public async Task<bool> Update(AvailablePeriod availablePeriod)
    {
        bool success = await _availablePeriodService.Edit(availablePeriod);
        if (success)
        {
            return true;
        }
        return false;
    }
    
    [HttpGet("{id}/GetAvailablePeriodByAccomodationId")]
    public async Task<ActionResult<AvailablePeriod>> GetAvailablePeriodByAccomodationId(Guid id)
    {
        var availablePeriod = await _availablePeriodService.GetAvailablePeriodByAccomodationId(id);
        return availablePeriod;
    }

}