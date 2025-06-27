using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Application.DTOs;
using Application.DTOs.Auth;
using Application.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using TallerApi.Helpers.Errors;
using TallerApi.Services;

namespace Application.Services;

public class UserService : IUserService
{
    private readonly JWT _jwt;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IPasswordHasher<UserMember> _passwordHasher;

    public UserService(IUnitOfWork unitOfWork, IOptions<JWT> jwt, IPasswordHasher<UserMember> passwordHasher)
    {
        _jwt = jwt.Value;
        _unitOfWork = unitOfWork;
        _passwordHasher = passwordHasher;
    }

    public async Task<string> RegisterAsync(RegisterDto registerDto)
    {
        var userExists = _unitOfWork.UserMember.Find(u => u.Username!.ToLower() == registerDto.Username.ToLower()).FirstOrDefault();
        if (userExists != null)
            return $"El usuario con nombre {registerDto.Username} ya existe.";

        var user = new UserMember
        {
            Name = registerDto.Name,
            Lastname = registerDto.LastName,
            Email = registerDto.Email,
            Username = registerDto.Username,
            Password = _passwordHasher.HashPassword(null, registerDto.Password),
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        var defaultRole = _unitOfWork.Role.Find(r => r.Name == UserAuthorization.Rols.Mechanic.ToString()).FirstOrDefault();
        if (defaultRole == null)
            return "Rol predeterminado no encontrado.";

        var userRole = new UserRole
        {
            UserMember = user,
            Role = defaultRole
        };

        _unitOfWork.UserMember.Add(user);
        _unitOfWork.UserRole.Add(userRole);
        await _unitOfWork.SaveAsync();

        return $"Usuario {registerDto.Username} registrado exitosamente.";
    }
public async Task<UserMember> CreateUserFromDtoAsync(UserMemberDto dto)
{
    var user = new UserMember
    {
        Name = dto.Name,
        Lastname = dto.Lastname,
        Username = dto.Username,
        Email = dto.Email,
        Password = _passwordHasher.HashPassword(null, dto.Password),
        CreatedAt = DateTime.UtcNow,
        UpdatedAt = DateTime.UtcNow
    };

    _unitOfWork.UserMember.Add(user);
    await _unitOfWork.SaveAsync(); // ✅ Necesario para tener el ID del usuario

    // Asignar rol
    var role = _unitOfWork.Role.Find(r => r.Name == dto.Role).FirstOrDefault();
    if (role != null)
    {
        var userRole = new UserRole
        {
            UserMemberId = user.Id,
            RoleId = role.Id
        };
        _unitOfWork.UserRole.Add(userRole);
    }

    // Asignar especialidades
    if (dto.Specialties != null && dto.Specialties.Any())
    {
        foreach (var specName in dto.Specialties)
        {
            var specialty = _unitOfWork.Specialty.Find(s => s.Name == specName).FirstOrDefault();
            if (specialty != null)
            {
                var userSpecialty = new UserSpecialty
                {
                    IdUser = user.Id,
                    IdSpecialty = specialty.Id
                };
                _unitOfWork.UserSpecialty.Add(userSpecialty);
            }
        }
    }

    await _unitOfWork.SaveAsync(); // ✅ Guardar relaciones

    return user;
}


    public async Task<DataUserDto> GetTokenAsync(LoginDto model)
    {
        var user = await _unitOfWork.UserMember.GetByUsernameAsync(model.Username);
        var resultDto = new DataUserDto();

        if (user == null || _passwordHasher.VerifyHashedPassword(user, user.Password!, model.Password) != PasswordVerificationResult.Success)
        {
            resultDto.EstaAutenticado = false;
            resultDto.Mensaje = "Credenciales incorrectas.";
            return resultDto;
        }

        var jwtToken = CreateJwtToken(user);

        resultDto.EstaAutenticado = true;
        resultDto.Token = new JwtSecurityTokenHandler().WriteToken(jwtToken);
        resultDto.Email = user.Email;
        resultDto.UserName = user.Username;
        resultDto.Codeb = user.Id.ToString();
        resultDto.Rols = [.. user.UserRoles!.Select(r => r.Role!.Name)];

        var activeRefreshToken = user.RefreshTokens?.FirstOrDefault(t => t.IsActive);
        if (activeRefreshToken != null)
        {
            resultDto.RefreshToken = activeRefreshToken.Token;
            resultDto.RefreshTokenExpiration = activeRefreshToken.Expires;
        }
        else
        {
            var newRefreshToken = CreateRefreshToken();
            resultDto.RefreshToken = newRefreshToken.Token;
            resultDto.RefreshTokenExpiration = newRefreshToken.Expires;
            user.RefreshTokens?.Add(newRefreshToken);
            _unitOfWork.UserMember.Update(user);
            await _unitOfWork.SaveAsync();
        }

        return resultDto;
    }

    public async Task<string> AddRoleAsync(AddRoleDto model)
    {
        var user = await _unitOfWork.UserMember.GetByUsernameAsync(model.Email);
        if (user == null)
            return $"Usuario {model.Email} no encontrado.";

        var result = _passwordHasher.VerifyHashedPassword(user, user.Password!, model.Password);
        if (result != PasswordVerificationResult.Success)
            return $"Credenciales inválidas para el usuario {model.Email}.";

        var role = _unitOfWork.Role.Find(r => r.Name.ToLower() == model.Role.ToLower()).FirstOrDefault();
        if (role == null)
            return $"Rol {model.Role} no existe.";

        var hasRole = user.UserRoles!.Any(r => r.RoleId == role.Id);
        if (hasRole)
            return $"El usuario ya tiene el rol {model.Role}.";

        var newUserRole = new UserRole
        {
            UserMemberId = user.Id,
            RoleId = role.Id
        };

        _unitOfWork.UserRole.Add(newUserRole);
        await _unitOfWork.SaveAsync();
        return $"Rol {model.Role} asignado correctamente a {model.Email}.";
    }

    public async Task<DataUserDto> RefreshTokenAsync(string refreshToken)
    {
        var user = await _unitOfWork.UserMember.GetByRefreshTokenAsync(refreshToken);
        var result = new DataUserDto();

        if (user == null)
        {
            result.EstaAutenticado = false;
            result.Mensaje = "Token inválido.";
            return result;
        }

        var tokenDb = user.RefreshTokens!.FirstOrDefault(t => t.Token == refreshToken);
        if (tokenDb == null || !tokenDb.IsActive)
        {
            result.EstaAutenticado = false;
            result.Mensaje = "El token no está activo.";
            return result;
        }

        tokenDb.Revoked = DateTime.UtcNow;
        var newToken = CreateRefreshToken();
        user.RefreshTokens!.Add(newToken);
        _unitOfWork.UserMember.Update(user);
        await _unitOfWork.SaveAsync();

        var jwtToken = CreateJwtToken(user);

        result.EstaAutenticado = true;
        result.Token = new JwtSecurityTokenHandler().WriteToken(jwtToken);
        result.Email = user.Email;
        result.UserName = user.Username;
        result.Codeb = user.Id.ToString();
        result.Rols = user.UserRoles!.Select(r => r.Role!.Name).ToList();
        result.RefreshToken = newToken.Token;
        result.RefreshTokenExpiration = newToken.Expires;

        return result;
    }

    private JwtSecurityToken CreateJwtToken(UserMember user)
    {
        var roles = user.UserRoles!.Select(r => r.Role!.Name).ToList();

        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Username!),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email!),
            new Claim("uid", user.Id.ToString())
        };

        claims.AddRange(roles.Select(role => new Claim("roles", role)));

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        return new JwtSecurityToken(
            issuer: _jwt.Issuer,
            audience: _jwt.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(_jwt.DurationInMinutes),
            signingCredentials: creds
        );
    }

    private RefreshToken CreateRefreshToken()
    {
        var bytes = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(bytes);
        return new RefreshToken
        {
            Token = Convert.ToBase64String(bytes),
            Created = DateTime.UtcNow,
            Expires = DateTime.UtcNow.AddDays(10)
        };
    }
}
