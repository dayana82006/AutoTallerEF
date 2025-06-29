using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.DTOs.Entities
{
    public class OrderDetailDto
    {
        public int Id { get; set; }
        public int SpareQuantity { get; set; }
        public int ServiceOrderId { get; set; }
        public string? SpareCode { get; set; }
        public int UserMemberId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}