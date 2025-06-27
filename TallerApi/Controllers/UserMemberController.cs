using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.DTOs;
using Application.DTOs.Entities;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TallerApi.Helpers.Errors;

namespace TallerApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserMemberController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly PublicDbContext _context; 

        public UserMemberController(IUnitOfWork unitOfWork, IMapper mapper, PublicDbContext context)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserMemberDto>>> Get()
        {
            var userMembers = await _unitOfWork.UserMember.GetAllAsync();
            return Ok(_mapper.Map<List<UserMemberDto>>(userMembers));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserMemberDto>> Get(int id)
        {
            var user = await _context.UserMembers
                .Include(u => u.UserRoles).ThenInclude(ur => ur.Role)
                .Include(u => u.UserSpecialties).ThenInclude(us => us.Specialty)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
                return NotFound(new ApiResponse(404, "El usuario no existe."));

            return Ok(_mapper.Map<UserMemberDto>(user));
        }

        [HttpPost]
        public async Task<ActionResult<UserMemberDto>> Post(UserMemberDto usermemberDto)
        {
            if (usermemberDto == null)
                return BadRequest(new ApiResponse(400, "Datos inválidos."));

            try
            {
                var user = _mapper.Map<UserMember>(usermemberDto);
                user.CreatedAt = DateTime.UtcNow;
                user.UpdatedAt = DateTime.UtcNow;

                if (!string.IsNullOrWhiteSpace(usermemberDto.Password))
                {
                    var hasher = new PasswordHasher<UserMember>();
                    user.Password = hasher.HashPassword(user, usermemberDto.Password);
                }

                // Rol
                var role = await _context.Roles.FirstOrDefaultAsync(r => r.Name == usermemberDto.Role);
                if (role != null)
                {
                    user.UserRoles = new List<UserRole>
                    {
                        new UserRole { RoleId = role.Id }
                    };
                }

                // Especialidades solo si es mecánico
                if (role != null && role.Name == "Mecánico" && usermemberDto.Specialties != null)
                {
                    user.UserSpecialties = new List<UserSpecialty>();
                    foreach (var specName in usermemberDto.Specialties)
                    {
                        var spec = await _context.Specialties.FirstOrDefaultAsync(s => s.Name == specName);
                        if (spec != null)
                        {
                            user.UserSpecialties.Add(new UserSpecialty
                            {
                                IdSpecialty = spec.Id
                            });
                        }
                    }
                }

                await _context.UserMembers.AddAsync(user);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(Get), new { id = user.Id }, _mapper.Map<UserMemberDto>(user));
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse(400, $"Error al crear usuario: {ex.Message}"));
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] UserMemberDto usermemberDto)
        {
            if (usermemberDto == null)
                return BadRequest(new ApiResponse(400, "Datos inválidos."));

            var existingUser = await _context.UserMembers
                .Include(u => u.UserRoles)
                .Include(u => u.UserSpecialties)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (existingUser == null)
                return NotFound(new ApiResponse(404, "El usuario no existe."));

            existingUser.Name = usermemberDto.Name;
            existingUser.Lastname = usermemberDto.Lastname;
            existingUser.Username = usermemberDto.Username;
            existingUser.Email = usermemberDto.Email;
            existingUser.UpdatedAt = DateTime.UtcNow;

            if (!string.IsNullOrWhiteSpace(usermemberDto.Password))
            {
                var hasher = new PasswordHasher<UserMember>();
                existingUser.Password = hasher.HashPassword(existingUser, usermemberDto.Password);
            }

            // Obtener nuevo rol
            var role = await _context.Roles.FirstOrDefaultAsync(r => r.Name == usermemberDto.Role);
            if (role != null)
            {
                existingUser.UserRoles = new List<UserRole>
                {
                    new UserRole { RoleId = role.Id, UserMemberId = id }
                };
            }

            // Si es mecánico, asignar especialidades
            if (role != null && role.Name == "Mecánico" && usermemberDto.Specialties != null)
            {
                existingUser.UserSpecialties = new List<UserSpecialty>();
                foreach (var specName in usermemberDto.Specialties)
                {
                    var spec = await _context.Specialties.FirstOrDefaultAsync(s => s.Name == specName);
                    if (spec != null)
                    {
                        existingUser.UserSpecialties.Add(new UserSpecialty
                        {
                            IdUser = id,
                            IdSpecialty = spec.Id
                        });
                    }
                }
            }
            else
            {
                existingUser.UserSpecialties.Clear();
            }

            _context.UserMembers.Update(existingUser);
            await _context.SaveChangesAsync();

            return Ok(_mapper.Map<UserMemberDto>(existingUser));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _unitOfWork.UserMember.GetByIdAsync(id);
            if (user == null)
                return NotFound(new ApiResponse(404, "El usuario no existe."));

            _unitOfWork.UserMember.Remove(user);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }
    }
}
