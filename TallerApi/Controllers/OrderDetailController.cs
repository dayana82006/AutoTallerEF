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
    public class OrderDetailController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public OrderDetailController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        // GET: api/orderdetail
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<OrderDetailDto>>> Get()
        {
            var details = await _unitOfWork.OrderDetail.GetAllAsync();
            var detailDtos = _mapper.Map<List<OrderDetailDto>>(details);
            return Ok(detailDtos);
        }

        // GET: api/orderdetail/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<OrderDetailDto>> Get(int id)
        {
            var detail = await _unitOfWork.OrderDetail.GetByIdAsync(id);
            if (detail == null)
                return NotFound(new ApiResponse(404, "El detalle de orden no existe."));

            var detailDto = _mapper.Map<OrderDetailDto>(detail);
            return Ok(detailDto);
        }

        // POST: api/orderdetail
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<OrderDetailDto>> Post(OrderDetailDto detailDto)
        {
            if (detailDto == null)
                return BadRequest(new ApiResponse(400, "Datos inválidos."));

            var detail = _mapper.Map<OrderDetail>(detailDto);
            _unitOfWork.OrderDetail.Add(detail);
            await _unitOfWork.SaveAsync();

            detailDto.Id = detail.Id; // Asegura que devuelves el ID generado
            return CreatedAtAction(nameof(Get), new { id = detailDto.Id }, detailDto);
        }

        // PUT: api/orderdetail/5
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put(int id, [FromBody] OrderDetailDto detailDto)
        {
            if (detailDto == null || id != detailDto.Id)
                return BadRequest(new ApiResponse(400, "Datos inválidos o ID no coincide."));

            var existing = await _unitOfWork.OrderDetail.GetByIdAsync(id);
            if (existing == null)
                return NotFound(new ApiResponse(404, "El detalle de orden solicitado no existe."));

            var detail = _mapper.Map<OrderDetail>(detailDto);
            _unitOfWork.OrderDetail.Update(detail);
            await _unitOfWork.SaveAsync();

            return Ok(detailDto);
        }

        // DELETE: api/orderdetail/5
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            var detail = await _unitOfWork.OrderDetail.GetByIdAsync(id);
            if (detail == null)
                return NotFound(new ApiResponse(404, "El detalle de orden solicitado no existe."));

            _unitOfWork.OrderDetail.Remove(detail);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }
    }
}
