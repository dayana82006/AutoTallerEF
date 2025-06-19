using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Infrastructure.Data;

namespace Infrastructure.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly PublicDbContext _context;

        public IBrandRepository Brand => throw new NotImplementedException();

        public IClientRepository Client => throw new NotImplementedException();

        public IFuelTypeRepository FuelType => throw new NotImplementedException();

        public IInvoiceDetailRepository InvoiceDetail => throw new NotImplementedException();

        public IInvoiceRepository Invoice => throw new NotImplementedException();

        public IOrderDetailRepository OrderDetail => throw new NotImplementedException();

        public IRoleRepository Role => throw new NotImplementedException();

        public IServiceOrderRepository ServiceOrder => throw new NotImplementedException();

        public IServiceStatusRepository ServiceStatus => throw new NotImplementedException();

        public IServiceTypeRepository ServiceType => throw new NotImplementedException();

        public ISpareRepostiroy Spare => throw new NotImplementedException();

        public ISpecialtyRepository Specialty => throw new NotImplementedException();

        public IUserMemberRepository UserMeber => throw new NotImplementedException();

        public IUserRoleRepository UserRole => throw new NotImplementedException();

        public IUserSpecialtyRepository UserSpecialty => throw new NotImplementedException();

        public IVehicleAnormalityDetailRepository VehicleAnormalityDetail => throw new NotImplementedException();

        public IVehicleAnormalityRepository VehicleAnormality => throw new NotImplementedException();

        public IVehicleModelRepository VehicleModel => throw new NotImplementedException();

        public IVehicleRepository Vehicle => throw new NotImplementedException();

        public IVehicleTypeRepository VehicleType => throw new NotImplementedException();

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}