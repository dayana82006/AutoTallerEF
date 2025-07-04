using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
public class VehicleAnormality: BaseEntity
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime EntryDate { get; set; }
    public ICollection<VehicleAnormalityDetail>? VehicleAnormalityDetails { get; set; }
}
}