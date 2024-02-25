using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Data
{
    public class ProductsRepo
    {
        private string _connectionString;
        public ProductsRepo(string connectionString)
        {
            _connectionString = connectionString;
        }
        public List<Product> AllProducts()
        {
            var ctx = new MyProjectDbContext(_connectionString);
            return ctx.Products.ToList();
        }
        public List<Product> ProductsByCategory(int categoryId)
        {
            var ctx = new MyProjectDbContext(_connectionString);
            return ctx.Products.Where(p => p.CategoryId == categoryId).ToList();
        }
        public Product ProductById(int productId)
        {
            var ctx = new MyProjectDbContext(_connectionString);
            return ctx.Products.FirstOrDefault(p => p.Id == productId);
        }
        
    }
}
