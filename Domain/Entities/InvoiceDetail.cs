using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class InvoiceDetail: BaseEntity
    {
        public int Id { get; set; }
        public int InvoiceId { get; set; }
        public Invoice? Invoice { get; set; }
        public int ServiceOrderId { get; set;}
        public ServiceOrder? ServiceOrder { get; set; }
    }
}