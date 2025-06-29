using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.DTOs.Entities;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using TallerApi.Helpers.Errors;

namespace TallerApi.Controllers
{
    public class FuelTypeController:BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public FuelTypeController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<FuelTypeDto>>> Get()
        {
            var fuelTypes = await _unitOfWork.FuelType.GetAllAsync();
            return Ok(_mapper.Map<List<FuelTypeDto>>(fuelTypes));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<FuelTypeDto>> Get(int id)
        {
            var fuelType = await _unitOfWork.FuelType.GetByIdAsync(id);
            if (fuelType == null)
            {
                return NotFound(new ApiResponse(404, "El tipo de combustible no existe."));
            }

            return Ok(_mapper.Map<FuelTypeDto>(fuelType));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<FuelType>> Post(FuelTypeDto fuelTypeDto)
        {
            if (fuelTypeDto == null)
            {
                return BadRequest(new ApiResponse(400));
            }

            var fuelType = _mapper.Map<FuelType>(fuelTypeDto);
            _unitOfWork.FuelType.Add(fuelType);
            await _unitOfWork.SaveAsync();

            return CreatedAtAction(nameof(Post), new { id = fuelTypeDto.Id }, fuelTypeDto);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put(int id, [FromBody] FuelTypeDto fuelTypeDto)
        {
            if (fuelTypeDto == null)
                return BadRequest(new ApiResponse(400, "Datos inválidos."));

            var existingFuelType = await _unitOfWork.FuelType.GetByIdAsync(id);
            if (existingFuelType == null)
                return NotFound(new ApiResponse(404, "El tipo de combustible solicitado no existe."));

            var fuelType = _mapper.Map<FuelType>(fuelTypeDto);
            _unitOfWork.FuelType.Update(fuelType);
            await _unitOfWork.SaveAsync();

            return Ok(fuelTypeDto);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            var fuelType = await _unitOfWork.FuelType.GetByIdAsync(id);
            if (fuelType == null)
                return NotFound(new ApiResponse(404, "El tipo de combustible solicitado no existe."));

            _unitOfWork.FuelType.Remove(fuelType);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }
    }
}