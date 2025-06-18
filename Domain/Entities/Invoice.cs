using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Invoice
    {
        public int Id { get; set; }
        public int IdClient { get; set; }
        public decimal TotalSpares { get; set; }
        public decimal TotalServices { get; set; }
        public decimal FinalAmount { get; set; }
        public int ClientId { get; set; }
        public Client? Client { get; set; }
        public List<InvoiceDetail>? InvoiceDetails = new List<InvoiceDetail>();
    }
}