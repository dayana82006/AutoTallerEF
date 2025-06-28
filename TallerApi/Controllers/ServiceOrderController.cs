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
    public class ServiceOrderController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ServiceOrderController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<ServiceOrderDto>>> Get()
        {
            var orders = await _unitOfWork.ServiceOrder.GetAllAsync();
            return Ok(_mapper.Map<List<ServiceOrderDto>>(orders));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ServiceOrderDto>> Get(int id)
        {
            var order = await _unitOfWork.ServiceOrder.GetByIdAsync(id);
            if (order == null)
                return NotFound(new ApiResponse(404, "La orden de servicio no existe."));

            return Ok(_mapper.Map<ServiceOrderDto>(order));
        }

        [HttpPost]
        public async Task<ActionResult<ServiceOrderDto>> Post(ServiceOrderDto orderDto)
        {
            if (orderDto == null)
                return BadRequest(new ApiResponse(400));

            var vehicle = await _unitOfWork.Vehicle.GetByIdAsync(orderDto.SerialNumber);
            if (vehicle == null)
                return BadRequest(new ApiResponse(400, "El vehículo especificado no existe."));

            var order = _mapper.Map<ServiceOrder>(orderDto);
            order.VehicleSerialNumber = vehicle.SerialNumber;

            _unitOfWork.ServiceOrder.Add(order);
            await _unitOfWork.SaveAsync();

            var resultDto = _mapper.Map<ServiceOrderDto>(order);
            return CreatedAtAction(nameof(Get), new { id = order.Id }, resultDto);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put(int id, [FromBody] ServiceOrderDto orderDto)
        {
            if (orderDto == null || id != orderDto.Id)
                return BadRequest(new ApiResponse(400, "Datos inválidos o ID inconsistente."));

            var existingOrder = await _unitOfWork.ServiceOrder.GetByIdAsync(id);
            if (existingOrder == null)
                return NotFound(new ApiResponse(404, "La orden de servicio solicitada no existe."));

            // Mapear sobre la entidad existente ya rastreada
            _mapper.Map(orderDto, existingOrder);

            await _unitOfWork.SaveAsync();
            return Ok(orderDto);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            var order = await _unitOfWork.ServiceOrder.GetByIdAsync(id);
            if (order == null)
                return NotFound(new ApiResponse(404, "La orden de servicio solicitada no existe."));

            _unitOfWork.ServiceOrder.Remove(order);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }
    }
}
