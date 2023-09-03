using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Accomodations.Model
{
    public class Address
    {
        [BsonRepresentation(BsonType.String)]
        public Guid Id { get; set; }
        public String StreetName { get; set; }
        private String StreetNumber { get; set; }
        private String PostalCode { get; set; }
        public String City { get; set; }
        private String Country { get; set; }
    }
}
