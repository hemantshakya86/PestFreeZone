using PestFreeZone.API.Domain;
using PestFreeZone.API.Models;

namespace PestFreeZone.API.Services
{
    public interface IContentService
    {
        Task<List<ContentPageModel>> GetAllContent();
        Task<bool> AddContent(ContentPageModel model);
        Task<ContentPageModel> GetContentById(int id);
        Task<bool> ContentUpdate(ContentPageModel model);
    }
}
