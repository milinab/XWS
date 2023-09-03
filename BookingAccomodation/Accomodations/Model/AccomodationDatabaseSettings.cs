namespace Accomodations.Model
{
    public class AccomodationDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string AccomodationsCollectionName { get; set; } = null!;
        public string AccomodationGradesCollectionName { get; set; } = null!;
        public string AvailablePeriodCollectionName { get; set; } = null!;
    }
}
