namespace Accomodations.Dtos
{
    public class AccomodationCreateDto
    {
        public Guid HostId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
