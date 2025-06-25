using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface ISpareRepostiroy:IGenericRepository<Spare>
    {
        Task<Spare> GetByIdAsync(string Code);
    }
}