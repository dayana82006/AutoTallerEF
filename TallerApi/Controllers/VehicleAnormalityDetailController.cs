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
    public class VehicleAnormalityDetailController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public VehicleAnormalityDetailController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<VehicleAnormalityDetailDto>>> Get()
        {
            var details = await _unitOfWork.VehicleAnormalityDetail.GetAllAsync();
            return Ok(_mapper.Map<List<VehicleAnormalityDetailDto>>(details));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<VehicleAnormalityDetailDto>> Get(int id)
        {
            var detail = await _unitOfWork.VehicleAnormalityDetail.GetByIdAsync(id);
            if (detail == null)
                return NotFound(new ApiResponse(404, "El detalle de anormalidad del vehículo no existe."));

            return Ok(_mapper.Map<VehicleAnormalityDetailDto>(detail));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<VehicleAnormalityDetailDto>> Post(VehicleAnormalityDetailDto dto)
        {
            if (dto == null)
                return BadRequest(new ApiResponse(400));

            var detail = _mapper.Map<VehicleAnormalityDetail>(dto);
            _unitOfWork.VehicleAnormalityDetail.Add(detail);
            await _unitOfWork.SaveAsync();

            return CreatedAtAction(nameof(Post), new { id = dto.Id }, dto);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put(int id, [FromBody] VehicleAnormalityDetailDto dto)
        {
            if (dto == null)
                return BadRequest(new ApiResponse(400, "Datos inválidos."));

            var existing = await _unitOfWork.VehicleAnormalityDetail.GetByIdAsync(id);
            if (existing == null)
                return NotFound(new ApiResponse(404, "El detalle solicitado no existe."));

            var detail = _mapper.Map<VehicleAnormalityDetail>(dto);
            _unitOfWork.VehicleAnormalityDetail.Update(detail);
            await _unitOfWork.SaveAsync();

            return Ok(dto);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            var detail = await _unitOfWork.VehicleAnormalityDetail.GetByIdAsync(id);
            if (detail == null)
                return NotFound(new ApiResponse(404, "El detalle solicitado no existe."));

            _unitOfWork.VehicleAnormalityDetail.Remove(detail);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }
    }
}
