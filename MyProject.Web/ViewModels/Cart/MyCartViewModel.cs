namespace MyProject.Web.ViewModels.Cart
{
    public class MyCartViewModel
    {
        public List<CartItemViewModel> CartItems { get; set; }
        public List<CartItemViewModel> SavedForLaterItems { get; set; }
    }
}
