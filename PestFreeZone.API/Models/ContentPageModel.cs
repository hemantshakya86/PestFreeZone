namespace PestFreeZone.API.Models
{
    public class ContentPageModel
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string SubTitle { get; set; }
        public required string Description { get; set; }
    }
}
