using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class VehicleRepository : GenericRepository<Vehicle>, IVehicleRepository
    {
        public VehicleRepository(PublicDbContext context) : base(context)
        {
        }

        public virtual async Task<Vehicle> GetByIdAsync(string id)
{
    return await _context.Set<Vehicle>().FirstOrDefaultAsync(e => EF.Property<string>(e, "SerialNumber") == id);
}

    }
}