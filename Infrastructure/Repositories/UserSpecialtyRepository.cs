using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;

namespace Infrastructure.Repositories
{
    public class UserSpecialtyRepository : GenericRepository<UserSpecialty>, IUserSpecialtyRepository
    {
        public UserSpecialtyRepository(PublicDbContext context) : base(context)
        {
        }
    }
}