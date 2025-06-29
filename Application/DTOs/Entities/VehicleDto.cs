using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.DTOs.Entities
{
    public class VehicleDto
    {
        public string? SerialNumber { get; set; }
        public long Km { get; set; }
         public int ReleaseYear { get; set; }
        public int VehicleModelId { get; set; }
        public int ClientId { get; set; }
        public int FuelTypeId { get; set; }
        public int VehicleTypeId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}