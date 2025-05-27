using Microsoft.AspNetCore.Mvc;
using PestFreeZone.API.Models;
using PestFreeZone.API.Services;

namespace PestFreeZone.API.Controllers
{
    [ApiController]
    
    [Route("[controller]")]
    public class ContentPageController : ControllerBase
    {

     
        private readonly IContentService _contentService;
        private readonly ILogger<ContentPageController> _logger;

        public ContentPageController(ILogger<ContentPageController> logger, IContentService contentService)
        {
            _logger = logger;
            _contentService = contentService;
        }

        [HttpGet(Name = "GetContentPage")]
        public async Task<IActionResult> GetAllContnet()
        {
            var items = await _contentService.GetAllContent();
            return Ok(items); // Wrap the result in Ok() to return a proper IActionResult
        }
        [HttpPost(Name = "postcontent")]
        public async Task<IActionResult> Post([FromBody] ContentPageModel model)
        {
            return Ok(await _contentService.AddContent(model));
        }
        [HttpGet]
        public async Task<IActionResult> GetContnet(int id)
        {
            var item = await _contentService.GetContentById(id); // Assuming a method to fetch content by ID exists
            if (item == null)
            {
                return NotFound(); // Return 404 if the item is not found
            }
            return Ok(item); // Wrap the result in Ok() to return a proper IActionResult
        }
    }
}
