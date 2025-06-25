using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.DTOs.Entities;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using TallerApi.Helpers.Errors;

namespace TallerApi.Controllers
{
public class InvoiceController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public InvoiceController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<InvoiceDto>>> Get()
        {
            var invoices = await _unitOfWork.Invoice.GetAllAsync();
            return Ok(_mapper.Map<List<InvoiceDto>>(invoices));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<InvoiceDto>> Get(int id)
        {
            var invoice = await _unitOfWork.Invoice.GetByIdAsync(id);
            if (invoice == null)
            {
                return NotFound(new ApiResponse(404, "La factura no existe."));
            }

            return Ok(_mapper.Map<InvoiceDto>(invoice));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Invoice>> Post(InvoiceDto invoiceDto)
        {
            if (invoiceDto == null)
            {
                return BadRequest(new ApiResponse(400));
            }

            var invoice = _mapper.Map<Invoice>(invoiceDto);
            _unitOfWork.Invoice.Add(invoice);
            await _unitOfWork.SaveAsync();

            return CreatedAtAction(nameof(Post), new { id = invoiceDto.Id }, invoiceDto);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put(int id, [FromBody] InvoiceDto invoiceDto)
        {
            if (invoiceDto == null)
                return BadRequest(new ApiResponse(400, "Datos inválidos."));

            var existingInvoice = await _unitOfWork.Invoice.GetByIdAsync(id);
            if (existingInvoice == null)
                return NotFound(new ApiResponse(404, "La factura solicitada no existe."));

            var invoice = _mapper.Map<Invoice>(invoiceDto);
            _unitOfWork.Invoice.Update(invoice);
            await _unitOfWork.SaveAsync();

            return Ok(invoiceDto);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            var invoice = await _unitOfWork.Invoice.GetByIdAsync(id);
            if (invoice == null)
                return NotFound(new ApiResponse(404, "La factura solicitada no existe."));

            _unitOfWork.Invoice.Remove(invoice);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }
    }
}