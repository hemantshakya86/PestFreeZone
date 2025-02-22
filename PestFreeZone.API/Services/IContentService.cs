using PestFreeZone.API.Domain;

namespace PestFreeZone.API.Services
{
    public interface IContentService
    {
        Task<List<ContentPage>> GetAllContnet();
        Task<bool> AddCotnet(ContentPage contentPage);
    }
}
