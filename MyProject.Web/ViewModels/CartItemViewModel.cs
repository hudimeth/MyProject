namespace MyProject.Web.ViewModels
{
    public class CartItemViewModel
    {
        public int ProductId { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal PricePerUnit { get; set; }
        public decimal TotalPriceForCartItem { get; set; }
        public int Amount { get; set; }
        public bool SavedForLater { get; set; }
    }
}
