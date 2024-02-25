using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Data
{
    public class MyProjectDbContext : DbContext
    {
        private string _connectionString;
        public MyProjectDbContext(string connectionString)
        {
            _connectionString = connectionString;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CartItem>()
                .HasKey(ci => new { ci.UserId, ci.ProductId });
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<OrdersProducts>()
               .HasKey(op => new { op.OrderId, op.ProductId });
            base.OnModelCreating(modelBuilder);
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrdersProducts> OrdersProducts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }

        //maybe add the code that makes you not able to delete parent item that has children
        //figure out when to do json-ignore and if to add the code that mr friedman did once (i think by the jokes app)
    }
}
