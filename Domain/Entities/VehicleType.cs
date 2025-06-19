using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
public class VehicleType
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public ICollection<Vehicle>? Vehicles { get; set; }
}

}