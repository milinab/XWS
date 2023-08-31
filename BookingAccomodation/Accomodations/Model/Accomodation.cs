using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace Accomodations.Model
{
    public class Accomodation
    {

        [Key]
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public Guid Id { get; set; }
        [BsonRepresentation(BsonType.String)]
        public Guid HostId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Address Address { get; set; }
        public Convenience Convenience { get; set; }
        public List<String> Photos { get; set; }
        public int MinNumberOfGuests { get; set; }
        public int MaxNumberOfGuests { get; set; } 
    }
}
