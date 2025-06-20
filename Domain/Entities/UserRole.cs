using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class UserRole: BaseEntity
    {
    public int Id { get; set; }
    public int UserMemberId { get; set; }
    public UserMember? UserMember { get; set; }
    public int RoleId { get; set; }
    public Role? Role { get; set; }
    }
}