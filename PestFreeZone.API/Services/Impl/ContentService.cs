using PestFreeZone.API.Data;
using PestFreeZone.API.Domain;
using PestFreeZone.API.Services.Repository;

namespace PestFreeZone.API.Services.Impl
{
    public class ContentService : IContentService
    {
        private readonly IRepository<ContentPage> _contentRepository;
        private readonly IUnitOfWork _unitOfWork;
        public ContentService(IUnitOfWork unitOfWork)
        {
            _contentRepository = unitOfWork.Repository<ContentPage>();
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> AddCotnet(ContentPage contentPage)
        {
            await _contentRepository.AddAsync(contentPage);
            await _unitOfWork.CommitChanges();
            return true;
        }

        public async Task<List<ContentPage>> GetAllContnet()
        {
            var contentPages = await _contentRepository.GetAllAsync();

            return contentPages.ToList();
        }
    }
}
