using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Brand: BaseEntity
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public List<VehicleModel>? VehicleModels { get; set; } = new List<VehicleModel>();
    }
}