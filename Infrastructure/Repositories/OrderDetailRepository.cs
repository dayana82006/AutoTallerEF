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
    public class OrderDetailRepository : GenericRepository<OrderDetail>, IOrderDetailRepository
    {
        public OrderDetailRepository(PublicDbContext context) : base(context) { }
        
        public async Task<IEnumerable<OrderDetail>> GetByServiceOrderIdAsync(int serviceOrderId)
{
    return await _context.OrderDetails
        .Where(od => od.ServiceOrderId == serviceOrderId)
        .ToListAsync();
}

    }
}