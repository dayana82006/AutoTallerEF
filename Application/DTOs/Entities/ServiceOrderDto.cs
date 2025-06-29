using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.DTOs.Entities
{
    public class ServiceOrderDto
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        public bool ApprovedByClient { get; set; }
        public string? SerialNumber { get; set; }
        public int UnitPrice { get; set; }
        public int ServiceStatusId { get; set; }
        public int ServiceTypeId { get; set; }
        public int UserMemberId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
         public int InvoiceId { get; set; }
    }
}