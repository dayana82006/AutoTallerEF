using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TallerApi.Helpers.Errors
{
    public class UserAuthorization
    {
        public enum Rols
        {
            Administrator,
            Mechanic, 
            Recepcionist
        }
    
     public const Rols rol_predeterminado = Rols.Mechanic;
    }
}