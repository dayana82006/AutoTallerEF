using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class ServiceOrder
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        public DateTime DateEntry { get; set; }
        public DateTime? DeliveryDate { get; set; }
        public bool ApprovedByClient { get; set; }
        public string? VehicleSerialNumber { get; set; }
        public Vehicle? Vehicle { get; set; }
        public int ServiceTypeId { get; set; }
        public ServiceType? ServiceType { get; set; }
        public int UserMemberId { get; set; }
        public UserMember? UserMember { get; set; }
        public int ServiceStatusId { get; set; }
        public ServiceStatus? ServiceStatus { get; set; }
        public List<OrderDetail>? OrderDetails { get; set; } = new List<OrderDetail>();
        public List<InvoiceDetail>? InvoiceDetails { get; set; } = new List<InvoiceDetail>();
    }
}