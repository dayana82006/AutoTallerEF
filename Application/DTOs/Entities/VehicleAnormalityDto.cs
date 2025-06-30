using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;

namespace Application.DTOs.Entities
{
    public class VehicleAnormalityDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime EntryDate { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
    public List<VehicleAnormalityDetailDto>? VehicleAnormalityDetails { get; set; }

    }
}