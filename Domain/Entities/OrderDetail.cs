using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class OrderDetail
    {
    public int Id { get; set; }
    public int SpareQuantity { get; set; }
    public int ServiceOrderId { get; set; }
    public ServiceOrder? ServiceOrder { get; set; }
    public string? SpareCode {get; set;}
    public Spare? Spare { get; set; }
    }
}