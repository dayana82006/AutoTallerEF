using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.DTOs.Entities;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TallerApi.Helpers.Errors;

namespace TallerApi.Controllers
{
    public class VehicleAnormalityController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public VehicleAnormalityController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<VehicleAnormalityDto>>> Get()
        {
            var anormalities = await _unitOfWork.VehicleAnormality.GetAllAsync();
            return Ok(_mapper.Map<List<VehicleAnormalityDto>>(anormalities));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<VehicleAnormalityDto>> Get(int id)
        {
            var anormality = await _unitOfWork.VehicleAnormality.GetByIdAsync(id);
            if (anormality == null)
                return NotFound(new ApiResponse(404, "La anormalidad no existe."));

            return Ok(_mapper.Map<VehicleAnormalityDto>(anormality));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<VehicleAnormalityDto>> Post(VehicleAnormalityDto dto)
        {
            if (dto == null)
                return BadRequest(new ApiResponse(400, "Datos inválidos."));

            var anormality = _mapper.Map<VehicleAnormality>(dto);

            // Asignar fechas a la entidad principal
            anormality.CreatedAt = DateTime.UtcNow;
            anormality.UpdatedAt = DateTime.UtcNow;

            // Asignar fechas a los detalles
            if (anormality.VehicleAnormalityDetails != null)
            {
                foreach (var detail in anormality.VehicleAnormalityDetails)
                {
                    detail.CreatedAt = DateTime.UtcNow;
                    detail.UpdatedAt = DateTime.UtcNow;
                }
            }

            _unitOfWork.VehicleAnormality.Add(anormality);
            await _unitOfWork.SaveAsync();

            var resultDto = _mapper.Map<VehicleAnormalityDto>(anormality);
            return CreatedAtAction(nameof(Get), new { id = anormality.Id }, resultDto);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put(int id, [FromBody] VehicleAnormalityDto dto)
        {
            if (dto == null)
                return BadRequest(new ApiResponse(400, "Datos inválidos."));

            var existingAnormality = await _unitOfWork.VehicleAnormality.GetByIdAsync(id);
            if (existingAnormality == null)
                return NotFound(new ApiResponse(404, "La anormalidad no existe."));

            // ✅ Asignación manual de propiedades
            existingAnormality.Name = dto.Name;
            existingAnormality.EntryDate = dto.CreatedAt;
            existingAnormality.UpdatedAt = DateTime.UtcNow;

            _unitOfWork.VehicleAnormality.Update(existingAnormality);
            await _unitOfWork.SaveAsync();

            return Ok(dto);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            var anormality = await _unitOfWork.VehicleAnormality.GetByIdAsync(id);
            if (anormality == null)
                return NotFound(new ApiResponse(404, "La anormalidad no existe."));

            _unitOfWork.VehicleAnormality.Remove(anormality);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }
    }
}
