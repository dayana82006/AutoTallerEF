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

        // GET: api/serviceorder
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<ServiceOrderDto>>> Get()
        {
            var orders = await _unitOfWork.ServiceOrder.GetAllAsync();
            return Ok(_mapper.Map<List<ServiceOrderDto>>(orders));
        }

        // GET: api/serviceorder/5
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

        // POST: api/serviceorder
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ServiceOrderDto>> Post([FromBody] ServiceOrderDto orderDto)
        {
            if (orderDto == null)
                return BadRequest(new ApiResponse(400));

            var vehicle = await _unitOfWork.Vehicle.GetByIdAsync(orderDto.SerialNumber);
            if (vehicle == null)
                return BadRequest(new ApiResponse(400, "El vehículo especificado no existe."));

            var invoice = await _unitOfWork.Invoice.GetByIdAsync(orderDto.InvoiceId);
            if (invoice == null)
                return BadRequest(new ApiResponse(400, "La factura especificada no existe."));

            var order = _mapper.Map<ServiceOrder>(orderDto);
            order.VehicleSerialNumber = vehicle.SerialNumber;

            _unitOfWork.ServiceOrder.Add(order);
            await _unitOfWork.SaveAsync();

            var invoiceDetail = new InvoiceDetail
            {
                InvoiceId = invoice.Id,
                ServiceOrderId = order.Id,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _unitOfWork.InvoiceDetail.Add(invoiceDetail);
            await _unitOfWork.SaveAsync();

            var resultDto = _mapper.Map<ServiceOrderDto>(order);
            return CreatedAtAction(nameof(Get), new { id = order.Id }, resultDto);
        }

        // PUT: api/serviceorder/5
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

            _mapper.Map(orderDto, existingOrder);

            await _unitOfWork.SaveAsync();
            return Ok(orderDto);
        }

        // DELETE: api/serviceorder/5
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
