using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyProject.Data;
using MyProject.Web.ViewModels;

namespace MyProject.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CartController : ControllerBase
    {
        private string _connectionString;

        public CartController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("addtocart")]
        public void AddToCart(AddToCartViewModel vm)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return;
            }
            var currentUserId = GetCurrentUserId();
            var repo = new CartRepo(_connectionString);
            repo.AddToCart(currentUserId, vm.ProductId, vm.Amount);
        }

        [HttpGet]
        [Route("mycart")]
        public List<CartItemViewModel> MyCart()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return new();
            }
            var currentUserId = GetCurrentUserId();
            var repo = new CartRepo(_connectionString);
            List<CartItemViewModel> cartItems = new List<CartItemViewModel>();
            repo.MyCart(currentUserId).ForEach(ci => cartItems.Add(new CartItemViewModel
            {
                ProductId = ci.ProductId,
                UserId = ci.UserId,
                Title = ci.Product.Title,
                Description = ci.Product.Description,
                PricePerUnit = ci.Product.Price,
                TotalPriceForCartItem = ci.Amount * ci.Product.Price,
                Amount = ci.Amount,
                SavedForLater = ci.SavedForLater
            }));
            return cartItems;
        }

        [HttpPost]
        [Route("updatecartitem")]
        public void UpdateCartItem(CartItem cartItem)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return;
            }
            cartItem.UserId = GetCurrentUserId();
            var repo = new CartRepo(_connectionString);
            repo.UpdateCartItem(cartItem);
        }

        [HttpPost]
        [Route("deleteitem")]
        public void DeleteItem(DeleteCartItemViewModel vm)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return;
            }
            var currentUserId = GetCurrentUserId();
            var repo = new CartRepo(_connectionString);
            repo.DeleteCartItem(currentUserId, vm.ProductId);
        }
        private int GetCurrentUserId()
        {
            var userRepo = new UserRepo(_connectionString);
            return userRepo.GetByEmail(User.Identity.Name).Id;
        }
    }
}
