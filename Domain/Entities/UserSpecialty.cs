using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
public class UserSpecialty
{
    public int Id { get; set; }

    public int IdUser { get; set; }
    public UserMember? User { get; set; }

    public int IdSpecialty { get; set; }
    public Specialty? Specialty { get; set; }
}

}