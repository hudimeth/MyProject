using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MyProject.Data
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime DateOrdered { get; set; }
        public OrderStatus Status { get; set; }
        public string ShipFirstName { get; set; }
        public string ShipLastName { get; set; }
        public string ShipAddress { get; set; }
        public string ShipCity { get; set; }
        public string ShipCountry { get; set; }
        public string ShipPostalCode { get; set; }
        public List<OrdersProducts> OrdersProducts { get; set; }

        [JsonIgnore]
        public User User { get; set; }
    }
}
