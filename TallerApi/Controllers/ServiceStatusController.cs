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
    public class ServiceStatusController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ServiceStatusController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<ServiceStatusDto>>> Get()
        {
            var statuses = await _unitOfWork.ServiceStatus.GetAllAsync();
            return Ok(_mapper.Map<List<ServiceStatusDto>>(statuses));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ServiceStatusDto>> Get(int id)
        {
            var status = await _unitOfWork.ServiceStatus.GetByIdAsync(id);
            if (status == null)
                return NotFound(new ApiResponse(404, "El estado de servicio no existe."));

            return Ok(_mapper.Map<ServiceStatusDto>(status));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ServiceStatusDto>> Post(ServiceStatusDto statusDto)
        {
            if (statusDto == null)
                return BadRequest(new ApiResponse(400));

            var status = _mapper.Map<ServiceStatus>(statusDto);
            _unitOfWork.ServiceStatus.Add(status);
            await _unitOfWork.SaveAsync();

            return CreatedAtAction(nameof(Post), new { id = statusDto.Id }, statusDto);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put(int id, [FromBody] ServiceStatusDto statusDto)
        {
            if (statusDto == null)
                return BadRequest(new ApiResponse(400, "Datos inválidos."));

            var existingStatus = await _unitOfWork.ServiceStatus.GetByIdAsync(id);
            if (existingStatus == null)
                return NotFound(new ApiResponse(404, "El estado de servicio solicitado no existe."));

            var status = _mapper.Map<ServiceStatus>(statusDto);
            _unitOfWork.ServiceStatus.Update(status);
            await _unitOfWork.SaveAsync();

            return Ok(statusDto);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            var status = await _unitOfWork.ServiceStatus.GetByIdAsync(id);
            if (status == null)
                return NotFound(new ApiResponse(404, "El estado de servicio solicitado no existe."));

            _unitOfWork.ServiceStatus.Remove(status);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }
    }
}
