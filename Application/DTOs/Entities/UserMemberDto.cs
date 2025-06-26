namespace Application.DTOs
{
    public class UserMemberDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Lastname { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public List<string>? Roles { get; set; }
        public List<string>? Specialties { get; set; }

    }
}
