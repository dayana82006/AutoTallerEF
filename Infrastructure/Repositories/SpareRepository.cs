using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;

namespace Infrastructure.Repositories
{
    public class SpareRepository : GenericRepository<Spare>, ISpareRepostiroy
    {
        public SpareRepository(PublicDbContext context) : base(context) { }
        
        public override async Task<Spare> GetByIdAsync(string code)
{
    return await _context.Set<Spare>().FindAsync(code);
}
    }
}