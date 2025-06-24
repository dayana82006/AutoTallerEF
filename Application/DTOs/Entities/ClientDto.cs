using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.DTOs.Entities
{
    public class ClientDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Lastname { get; set; }
        public string? Telephone { get; set; }
        public string? Email { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
        
    }
}