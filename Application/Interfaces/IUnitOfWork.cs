using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IUnitOfWork
    {
        IBrandRepository Brand { get; }
        IClientRepository Client { get; }
        IFuelTypeRepository FuelType { get; }
        IInvoiceDetailRepository InvoiceDetail { get; }
        IInvoiceRepository Invoice { get; }
        IOrderDetailRepository OrderDetail { get; }
        IRoleRepository Role { get; }
        IServiceOrderRepository ServiceOrder { get; }
        IServiceStatusRepository ServiceStatus { get; }
        IServiceTypeRepository ServiceType { get; }
        ISpareRepostiroy Spare { get; }
        ISpecialtyRepository Specialty { get; }
        IUserMemberRepository UserMeber { get; }
        IUserRoleRepository UserRole { get; }
        IUserSpecialtyRepository UserSpecialty { get; }
        IVehicleAnormalityDetailRepository VehicleAnormalityDetail { get; }
        IVehicleAnormalityRepository VehicleAnormality { get; }
        IVehicleModelRepository VehicleModel { get; }
        IVehicleRepository Vehicle { get; }
        IVehicleTypeRepository VehicleType { get; }
    }
}