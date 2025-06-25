using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TallerApi.Helpers.Errors
{
    public class ApiResponse
    {
        public int StatusCode { get; set; }
        public string? Message { get; set; }

        public ApiResponse(int statusCode, string? message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessage(statusCode);
        }

        private string GetDefaultMessage(int statusCode)
        {
            return statusCode switch
            {
                400 => "Bad Request",
                404 => "Not Found",
                500 => "Internal Server Error",
                _ => null
            };
        }
    }
}