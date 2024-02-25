using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Data
{
    public class CartRepo
    {
        private string _connectionString;
        public CartRepo(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddToCart(int currentUserId, int productId, int amount)
        {
            using var ctx = new MyProjectDbContext(_connectionString);
            ctx.CartItems.Add(new()
            {
                UserId = currentUserId,
                ProductId = productId,
                Amount = amount,
                SavedForLater = false
            });
            ctx.SaveChanges();
        }
        public List<CartItem> MyCart(int userId)
        {
            using var ctx = new MyProjectDbContext(_connectionString);
            return ctx.CartItems.Include(c => c.Product).Where(c => c.UserId == userId).ToList();
        }
        public void UpdateCartItem(CartItem cartItem)
        {
            using var ctx = new MyProjectDbContext(_connectionString);
            ctx.Update(cartItem);
            ctx.SaveChanges();
        }
        public void DeleteCartItem(int userId, int productId)
        {
            using var ctx = new MyProjectDbContext(_connectionString);
            ctx.Database.ExecuteSqlInterpolated($"DELETE FROM CartItems WHERE UserId = {userId} AND ProductId = {productId}");
            ctx.SaveChanges();
        }
    }
}
