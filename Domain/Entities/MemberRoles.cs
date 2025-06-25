using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class MemberRols: BaseEntity
    {
    public string? MemberId { get; set; }
    public UserMember? UserMember { get; set; }
    public int RolId { get; set; } 
    public Role? Rol { get; set; }
    }
}