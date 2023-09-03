using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace reservation_service.Model
{
    public enum TypeOfPrice
    {
        ByGuest,
        ByAccomodationUnit
    }

    public class AvailablePeriod
    {
        [BsonRepresentation(BsonType.String)] public Guid Id { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public int Price { get; set; }
        public TypeOfPrice Type { get; set; }
        [BsonRepresentation(BsonType.String)] public Guid AccomodationId { get; set; }
    }
}