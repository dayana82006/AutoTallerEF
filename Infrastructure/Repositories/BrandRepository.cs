using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;

namespace Infrastructure.Repositories
{
    public class BrandRepository:GenericRepository<Brand>, IBrandRepository
    {
        public BrandRepository(PublicDbContext context): base(context) {}
    }
}