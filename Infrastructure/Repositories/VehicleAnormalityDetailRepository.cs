using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;

namespace Infrastructure.Repositories
{
    public class VehicleAnormalityDetailRepository : GenericRepository<VehicleAnormalityDetail>, IVehicleAnormalityDetailRepository
    {
        public VehicleAnormalityDetailRepository(PublicDbContext context) : base(context)
        {
        }
    }
}