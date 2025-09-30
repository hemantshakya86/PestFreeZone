using Microsoft.AspNetCore.Mvc;
using PestFreeZone.API.Data;
using PestFreeZone.API.Domain;
using PestFreeZone.API.Models;
using PestFreeZone.API.Services;

namespace PestFreeZone.API.Controllers
{
    [ApiController]

    [Route("content")]
    public class ContentPageController : ControllerBase
    {


        private readonly IContentService _contentService;
        private readonly ApplicationDbContext _db;
        private readonly ILogger<ContentPageController> _logger;

        public ContentPageController(ApplicationDbContext db, ILogger<ContentPageController> logger, IContentService contentService)
        {
            _db = db;
            _logger = logger;
            _contentService = contentService;
        }

        [HttpGet(Name = "GetContentPage")]
        public async Task<IActionResult> GetAllContnet()
        {
            try
            {
                var items = await _contentService.GetAllContent();
                if (items == null)
                {
                    _logger.LogDebug("No content found in the database."); // Log an error if no content is found
                }
                return Ok(items); // Wrap the result in Ok() to return a proper IActionResult

            }
            catch (Exception ex)
            {
                _logger.LogError("An error occurred while fetching content. StackTrace: {StackTrace}", ex.StackTrace); // Log the error with a named placeholder
                throw;
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContent(int id, [FromBody] ContentPageModel model)
        {
            if (id != model.Id)
            {
                return BadRequest("Id in URL and model do not match.");
            }

            var result = await _contentService.ContentUpdate(model);
            if (!result)
            {
                return NotFound(); // Agar content nahi mila toh 404
            }
            return Ok(true); // Update successful
        }

        [HttpGet("slides")]
        public IActionResult GetSlides()
        {
            var sliders = _db.ContentPages?.Where(s => s.IsSlider == true).OrderBy(s=>s.Id).Select(x => new ContentPageModel
            {
                Description = x.Description,
                SubTitle = x.SubTitle,
                Title = x.Title,
                Id = x.Id
            }).ToList();

            if (sliders == null || !sliders.Any())
            {
                return NotFound("No sliders found.");
            }
            return Ok(sliders);
        }




        [HttpPost(Name = "postcontent")]
        public async Task<IActionResult> Post([FromBody] ContentPageModel model)
        {
            return Ok(await _contentService.AddContent(model));
        }
        [HttpGet("{id}")]
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
