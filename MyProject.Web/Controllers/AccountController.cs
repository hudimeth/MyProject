using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using MyProject.Data;
using MyProject.Web.ViewModels.Account;
using MyProject.Web.ViewModels.Cart;
using System.Security.Claims;

namespace MyProject.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly string _connectionString;
        private IHubContext<CartItemsHub> _hub;
        public AccountController(IConfiguration configuration, IHubContext<CartItemsHub> hub)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
            _hub = hub;
        }

        [HttpPost]
        [Route("signup")]
        public IsValidSignupViewModel Signup(SignupViewModel vm)
        {
            var repo = new UserRepo(_connectionString);
            var userExists = repo.UserExistsForThisEmail(vm.Email);
            var passwordsMatch = vm.Password == vm.PasswordConfirmation;
            if (!userExists && passwordsMatch)
            {
                repo.AddUser(new User
                {
                    FirstName = vm.FirstName,
                    LastName = vm.LastName,
                    Email = vm.Email
                }, vm.Password);
            }
            return new()
            {
                UserExistsForThisEmail = userExists,
                PasswordsMatch = passwordsMatch
            };
        }

        [HttpPost]
        [Route("login")]
        public User Login(LoginViewModel vm)
        {
            var repo = new UserRepo(_connectionString);
            var user = repo.Login(vm.Email, vm.Password);
            if (user == null)
            {
                return null;
            }
            var claims = new List<Claim>
            {
                new Claim("user", vm.Email)
            };
            HttpContext.SignInAsync(new ClaimsPrincipal(
                new ClaimsIdentity(claims, "Cookies", "user", "role"))).Wait();

            var cartRepo = new CartRepo(_connectionString);
            var currentUserId = repo.GetByEmail(vm.Email).Id;
            _hub.Clients.All.SendAsync("updatedcartitemscount", new CartItemsLinkViewModel
            {
                ItemsCount = cartRepo.CartItemsCount(currentUserId),
                Subtotal = cartRepo.CartSubtotal(currentUserId)
            });
            return user;
        }
        [HttpPost]
        [Route("logout")]
        public void Logout()
        {
            HttpContext.SignOutAsync().Wait();
            _hub.Clients.All.SendAsync("updatedcartitemscount", new CartItemsLinkViewModel
            {
               ItemsCount = 0,
               Subtotal = 0
            });
        }

        [HttpGet]
        [Route("getcurrentuser")]
        public User GetCurrentUser()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return null;
            }
            var repo = new UserRepo(_connectionString);
            return repo.GetByEmail(User.Identity.Name);
        }
    }
}
