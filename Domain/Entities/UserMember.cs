using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class UserMember
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Lastname { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public List<UserRole>? UserMembers { get; set; } = new List<UserRole>();
        public List<ServiceOrder>? ServiceOrders { get; set; } = new List<ServiceOrder>();
    }
}