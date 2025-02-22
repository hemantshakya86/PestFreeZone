
namespace PestFreeZone.API.Domain
{
    public class ContentPage : BaseEntity
    {
        public string Title { get; set; } = null!;
        public  string SubTitle { get; set; } = null!;
        public  string Description { get; set; } = null!;
    }
}
