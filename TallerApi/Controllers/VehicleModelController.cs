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
    public class VehicleModelController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public VehicleModelController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<VehicleModelDto>>> Get()
        {
            var models = await _unitOfWork.VehicleModel.GetAllAsync();
            return Ok(_mapper.Map<List<VehicleModelDto>>(models));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<VehicleModelDto>> Get(int id)
        {
            var model = await _unitOfWork.VehicleModel.GetByIdAsync(id);
            if (model == null)
                return NotFound(new ApiResponse(404, "El modelo de vehículo no existe."));

            return Ok(_mapper.Map<VehicleModelDto>(model));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<VehicleModelDto>> Post(VehicleModelDto dto)
        {
            if (dto == null)
                return BadRequest(new ApiResponse(400));

            var entity = _mapper.Map<VehicleModel>(dto);
            _unitOfWork.VehicleModel.Add(entity);
            await _unitOfWork.SaveAsync();

            return CreatedAtAction(nameof(Post), new { id = dto.Id }, dto);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put(int id, [FromBody] VehicleModelDto dto)
        {
            if (dto == null)
                return BadRequest(new ApiResponse(400, "Datos inválidos."));

            var existing = await _unitOfWork.VehicleModel.GetByIdAsync(id);
            if (existing == null)
                return NotFound(new ApiResponse(404, "El modelo solicitado no existe."));

            var entity = _mapper.Map<VehicleModel>(dto);
            _unitOfWork.VehicleModel.Update(entity);
            await _unitOfWork.SaveAsync();

            return Ok(dto);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            var model = await _unitOfWork.VehicleModel.GetByIdAsync(id);
            if (model == null)
                return NotFound(new ApiResponse(404, "El modelo solicitado no existe."));

            _unitOfWork.VehicleModel.Remove(model);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }
    }
}
