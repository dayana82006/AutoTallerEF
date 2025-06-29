using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Client: BaseEntity
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Lastname { get; set; }
        public string? Telephone { get; set; }
        public string? Email { get; set; }
        public List<Vehicle>? Vehicles { get; set; } = new List<Vehicle>();
        public List<Invoice>? Invoices { get; set; } = new List<Invoice>();
    }
}