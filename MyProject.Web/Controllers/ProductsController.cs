using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyProject.Data;
using MyProject.Web.ViewModels;

namespace MyProject.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private string _connectionString;
        public ProductsController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("allproducts")]
        public List<Product> AllProducts()
        {
            var repo = new ProductsRepo(_connectionString);
            return repo.AllProducts();
        }

        [HttpGet]
        [Route("bycategory")]
        public List<Product> ProductsByCategory(int categoryId)
        {
            var repo = new ProductsRepo(_connectionString);
            return repo.ProductsByCategory(categoryId);
        }

        [HttpGet]
        [Route("byid")]
        public Product ProductsById(int productId)
        {
            var repo = new ProductsRepo(_connectionString);
            return repo.ProductById(productId);
        }

    }
}
