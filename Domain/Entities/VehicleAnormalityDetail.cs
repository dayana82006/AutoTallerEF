using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
public class VehicleAnormalityDetail
{
    public int Id { get; set; }

    public int IdAnormality { get; set; }
    public VehicleAnormality? VehicleAnormality { get; set; }

    public int SerialNumber { get; set; }
    public Vehicle? Vehicle { get; set; }
}

}