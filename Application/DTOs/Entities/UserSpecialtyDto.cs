using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.DTOs.Entities
{
    public class UserSpecialtyDto
    {
        public int Id { get; set; }
        public int IdUser { get; set; }
        public int IdSpecialty { get; set; }
    }
}