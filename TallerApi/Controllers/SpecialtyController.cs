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
    public class SpecialtyController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public SpecialtyController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<SpecialityDto>>> Get()
        {
            var specialties = await _unitOfWork.Specialty.GetAllAsync();
            return Ok(_mapper.Map<List<SpecialityDto>>(specialties));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<SpecialityDto>> Get(int id)
        {
            var specialty = await _unitOfWork.Specialty.GetByIdAsync(id);
            if (specialty == null)
                return NotFound(new ApiResponse(404, "La especialidad no existe."));

            return Ok(_mapper.Map<SpecialityDto>(specialty));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<SpecialityDto>> Post(SpecialityDto specialtyDto)
        {
            if (specialtyDto == null)
                return BadRequest(new ApiResponse(400));

            var specialty = _mapper.Map<Specialty>(specialtyDto);
            _unitOfWork.Specialty.Add(specialty);
            await _unitOfWork.SaveAsync();

            return CreatedAtAction(nameof(Post), new { id = specialtyDto.Id }, specialtyDto);
        }

[HttpPut("{id}")]
[ProducesResponseType(StatusCodes.Status200OK)]
[ProducesResponseType(StatusCodes.Status404NotFound)]
[ProducesResponseType(StatusCodes.Status400BadRequest)]
public async Task<IActionResult> Put(int id, [FromBody] SpecialityDto specialtyDto)
{
    if (specialtyDto == null)
        return BadRequest(new ApiResponse(400, "Datos inválidos."));

    var existingSpecialty = await _unitOfWork.Specialty.GetByIdAsync(id);
    if (existingSpecialty == null)
        return NotFound(new ApiResponse(404, "La especialidad solicitada no existe."));

    // Actualiza propiedades manualmente o usa el mapper sobre el objeto existente
    _mapper.Map(specialtyDto, existingSpecialty);
    existingSpecialty.UpdatedAt = DateTime.UtcNow;

    _unitOfWork.Specialty.Update(existingSpecialty);
    await _unitOfWork.SaveAsync();

    return Ok(specialtyDto);
}


        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            var specialty = await _unitOfWork.Specialty.GetByIdAsync(id);
            if (specialty == null)
                return NotFound(new ApiResponse(404, "La especialidad solicitada no existe."));

            _unitOfWork.Specialty.Remove(specialty);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }
    }
}
