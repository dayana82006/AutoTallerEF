using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Infrastructure.Data;

namespace Infrastructure.UnitOfWork
{
    public class UnitOfWork// : IUnitOfWork, IDisposable
    {
        private readonly PublicDbContext _context;
        private IBrandRepository _brand;
        private IClientRepository _client;
        private IFuelTypeRepository _fuelType;
        private IInvoiceDetailRepository _invoiceDetail;
        private IInvoiceRepository _invoice;
        private IOrderDetailRepository _orderDetail;
        private IRoleRepository _roleRepository;
        private IServiceOrderRepository _serviceOrder;
        private IServiceStatusRepository _serviceStatus;
        private ISpareRepostiroy _spare;
        private ISpecialtyRepository _specialty;
        private IUserMemberRepository _userMember;
        private IUserRoleRepository _userRole;
        private IUserSpecialtyRepository _userSpecialty;
        private IVehicleAnormalityDetailRepository _vehicleAnormalityDetail;
        private IVehicleAnormalityRepository _vehicleAnormality;
        private IVehicleModelRepository _vehicleModel;
        private IVehicleRepository _vehicle;
        private IVehicleTypeRepository  _vehicleType;

// public IBrandRepository Brand
// {
//     get
//     {
//         if (_brand == null)
//         {
//             _brand = new BrandRepository(_context);
//         }
//         return _brand;
//     }
// }

// public IClientRepository Client
// {
//     get
//     {
//         if (_client == null)
//         {
//             _client = new ClientRepository(_context);
//         }
//         return _client;
//     }
// }

// public IFuelTypeRepository FuelType
// {
//     get
//     {
//         if (_fuelType == null)
//         {
//             _fuelType = new FuelTypeRepository(_context);
//         }
//         return _fuelType;
//     }
// }

// public IInvoiceDetailRepository InvoiceDetail
// {
//     get
//     {
//         if (_invoiceDetail == null)
//         {
//             _invoiceDetail = new InvoiceDetailRepository(_context);
//         }
//         return _invoiceDetail;
//     }
// }

// public IInvoiceRepository Invoice
// {
//     get
//     {
//         if (_invoice == null)
//         {
//             _invoice = new InvoiceRepository(_context);
//         }
//         return _invoice;
//     }
// }

// public IOrderDetailRepository OrderDetail
// {
//     get
//     {
//         if (_orderDetail == null)
//         {
//             _orderDetail = new OrderDetailRepository(_context);
//         }
//         return _orderDetail;
//     }
// }

// public IRoleRepository RoleRepository
// {
//     get
//     {
//         if (_roleRepository == null)
//         {
//             _roleRepository = new RoleRepository(_context);
//         }
//         return _roleRepository;
//     }
// }

// public IServiceOrderRepository ServiceOrder
// {
//     get
//     {
//         if (_serviceOrder == null)
//         {
//             _serviceOrder = new ServiceOrderRepository(_context);
//         }
//         return _serviceOrder;
//     }
// }

// public IServiceStatusRepository ServiceStatus
// {
//     get
//     {
//         if (_serviceStatus == null)
//         {
//             _serviceStatus = new ServiceStatusRepository(_context);
//         }
//         return _serviceStatus;
//     }
// }

// public ISpareRepostiroy Spare
// {
//     get
//     {
//         if (_spare == null)
//         {
//             _spare = new SpareRepostiroy(_context);
//         }
//         return _spare;
//     }
// }

// public ISpecialtyRepository Specialty
// {
//     get
//     {
//         if (_specialty == null)
//         {
//             _specialty = new SpecialtyRepository(_context);
//         }
//         return _specialty;
//     }
// }

// public IUserMemberRepository UserMember
// {
//     get
//     {
//         if (_userMember == null)
//         {
//             _userMember = new UserMemberRepository(_context);
//         }
//         return _userMember;
//     }
// }

// public IUserRoleRepository UserRole
// {
//     get
//     {
//         if (_userRole == null)
//         {
//             _userRole = new UserRoleRepository(_context);
//         }
//         return _userRole;
//     }
// }

// public IUserSpecialtyRepository UserSpecialty
// {
//     get
//     {
//         if (_userSpecialty == null)
//         {
//             _userSpecialty = new UserSpecialtyRepository(_context);
//         }
//         return _userSpecialty;
//     }
// }

// public IVehicleAnormalityDetailRepository VehicleAnormalityDetail
// {
//     get
//     {
//         if (_vehicleAnormalityDetail == null)
//         {
//             _vehicleAnormalityDetail = new VehicleAnormalityDetailRepository(_context);
//         }
//         return _vehicleAnormalityDetail;
//     }
// }

// public IVehicleAnormalityRepository VehicleAnormality
// {
//     get
//     {
//         if (_vehicleAnormality == null)
//         {
//             _vehicleAnormality = new VehicleAnormalityRepository(_context);
//         }
//         return _vehicleAnormality;
//     }
// }

// public IVehicleModelRepository VehicleModel
// {
//     get
//     {
//         if (_vehicleModel == null)
//         {
//             _vehicleModel = new VehicleModelRepository(_context);
//         }
//         return _vehicleModel;
//     }
// }

// public IVehicleRepository Vehicle
// {
//     get
//     {
//         if (_vehicle == null)
//         {
//             _vehicle = new VehicleRepository(_context);
//         }
//         return _vehicle;
//     }
// }

// public IVehicleTypeRepository VehicleType
// {
//     get
//     {
//         if (_vehicleType == null)
//         {
//             _vehicleType = new VehicleTypeRepository(_context);
//         }
//         return _vehicleType;
//     }
// }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}