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
    public class VehicleTypeController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public VehicleTypeController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<VehicleTypeDto>>> Get()
        {
            var types = await _unitOfWork.VehicleType.GetAllAsync();
            return Ok(_mapper.Map<List<VehicleTypeDto>>(types));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<VehicleTypeDto>> Get(int id)
        {
            var type = await _unitOfWork.VehicleType.GetByIdAsync(id);
            if (type == null)
                return NotFound(new ApiResponse(404, "El tipo de vehículo no existe."));

            return Ok(_mapper.Map<VehicleTypeDto>(type));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<VehicleTypeDto>> Post(VehicleTypeDto dto)
        {
            if (dto == null)
                return BadRequest(new ApiResponse(400));

            var entity = _mapper.Map<VehicleType>(dto);
            _unitOfWork.VehicleType.Add(entity);
            await _unitOfWork.SaveAsync();

            return CreatedAtAction(nameof(Post), new { id = dto.Id }, dto);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put(int id, [FromBody] VehicleTypeDto dto)
        {
            if (dto == null)
                return BadRequest(new ApiResponse(400, "Datos inválidos."));

            var existing = await _unitOfWork.VehicleType.GetByIdAsync(id);
            if (existing == null)
                return NotFound(new ApiResponse(404, "El tipo de vehículo solicitado no existe."));

            var entity = _mapper.Map<VehicleType>(dto);
            _unitOfWork.VehicleType.Update(entity);
            await _unitOfWork.SaveAsync();

            return Ok(dto);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            var type = await _unitOfWork.VehicleType.GetByIdAsync(id);
            if (type == null)
                return NotFound(new ApiResponse(404, "El tipo de vehículo solicitado no existe."));

            _unitOfWork.VehicleType.Remove(type);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }
    }
}
