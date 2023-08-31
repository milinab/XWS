namespace Accomodations.Model
{
    public class Address
    {
        public Guid Id { get; set; }
        public String StreetName { get; set; }
        private String StreetNumber { get; set; }
        private String PostalCode { get; set; }
        public String City { get; set; }
        private String Country { get; set; }
    }
}
