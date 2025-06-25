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

         public class BrandController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public BrandController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<BrandDto>>> Get()
        {
            var brands = await _unitOfWork.Brand.GetAllAsync();
            return Ok(_mapper.Map<List<BrandDto>>(brands));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<BrandDto>> Get(int id)
        {
            var brand = await _unitOfWork.Brand.GetByIdAsync(id);
            if (brand == null)
            {
                return NotFound(new ApiResponse(404, "La marca no existe."));
            }

            return Ok(_mapper.Map<BrandDto>(brand));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Brand>> Post(BrandDto brandDto)
        {
            if (brandDto == null)
            {
                return BadRequest(new ApiResponse(400));
            }

            var brand = _mapper.Map<Brand>(brandDto);
            _unitOfWork.Brand.Add(brand);
            await _unitOfWork.SaveAsync();

            return CreatedAtAction(nameof(Post), new { id = brandDto.Id }, brandDto);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Put(int id, [FromBody] BrandDto brandDto)
        {
            if (brandDto == null)
                return BadRequest(new ApiResponse(400, "Datos inválidos."));

            var existingBrand = await _unitOfWork.Brand.GetByIdAsync(id);
            if (existingBrand == null)
                return NotFound(new ApiResponse(404, "La marca solicitada no existe."));

            var brand = _mapper.Map<Brand>(brandDto);
            _unitOfWork.Brand.Update(brand);
            await _unitOfWork.SaveAsync();

            return Ok(brandDto);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            var brand = await _unitOfWork.Brand.GetByIdAsync(id);
            if (brand == null)
                return NotFound(new ApiResponse(404, "La marca solicitada no existe."));

            _unitOfWork.Brand.Remove(brand);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }
    }
    }
