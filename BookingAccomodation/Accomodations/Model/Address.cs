using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Accomodations.Model
{
    public class Address
    {
        [BsonRepresentation(BsonType.String)]
        public Guid Id { get; set; }
        public String StreetName { get; set; }
        public String StreetNumber { get; set; }
        public String PostalCode { get; set; }
        public String City { get; set; }
        public String Country { get; set; }
    }
}
