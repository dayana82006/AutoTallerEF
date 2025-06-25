using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using TallerApi.Helpers.Errors;
using Application.DTOs.Entities;

namespace TallerApi.Controllers
{
    public class UserSpecialtyController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UserSpecialtyController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<UserSpecialtyDto>>> Get()
        {
            var userSpecialties = await _unitOfWork.UserSpecialty.GetAllAsync();
            return Ok(_mapper.Map<List<UserSpecialtyDto>>(userSpecialties));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<UserSpecialtyDto>> Get(int id)
        {
            var userSpecialty = await _unitOfWork.UserSpecialty.GetByIdAsync(id);
            if (userSpecialty == null)
                return NotFound(new ApiResponse(404, "La especialidad del usuario no existe."));

            return Ok(_mapper.Map<UserSpecialtyDto>(userSpecialty));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserSpecialtyDto>> Post(UserSpecialtyDto dto)
        {
            if (dto == null)
                return BadRequest(new ApiResponse(400));

            var userSpecialty = _mapper.Map<UserSpecialty>(dto);
            _unitOfWork.UserSpecialty.Add(userSpecialty);
            await _unitOfWork.SaveAsync();

            return CreatedAtAction(nameof(Post), new { id = dto.Id }, dto);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put(int id, [FromBody] UserSpecialtyDto dto)
        {
            if (dto == null)
                return BadRequest(new ApiResponse(400, "Datos inválidos."));

            var existing = await _unitOfWork.UserSpecialty.GetByIdAsync(id);
            if (existing == null)
                return NotFound(new ApiResponse(404, "La especialidad del usuario solicitada no existe."));

            var userSpecialty = _mapper.Map<UserSpecialty>(dto);
            _unitOfWork.UserSpecialty.Update(userSpecialty);
            await _unitOfWork.SaveAsync();

            return Ok(dto);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            var userSpecialty = await _unitOfWork.UserSpecialty.GetByIdAsync(id);
            if (userSpecialty == null)
                return NotFound(new ApiResponse(404, "La especialidad del usuario solicitada no existe."));

            _unitOfWork.UserSpecialty.Remove(userSpecialty);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }
    }
}
