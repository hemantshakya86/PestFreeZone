using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PestFreeZone.API.Data;
using PestFreeZone.API.Domain;
using PestFreeZone.API.Services;

namespace PestFreeZone.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {

        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };
        private readonly IContentService _contentService;
        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IContentService contentService)
        {
            _logger = logger;
            _contentService = contentService;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public async Task<List<ContentPage>> Get()
        {
            var items = await _contentService.GetAllContnet();
            return items;
        }
        [HttpPost(Name = "postcontent")]
        public async Task<IActionResult> Post([FromBody] ContentPage contentPage)
        {
            return Ok(await _contentService.AddCotnet(contentPage));
        }
    }
}
