using PestFreeZone.API.Data;
using PestFreeZone.API.Domain;
using PestFreeZone.API.Models;
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

        public async Task<bool> AddContent(ContentPageModel model)
        {
            // Correct initialization
            ContentPage contentPage = new ContentPage
            {
                Id = model.Id,
                Title = model.Title,
                SubTitle = model.SubTitle,
                Description = model.Description,
                IsSlider = model.IsSlider,

            }; 
        
            
            // Adding the new content
            await _contentRepository.AddAsync(contentPage);
            await _unitOfWork.CommitChanges();
            return true;
        }

        public async Task<bool> ContentUpdate(ContentPageModel model)
        {
            var contentPage = await _contentRepository.GetByIdAsync(model.Id);
            if (contentPage == null)
            {
                return false;
            }
            contentPage.Title = model.Title;
            contentPage.SubTitle = model.SubTitle;
            contentPage.Description = model.Description;
            contentPage.IsSlider = model.IsSlider;
            await _contentRepository.UpdateAsync(contentPage);
            await _unitOfWork.CommitChanges();
            return true;
        }

        public async Task<List<ContentPageModel>> GetAllContent()
        {
            var contentPages = await _contentRepository.GetAllAsync();
            return contentPages.Select(x => new ContentPageModel
            {
                Description = x.Description,
                SubTitle = x.SubTitle,
                Title = x.Title,
                Id = x.Id
            }).ToList();
        }
        public async Task<ContentPageModel> GetContentById(int id)
        {
            var contentPage = await _contentRepository.GetByIdAsync(id);

            if (contentPage == null)
            {
                throw new Exception("Content objject can not be null.");
            }

            return new ContentPageModel
            {
                Description = contentPage.Description,
                SubTitle = contentPage.SubTitle,
                Title = contentPage.Title,
                Id = contentPage.Id
            };

        }
    }
}