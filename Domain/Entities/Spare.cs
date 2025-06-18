using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Spare
    {
        public string? Code { get; set; }
        public string? Description { get; set; }
        public int StockQuantity { get; set; }
        public decimal UnitPrice { get; set; }
        public List<OrderDetail>? OrderDetails { get; set; } = new List<OrderDetail>();
    }
}