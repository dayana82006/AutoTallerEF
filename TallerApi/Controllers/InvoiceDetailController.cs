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
public class InvoiceDetailController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public InvoiceDetailController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<InvoiceDetailDto>>> Get()
        {
            var details = await _unitOfWork.InvoiceDetail.GetAllAsync();
            return Ok(_mapper.Map<List<InvoiceDetailDto>>(details));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<InvoiceDetailDto>> Get(int id)
        {
            var detail = await _unitOfWork.InvoiceDetail.GetByIdAsync(id);
            if (detail == null)
            {
                return NotFound(new ApiResponse(404, "El detalle de factura no existe."));
            }

            return Ok(_mapper.Map<InvoiceDetailDto>(detail));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<InvoiceDetail>> Post(InvoiceDetailDto detailDto)
        {
            if (detailDto == null)
            {
                return BadRequest(new ApiResponse(400));
            }

            var detail = _mapper.Map<InvoiceDetail>(detailDto);
            _unitOfWork.InvoiceDetail.Add(detail);
            await _unitOfWork.SaveAsync();

            return CreatedAtAction(nameof(Post), new { id = detailDto.Id }, detailDto.Id);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put(int id, [FromBody] InvoiceDetailDto detailDto)
        {
            if (detailDto == null)
                return BadRequest(new ApiResponse(400, "Datos inválidos."));

            var existingDetail = await _unitOfWork.InvoiceDetail.GetByIdAsync(id);
            if (existingDetail == null)
                return NotFound(new ApiResponse(404, "El detalle de factura solicitado no existe."));

            var detail = _mapper.Map<InvoiceDetail>(detailDto);
            _unitOfWork.InvoiceDetail.Update(detail);
            await _unitOfWork.SaveAsync();

            return Ok(detailDto);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            var detail = await _unitOfWork.InvoiceDetail.GetByIdAsync(id);
            if (detail == null)
                return NotFound(new ApiResponse(404, "El detalle de factura solicitado no existe."));

            _unitOfWork.InvoiceDetail.Remove(detail);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }
    }


}