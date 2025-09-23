using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Dapper;
using Microsoft.Data.SqlClient;
using MarcadorBaloncesto.Models;
using Microsoft.Extensions.Configuration;
using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography;

namespace MarcadorBaloncesto.Services
{
    public interface IAuthService
    {
        Task<UserTokenDto?> Authenticate(string username, string password);
        Task<User?> GetUserById(int id);
        Task<User> Register(User user, string password);
        Task<bool> UserExists(string username);
    }

    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public AuthService(IConfiguration configuration, string connectionString)
        {
            _configuration = configuration;
            _connectionString = connectionString;
            
            if (string.IsNullOrEmpty(_connectionString))
                throw new ArgumentNullException(nameof(connectionString), "La cadena de conexión no puede ser nula o vacía");
        }

        public async Task<UserTokenDto?> Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;
                
            using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();
            
            var user = await connection.QueryFirstOrDefaultAsync<User>(
                "SELECT * FROM core.Users WHERE Username = @Username AND IsActive = 1",
                new { Username = username });

            if (user == null || string.IsNullOrEmpty(user.Password) || !BCrypt.Net.BCrypt.Verify(password, user.Password))
                return null;

            await connection.ExecuteAsync(
                "UPDATE core.Users SET LastLogin = @LastLogin WHERE Id = @Id",
                new { user.Id, LastLogin = DateTime.UtcNow });

            // Actualizar LastLogin en el objeto usuario
            user.LastLogin = DateTime.UtcNow;

            var token = GenerateJwtToken(user);

            return new UserTokenDto
            {
                Token = token,
                Expiration = DateTime.UtcNow.AddDays(7),
                Role = user.Role
            };
        }

        public async Task<User?> GetUserById(int id)
        {
            if (id <= 0)
                return null;
                
            using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();
            
            return await connection.QueryFirstOrDefaultAsync<User>(
                "SELECT * FROM core.Users WHERE Id = @Id",
                new { Id = id });
        }

        public async Task<User> Register(User user, string password)
        {
            if (await UserExists(user.Username))
                throw new ValidationException("El nombre de usuario ya existe");

            // Configurar propiedades del usuario
            user.CreatedAt = DateTime.UtcNow;
            user.IsActive = true;
            
            // Hashear la contraseña una sola vez
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);

            using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();

            var userId = await connection.ExecuteScalarAsync<int>(
                "INSERT INTO core.Users (Username, Password, Role, CreatedBy, CreatedAt, IsActive) " +
                "OUTPUT INSERTED.Id " +
                "VALUES (@Username, @Password, @Role, @CreatedBy, @CreatedAt, @IsActive)",
                new {
                    user.Username,
                    Password = hashedPassword,
                    user.Role,
                    user.CreatedBy,
                    user.CreatedAt,
                    user.IsActive
                });

            user.Id = userId;
            
            // No devolver la contraseña
            user.Password = "";
            return user;
        }

        public async Task<bool> UserExists(string username)
        {
            using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();
            
            return await connection.ExecuteScalarAsync<bool>(
                "SELECT COUNT(1) FROM core.Users WHERE Username = @Username",
                new { Username = username });
        }

        private string GenerateJwtToken(User user)
        {
            if (user == null)
                throw new ArgumentNullException(nameof(user));

            var tokenHandler = new JwtSecurityTokenHandler();
            var secret = _configuration["Jwt:Secret"];
            
            if (string.IsNullOrEmpty(secret))
                throw new InvalidOperationException("JWT Secret is not configured");
                
            var key = Encoding.ASCII.GetBytes(secret);
            
            var claims = new List<Claim>
            {
                new Claim("id", user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username ?? string.Empty),
                new Claim(ClaimTypes.Role, user.Role ?? "User"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64)
            };

            var issuer = _configuration["Jwt:Issuer"];
            var audience = _configuration["Jwt:Audience"];
            
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key), 
                    SecurityAlgorithms.HmacSha256Signature)
            };
            
            if (!string.IsNullOrEmpty(issuer))
                tokenDescriptor.Issuer = issuer;
                
            if (!string.IsNullOrEmpty(audience))
                tokenDescriptor.Audience = audience;

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
