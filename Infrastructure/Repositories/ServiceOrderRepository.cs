using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;

namespace Infrastructure.Repositories
{
    public class ServiceOrderRepository:GenericRepository<ServiceOrder>, IServiceOrderRepository 
    {
        public ServiceOrderRepository(PublicDbContext context):base(context){}
    }
}