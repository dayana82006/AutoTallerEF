using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class ServiceOrderRepository : GenericRepository<ServiceOrder>, IServiceOrderRepository
    {
        private readonly PublicDbContext _context;

        public ServiceOrderRepository(PublicDbContext context) : base(context)
        {
            _context = context;
        }

        public override async Task<IEnumerable<ServiceOrder>> GetAllAsync()
        {
            return await _context.ServiceOrders
                .Include(o => o.OrderDetails) // 👈 Incluye los repuestos asociados
                .ToListAsync();
        }

        public override async Task<ServiceOrder?> GetByIdAsync(int id)
        {
            return await _context.ServiceOrders
                .Include(o => o.OrderDetails) // 👈 También aquí por si usas GET /{id}
                .FirstOrDefaultAsync(o => o.Id == id);
        }
    }
}
