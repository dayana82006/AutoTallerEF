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

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<OrderDetailDto>>> Get()
        {
            var details = await _unitOfWork.OrderDetail.GetAllAsync();
            return Ok(_mapper.Map<List<OrderDetailDto>>(details));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<OrderDetailDto>> Get(int id)
        {
            var detail = await _unitOfWork.OrderDetail.GetByIdAsync(id);
            if (detail == null)
                return NotFound(new ApiResponse(404, "El detalle de orden no existe."));

            return Ok(_mapper.Map<OrderDetailDto>(detail));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<OrderDetailDto>> Post(OrderDetailDto detailDto)
        {
            if (detailDto == null)
                return BadRequest(new ApiResponse(400));

            var detail = _mapper.Map<OrderDetail>(detailDto);
            _unitOfWork.OrderDetail.Add(detail);
            await _unitOfWork.SaveAsync();

            return CreatedAtAction(nameof(Post), new { id = detailDto.Id }, detailDto);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put(int id, [FromBody] OrderDetailDto detailDto)
        {
            if (detailDto == null)
                return BadRequest(new ApiResponse(400, "Datos inválidos."));

            var existing = await _unitOfWork.OrderDetail.GetByIdAsync(id);
            if (existing == null)
                return NotFound(new ApiResponse(404, "El detalle de orden solicitado no existe."));

            var detail = _mapper.Map<OrderDetail>(detailDto);
            _unitOfWork.OrderDetail.Update(detail);
            await _unitOfWork.SaveAsync();

            return Ok(detailDto);
        }

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
