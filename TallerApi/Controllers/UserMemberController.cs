using System.Collections.Generic;
using System.Threading.Tasks;
using Application.DTOs;
using Application.DTOs.Entities;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TallerApi.Helpers.Errors;
using TallerApi.Services;

namespace TallerApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserMemberController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;

        public UserMemberController(IUnitOfWork unitOfWork, IMapper mapper, IUserService userService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userService = userService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<UserMemberDto>>> Get()
        {
            var userMembers = await _unitOfWork.UserMember.GetAllAsync();
            return Ok(_mapper.Map<List<UserMemberDto>>(userMembers));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<UserMemberDto>> Get(int id)
        {
            var user = await _unitOfWork.UserMember.GetByIdAsync(id);
            if (user == null)
                return NotFound(new ApiResponse(404, "El Usuario no existe."));

            return Ok(_mapper.Map<UserMemberDto>(user));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserMemberDto>> Post(UserMemberDto usermemberDto)
        {
            if (usermemberDto == null)
                return BadRequest(new ApiResponse(400, "Datos inválidos."));

            try
            {
                var user = await _userService.CreateUserFromDtoAsync(usermemberDto);
                var resultDto = _mapper.Map<UserMemberDto>(user);
                return CreatedAtAction(nameof(Get), new { id = user.Id }, resultDto);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new ApiResponse(400, $"Error al crear usuario: {ex.Message}"));
            }
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put(int id, [FromBody] UserMemberDto usermemberDto)
        {
            if (usermemberDto == null)
                return BadRequest(new ApiResponse(400, "Datos inválidos."));

            var existingUser = await _unitOfWork.UserMember.GetByIdAsync(id);
            if (existingUser == null)
                return NotFound(new ApiResponse(404, "El usuario solicitado no existe."));

            var updatedUser = _mapper.Map(usermemberDto, existingUser);

            if (string.IsNullOrWhiteSpace(usermemberDto.Password))
                updatedUser.Password = existingUser.Password;

            _unitOfWork.UserMember.Update(updatedUser);
            await _unitOfWork.SaveAsync();

            return Ok(_mapper.Map<UserMemberDto>(updatedUser));
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _unitOfWork.UserMember.GetByIdAsync(id);
            if (user == null)
                return NotFound(new ApiResponse(404, "El usuario solicitado no existe."));

            _unitOfWork.UserMember.Remove(user);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }
    }
}
