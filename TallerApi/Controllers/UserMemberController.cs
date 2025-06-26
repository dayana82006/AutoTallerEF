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
using TallerApi.Controllers;
using Application.DTOs;
public class UserMemberController : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    public UserMemberController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<IEnumerable<UserMemberDto>>> Get()
    {
        var UserMembers = await _unitOfWork.Client.GetAllAsync();
        return Ok(_mapper.Map<List<UserMemberDto>>(UserMembers));
    }
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ClientDto>> Get(int id)
    {
        var user = await _unitOfWork.Client.GetByIdAsync(id);
        if (user == null)
        {
            return NotFound(new ApiResponse(404, "El Usuario no existe."));
        }

        return Ok(_mapper.Map<UserMemberDto>(user));
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<UserMember>> Post(UserMemberDto usermemberDto)
    {
        if (usermemberDto == null)
        {
            return BadRequest(new ApiResponse(400));
        }

        var user = _mapper.Map<UserMember>(usermemberDto);
        _unitOfWork.UserMember.Add(user);
        await _unitOfWork.SaveAsync();

        return CreatedAtAction(nameof(Post), new { id = usermemberDto.Id }, usermemberDto);
    }


    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Put(int id, [FromBody] UserMemberDto usermemberDto)
    {
        if (usermemberDto == null)
            return BadRequest(new ApiResponse(400, "Datos inválidos."));

        var existingUser = await _unitOfWork.Client.GetByIdAsync(id);
        if (existingUser == null)
            return NotFound(new ApiResponse(404, "El usuario solicitado no existe."));

        var user = _mapper.Map<UserMember>(usermemberDto);
        _unitOfWork.UserMember.Update(user);
        await _unitOfWork.SaveAsync();

        return Ok(usermemberDto);
    }
     [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _unitOfWork.UserMember.GetByIdAsync(id);
            if (user == null)
                return NotFound(new ApiResponse(404, "El usuario solicitado no existe."));

            _unitOfWork.UserMember.Remove(user);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }


}
