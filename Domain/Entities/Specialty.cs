using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
public class Specialty: BaseEntity
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public ICollection<UserSpecialty>? UserSpecialties { get; set; }
}
}