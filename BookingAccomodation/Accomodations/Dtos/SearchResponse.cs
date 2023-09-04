using reservation_service.Model;

namespace Accomodations.Model;

public class SearchResponse
{
    public Accomodation Accomodation { get; set; }

    public AvailablePeriod AvailablePeriod { get; set; }
}