using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class VehicleModel
    {
        public int Id { get; set; }
        public int IdBrand { get; set; }
        public string? Name { get; set; }
        public int BrandId { get; set; }
        public Brand? Brand { get; set; }
        public List<Vehicle>? Vehicles { get; set; } = new List<Vehicle>();
    }
}