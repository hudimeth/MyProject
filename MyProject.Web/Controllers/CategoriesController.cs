using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyProject.Data;

namespace MyProject.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private string _connectionString;
        public CategoriesController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");       
        }
        [HttpGet]
        [Route("allcategories")]
        public List<Category> AllCategories()
        {
            var repo = new CategoriesRepo(_connectionString);
            return repo.AllCategories();
        }
    }
}
