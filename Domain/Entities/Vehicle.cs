using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Vehicle: BaseEntity
    {
        public string? SerialNumber { get; set; }
        public int ReleaseYear { get; set; }
        public long Km { get; set; }
        public int VehicleModelId { get; set; }
        public VehicleModel? Model { get; set; }
        public int ClientId { get; set; }
        public Client? Client { get; set; }
        public int FuelTypeId { get; set; }
        public FuelType? FuelType { get; set; }
        public int VehicleTypeId { get; set; }
        public VehicleType? vehicleType { get; set; }
        public List<ServiceOrder>? ServiceOrders { get; set; } = new List<ServiceOrder>();
        public List<VehicleAnormalityDetail>? VehicleAnormalityDetails { get; set; } = new List<VehicleAnormalityDetail>();
    }
}