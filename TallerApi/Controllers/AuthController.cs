using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.DTOs.Auth;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Data;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly PublicDbContext _context;

        public AuthController(IConfiguration config, PublicDbContext context)
        {
            _config = config;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _context.UserMembers
                .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role)
                .FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
            {
                return Unauthorized(new DataUserDto
                {
                    Codeb = "401",
                    Mensaje = "El usuario no existe.",
                    EstaAutenticado = false
                });
            }

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
            {
                return Unauthorized(new DataUserDto
                {
                    Codeb = "401",
                    Mensaje = "Contraseña incorrecta.",
                    EstaAutenticado = false
                });
            }

            // Obtener roles
            var roles = user.UserRoles.Select(ur => ur.Role.Name).ToList();

            // Generar token JWT
            var token = GenerateJwtToken(user, roles);

            // Preparar respuesta
            var response = new DataUserDto
            {
                Codeb = "200",
                Mensaje = "Autenticación exitosa.",
                EstaAutenticado = true,
                Email = user.Email,
                Name = user.Name,
                Lastname = user.Lastname,
                UserName = user.Username,
                Rols = roles,
                Token = token,
                RefreshTokenExpiration = DateTime.UtcNow.AddMinutes(30)
            };

            return Ok(response);
        }

        private string GenerateJwtToken(UserMember user, List<string> roles)
        {
            var claims = new List<Claim>
            {
                   new Claim("id", user.Id.ToString()),
                    new Claim("email", user.Email ?? "")
            };


        // Si tiene varios roles y los necesitas todos:
        foreach (var role in roles)
        {
            claims.Add(new Claim("roles", role)); // Ojo: usarás "roles" múltiples veces (array)
        }


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
