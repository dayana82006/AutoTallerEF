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
                return NotFound(new ApiResponse(404, "El detalle no existe."));

            return Ok(_mapper.Map<VehicleAnormalityDetailDto>(detail));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<VehicleAnormalityDetailDto>> Post([FromBody] VehicleAnormalityDetailDto dto)
        {
            if (dto == null)
                return BadRequest(new ApiResponse(400, "Datos inválidos."));

            var entity = _mapper.Map<VehicleAnormalityDetail>(dto);
            entity.CreatedAt = DateTime.UtcNow;

            _unitOfWork.VehicleAnormalityDetail.Add(entity);
            await _unitOfWork.SaveAsync();

            var resultDto = _mapper.Map<VehicleAnormalityDetailDto>(entity);
            return CreatedAtAction(nameof(Get), new { id = resultDto.Id }, resultDto);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Put(int id, [FromBody] VehicleAnormalityDetailDto dto)
        {
            if (dto == null)
                return BadRequest(new ApiResponse(400, "Datos inválidos."));

            var existing = await _unitOfWork.VehicleAnormalityDetail.GetByIdAsync(id);
            if (existing == null)
                return NotFound(new ApiResponse(404, "El detalle no existe."));

            existing.IdAnormality = dto.IdAnormality;
            existing.SerialNumber = dto.SerialNumber;
            existing.UpdatedAt = DateTime.UtcNow;

            _unitOfWork.VehicleAnormalityDetail.Update(existing);
            await _unitOfWork.SaveAsync();

            return Ok(_mapper.Map<VehicleAnormalityDetailDto>(existing));
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            var existing = await _unitOfWork.VehicleAnormalityDetail.GetByIdAsync(id);
            if (existing == null)
                return NotFound(new ApiResponse(404, "El detalle no existe."));

            _unitOfWork.VehicleAnormalityDetail.Remove(existing);
            await _unitOfWork.SaveAsync();

            return NoContent();
        }
    }
}
