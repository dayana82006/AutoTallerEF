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
    public class ServiceTypeController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ServiceTypeController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<ServiceTypeDto>>> Get()
        {
            var types = await _unitOfWork.ServiceType.GetAllAsync();
            return Ok(_mapper.Map<List<ServiceTypeDto>>(types));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ServiceTypeDto>> Get(int id)
        {
            var type = await _unitOfWork.ServiceType.GetByIdAsync(id);
            if (type == null)
                return NotFound(new ApiResponse(404, "El tipo de servicio no existe."));

            return Ok(_mapper.Map<ServiceTypeDto>(type));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ServiceTypeDto>> Post(ServiceTypeDto typeDto)
        {
            if (typeDto == null)
                return BadRequest(new ApiResponse(400));

            var type = _mapper.Map<ServiceType>(typeDto);
            _unitOfWork.ServiceType.Add(type);
            await _unitOfWork.SaveAsync();

            return CreatedAtAction(nameof(Post), new { id = typeDto.Id }, typeDto);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put(int id, [FromBody] ServiceTypeDto typeDto)
        {
            if (typeDto == null)
                return BadRequest(new ApiResponse(400, "Datos inválidos."));

            var existingType = await _unitOfWork.ServiceType.GetByIdAsync(id);
            if (existingType == null)
                return NotFound(new ApiResponse(404, "El tipo de servicio solicitado no existe."));

            var type = _mapper.Map<ServiceType>(typeDto);
            _unitOfWork.ServiceType.Update(type);
            await _unitOfWork.SaveAsync();

            return Ok(typeDto);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            var type = await _unitOfWork.ServiceType.GetByIdAsync(id);
            if (type == null)
                return NotFound(new ApiResponse(404, "El tipo de servicio solicitado no existe."));

            _unitOfWork.ServiceType.Remove(type);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }
    }
}
