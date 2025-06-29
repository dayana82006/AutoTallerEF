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
    public class UserMemberRepository : GenericRepository<UserMember>, IUserMemberRepository
    {
        public UserMemberRepository(PublicDbContext context) : base(context)
        {
        }

        public override async Task<IEnumerable<UserMember>> GetAllAsync()
        {
            return await _context.UserMembers
                .Include(u => u.UserRoles)
                    .ThenInclude(ur => ur.Role)
                .Include(u => u.UserSpecialties)
                    .ThenInclude(us => us.Specialty)
                .ToListAsync();
        }

        public override async Task<UserMember> GetByIdAsync(int id)
        {
            return await _context.UserMembers
                .Include(u => u.UserRoles)
                    .ThenInclude(ur => ur.Role)
                .Include(u => u.UserSpecialties)
                    .ThenInclude(us => us.Specialty)
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<UserMember> GetByUsernameAsync(string username)
        {
            return await _context.UserMembers
                .Include(u => u.UserRoles)
                    .ThenInclude(ur => ur.Role)
                .Include(u => u.UserSpecialties)
                    .ThenInclude(us => us.Specialty)
                .Include(u => u.RefreshTokens)
                .FirstOrDefaultAsync(u => u.Username.ToLower() == username.ToLower());
        }

        public async Task<UserMember> GetByRefreshTokenAsync(string refreshToken)
        {
            return await _context.UserMembers
                .Include(u => u.UserRoles)
                    .ThenInclude(ur => ur.Role)
                .Include(u => u.UserSpecialties)
                    .ThenInclude(us => us.Specialty)
                .Include(u => u.RefreshTokens)
                .FirstOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == refreshToken));
        }
    }
}
