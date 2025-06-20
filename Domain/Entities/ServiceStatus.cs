using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class ServiceStatus: BaseEntity
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public List<ServiceOrder>? ServiceOrders { get; set; } = new List<ServiceOrder>();
    }
}