namespace user_service.Model
{
    public class UserDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string UserCollectionName { get; set; } = null!;
        public string HostGradeCollectionName { get; set; } = null!;
    }
}
