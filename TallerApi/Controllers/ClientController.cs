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
 public class ClientsController : BaseApiController
    {
              private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ClientsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<ClientDto>>> Get()
        {
            var clients = await _unitOfWork.Client.GetAllAsync();
            return Ok(_mapper.Map<List<ClientDto>>(clients));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ClientDto>> Get(int id)
        {
            var client = await _unitOfWork.Client.GetByIdAsync(id);
            if (client == null)
            {
                return NotFound(new ApiResponse(404, "El cliente no existe."));
            }

            return Ok(_mapper.Map<ClientDto>(client));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Client>> Post(ClientDto clientDto)
        {
            if (clientDto == null)
            {
                return BadRequest(new ApiResponse(400));
            }

            var client = _mapper.Map<Client>(clientDto);
            _unitOfWork.Client.Add(client);
            await _unitOfWork.SaveAsync();

            return CreatedAtAction(nameof(Post), new { id = clientDto.Id }, clientDto);
        }

[HttpPut("{id}")]
[ProducesResponseType(StatusCodes.Status200OK)]
[ProducesResponseType(StatusCodes.Status404NotFound)]
[ProducesResponseType(StatusCodes.Status400BadRequest)]
public async Task<IActionResult> Put(int id, [FromBody] ClientDto clientDto)
{
    if (clientDto == null || id != clientDto.Id)
        return BadRequest(new ApiResponse(400, "Datos inválidos."));

    var existingClient = await _unitOfWork.Client.GetByIdAsync(id);
    if (existingClient == null)
        return NotFound(new ApiResponse(404, "El cliente solicitado no existe."));

    _mapper.Map(clientDto, existingClient);

    _unitOfWork.Client.Update(existingClient); 
    await _unitOfWork.SaveAsync();

    return Ok(_mapper.Map<ClientDto>(existingClient));
}


        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            var client = await _unitOfWork.Client.GetByIdAsync(id);
            if (client == null)
                return NotFound(new ApiResponse(404, "El cliente solicitado no existe."));

            _unitOfWork.Client.Remove(client);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }
    }
}