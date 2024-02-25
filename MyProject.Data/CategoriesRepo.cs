using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Data
{
    public class CategoriesRepo
    {
        private string _connectionString;
        public CategoriesRepo(string connectionString)
        {
            _connectionString = connectionString;
        }
        public List<Category> AllCategories()
        {
            var ctx = new MyProjectDbContext(_connectionString);
            return ctx.Categories.ToList();
        }
    }
}
