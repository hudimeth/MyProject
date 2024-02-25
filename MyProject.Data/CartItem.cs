using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MyProject.Data
{
    public class CartItem
    {
        public int UserId { get; set; }
        public int ProductId { get; set; }

        [JsonIgnore]
        public User User { get; set; }

        [JsonIgnore]
        public Product Product { get; set; }

        public int Amount { get; set; }
        public bool SavedForLater { get; set; }
    }
}
