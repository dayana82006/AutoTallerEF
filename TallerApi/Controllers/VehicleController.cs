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
    public class VehicleController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public VehicleController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<VehicleDto>>> Get()
        {
            var vehicles = await _unitOfWork.Vehicle.GetAllAsync();
            return Ok(_mapper.Map<List<VehicleDto>>(vehicles));
        }

        [HttpGet("{SerialNumber}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<VehicleDto>> Get(string SerialNumber)
        {
            var vehicle = await _unitOfWork.Vehicle.GetByIdAsync(SerialNumber);
            if (vehicle == null)
                return NotFound(new ApiResponse(404, "El vehículo no existe."));

            return Ok(_mapper.Map<VehicleDto>(vehicle));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<VehicleDto>> Post(VehicleDto dto)
        {
            if (dto == null)
                return BadRequest(new ApiResponse(400));

            var vehicle = _mapper.Map<Vehicle>(dto);
            _unitOfWork.Vehicle.Add(vehicle);
            await _unitOfWork.SaveAsync();

            return CreatedAtAction(nameof(Post), new { dto.SerialNumber }, dto);
        }

        [HttpPut("{SerialNumber}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put(string SerialNumber, [FromBody] VehicleDto dto)
        {
            if (dto == null)
                return BadRequest(new ApiResponse(400, "Datos inválidos."));

            var existingVehicle = await _unitOfWork.Vehicle.GetByIdAsync(SerialNumber);
            if (existingVehicle == null)
                return NotFound(new ApiResponse(404, "El vehículo solicitado no existe."));

            var vehicle = _mapper.Map<Vehicle>(dto);
            _unitOfWork.Vehicle.Update(vehicle);
            await _unitOfWork.SaveAsync();

            return Ok(dto);
        }

        [HttpDelete("{SerialNumber}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(string SerialNumber)
        {
            var vehicle = await _unitOfWork.Vehicle.GetByIdAsync(SerialNumber);
            if (vehicle == null)
                return NotFound(new ApiResponse(404, "El vehículo solicitado no existe."));

            _unitOfWork.Vehicle.Remove(vehicle);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }
    }
}
