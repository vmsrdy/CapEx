using Microsoft.AspNetCore.Mvc;

namespace capexfeedback.Server.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class FeedbackController : ControllerBase
    {

        private static readonly string[] Summaries = new[]
       {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };
        private readonly ILogger<FeedbackController> _logger;
        public FeedbackController(ILogger<FeedbackController> logger)
        {
            _logger = logger;
        }


        [HttpGet(Name = "Getfeedbackdata")]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

    }
}
