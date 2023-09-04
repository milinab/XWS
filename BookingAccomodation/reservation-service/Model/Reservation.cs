using System.ComponentModel.DataAnnotations;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace reservation_service.Model
{
    public enum ReservationStatus
    {
        Active,
        Pending,
        Canceled
    }
    
    public class Reservation
    {
        [BsonRepresentation(BsonType.String)]
        public Guid Id { get; set; }
        public DateTime Created { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        [BsonRepresentation(BsonType.String)]
        public Guid AccomodationId { get; set; }
        public string hostId { get; set; }
        public string GuestUsername { get; set; }
        public string GuestId { get; set; }
        
        public ReservationStatus Status { get; set; }
        public Reservation()
        {
            Created = DateTime.Now;
            Status = ReservationStatus.Pending;
        }

    }

}
