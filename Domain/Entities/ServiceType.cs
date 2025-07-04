using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class ServiceType: BaseEntity
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        public List<ServiceOrder>? ServiceOrders { get; set; } = new List<ServiceOrder>();
    }
}