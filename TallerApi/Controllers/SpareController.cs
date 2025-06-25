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
    public class SpareController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public SpareController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<SpareDto>>> Get()
        {
            var spares = await _unitOfWork.Spare.GetAllAsync();
            return Ok(_mapper.Map<List<SpareDto>>(spares));
        }

        [HttpGet("{Code}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<SpareDto>> Get(string Code)
        {
            var spare = await _unitOfWork.Spare.GetByIdAsync(Code);
            if (spare == null)
                return NotFound(new ApiResponse(404, "El repuesto no existe."));

            return Ok(_mapper.Map<SpareDto>(spare));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<SpareDto>> Post(SpareDto spareDto)
        {
            if (spareDto == null)
                return BadRequest(new ApiResponse(400));

            var spare = _mapper.Map<Spare>(spareDto);
            _unitOfWork.Spare.Add(spare);
            await _unitOfWork.SaveAsync();

            return CreatedAtAction(nameof(Post), new { id = spareDto.Code }, spareDto);
        }

        [HttpPut("{Code}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put(string Code, [FromBody] SpareDto spareDto)
        {
            if (spareDto == null)
                return BadRequest(new ApiResponse(400, "Datos inválidos."));

            var existingSpare = await _unitOfWork.Spare.GetByIdAsync(Code);
            if (existingSpare == null)
                return NotFound(new ApiResponse(404, "El repuesto solicitado no existe."));

            var spare = _mapper.Map<Spare>(spareDto);
            _unitOfWork.Spare.Update(spare);
            await _unitOfWork.SaveAsync();

            return Ok(spareDto);
        }

        [HttpDelete("{Code}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(string Code)
        {
            var spare = await _unitOfWork.Spare.GetByIdAsync(Code);
            if (spare == null)
                return NotFound(new ApiResponse(404, "El repuesto solicitado no existe."));

            _unitOfWork.Spare.Remove(spare);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }
    }
}
