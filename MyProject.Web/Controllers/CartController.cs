using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using MyProject.Data;
using MyProject.Web.ViewModels.Cart;

namespace MyProject.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CartController : ControllerBase
    {
        private string _connectionString;
        private IHubContext<CartItemsHub> _hub;

        public CartController(IConfiguration configuration, IHubContext<CartItemsHub> hub)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
            _hub = hub;
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
            var existingCartItem = repo.ExistingCartItem(currentUserId, vm.ProductId);
            if (existingCartItem == null)
            {
                repo.AddToCart(currentUserId, vm.ProductId, vm.Amount);
            }
            else
            {
                repo.UpdateCartItem(new CartItem
                {
                    UserId = existingCartItem.UserId,
                    ProductId = existingCartItem.ProductId,
                    Amount = existingCartItem.Amount + vm.Amount,
                    SavedForLater = false
                });
            }
            _hub.Clients.All.SendAsync("updatedcartitemscount", new CartItemsLinkViewModel
            {
                ItemsCount = repo.CartItemsCount(currentUserId),
                Subtotal = repo.CartSubtotal(currentUserId)
            });
        }

        [HttpGet]
        [Route("mycart")]
        [AllowAnonymous]
        public MyCartViewModel MyCart()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return new();
            }
            var currentUserId = GetCurrentUserId();
            var repo = new CartRepo(_connectionString);
            List<CartItemViewModel> cartItems = new List<CartItemViewModel>();
            List<CartItemViewModel> savedForLaterItems = new List<CartItemViewModel>();
            repo.MyCart(currentUserId).ForEach(ci =>
            {
                var cartItem = new CartItemViewModel
                {
                    ProductId = ci.ProductId,
                    UserId = ci.UserId,
                    Title = ci.Product.Title,
                    Description = ci.Product.Description,
                    PricePerUnit = ci.Product.Price,
                    TotalPriceForCartItem = ci.Amount * ci.Product.Price,
                    Amount = ci.Amount,
                    SavedForLater = ci.SavedForLater
                };
                if(ci.SavedForLater)
                {
                    savedForLaterItems.Add(cartItem);
                }
                else
                {
                    cartItems.Add(cartItem);
                }
                
            });

            return new()
            {
                CartItems = cartItems,
                SavedForLaterItems = savedForLaterItems
            };
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

            var existingCartItem = repo.ExistingCartItem(cartItem.UserId, cartItem.ProductId);
            repo.UpdateCartItem(cartItem);
            if(existingCartItem.Amount == cartItem.Amount)
            {
                _hub.Clients.All.SendAsync("updatedcartitemscount", new CartItemsLinkViewModel
                {
                    ItemsCount = repo.CartItemsCount(cartItem.UserId),
                    Subtotal = repo.CartSubtotal(cartItem.UserId)
                });
            }
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
            _hub.Clients.All.SendAsync("updatedcartitemscount", new CartItemsLinkViewModel
            {
                ItemsCount = repo.CartItemsCount(currentUserId),
                Subtotal = repo.CartSubtotal(currentUserId)
            });
        }

        [HttpGet]
        [Route("cartitemslink")]
        [AllowAnonymous]
        public CartItemsLinkViewModel CartItemsLink()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return new();
            }
            var repo = new CartRepo(_connectionString);
            var currentUserId = GetCurrentUserId();
            return new CartItemsLinkViewModel
            {
                ItemsCount = repo.CartItemsCount(currentUserId),
                Subtotal = repo.CartSubtotal(currentUserId)
            };
        }
        private int GetCurrentUserId()
        {
            var userRepo = new UserRepo(_connectionString);
            return userRepo.GetByEmail(User.Identity.Name).Id;
        }
    }
}
