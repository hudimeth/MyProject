using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MyProject.Data
{
    public class Product
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int UnitsInStock { get; set; }
        public List<OrdersProducts> OrdersProducts { get; set; }
        public List<CartItem> CartItems { get; set; }

        [JsonIgnore]
        public Category Category { get; set; }

    }
}
