namespace Application.DTOs
{
    public class UserMemberDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Lastname { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }

        public string? Role { get; set; } 
        public List<string>? Specialties { get; set; } = new(); 

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public static implicit operator string(UserMemberDto v)
        {
            throw new NotImplementedException();
        }
    }
}
