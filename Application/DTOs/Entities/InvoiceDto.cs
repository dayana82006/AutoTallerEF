using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.DTOs.Entities
{
    public class InvoiceDto
    {
        public int Id { get; set; }
        public decimal TotalSpares { get; set; }
        public decimal TotalServices { get; set; }
        public decimal FinalAmount { get; set; }
        public int ClientId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}