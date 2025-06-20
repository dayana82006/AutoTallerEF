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
    public class ClientRepository:GenericRepository<Client>, IClientRepository
    {
        public ClientRepository(PublicDbContext context): base(context){}
    }
}