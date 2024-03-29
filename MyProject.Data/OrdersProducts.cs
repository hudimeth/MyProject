﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MyProject.Data
{
    public class OrdersProducts
    {
        public int OrderId { get; set; }
        public int ProductId { get; set; }

        [JsonIgnore]
        public Order Order { get; set; }

        [JsonIgnore]
        public Product Product { get; set; }

        public int Amount { get; set; }

    }
}
