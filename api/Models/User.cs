using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MarcadorBaloncesto.Models
{
    public class User
    {
        public int Id { get; set; }
        
        [Required]
        public required string Username { get; set; }
        
        [Required]
        [JsonIgnore]
        public required string Password { get; set; }
        
        public string Role { get; set; } = "User";
        public int? CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int? UpdatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? LastLogin { get; set; }
        public bool IsActive { get; set; } = true;
    }

    public class UserLoginDto
    {
        [Required]
        public required string Username { get; set; } = string.Empty;
        
        [Required]
        public required string Password { get; set; } = string.Empty;
    }

    public class UserTokenDto
    {
        public required string Token { get; set; }
        public DateTime Expiration { get; set; }
        public required string Role { get; set; }
    }

    public class UserRegisterDto
    {
        [Required]
        public required string Username { get; set; } = string.Empty;
        
        [Required]
        public required string Password { get; set; } = string.Empty;
        
        public string Role { get; set; } = "User";
    }
}
