namespace Accomodations.Dtos;

public class SearchDto
{
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public String City { get; set; }
    public int NumberOfGuests { get; set; }
}