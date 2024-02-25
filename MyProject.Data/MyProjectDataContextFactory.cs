using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Data
{
    public class MyProjectDataContextFactory : IDesignTimeDbContextFactory<MyProjectDbContext>
    {
        public MyProjectDbContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
              .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}MyProject.Web"))
              .AddJsonFile("appsettings.json")
              .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

            return new MyProjectDbContext(config.GetConnectionString("ConStr"));
        }
    }
}
