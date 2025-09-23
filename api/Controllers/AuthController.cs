using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using MarcadorBaloncesto.Models;
using MarcadorBaloncesto.Services;

namespace MarcadorBaloncesto.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : BaseController
    {
        private readonly IAuthService _authService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IAuthService authService, ILogger<AuthController> logger)
        {
            _authService = authService ?? throw new ArgumentNullException(nameof(authService));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] UserLoginDto userDto)
        {
            try
            {
                var token = await _authService.Authenticate(userDto.Username, userDto.Password);

                if (token == null)
                    return Unauthorized(new { message = "Usuario o contraseña incorrectos" });

                _logger.LogInformation("Inicio de sesión exitoso para el usuario: {Username}", userDto.Username);
                return Ok(token);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error durante el inicio de sesión para el usuario: {Username}", userDto.Username);
                return StatusCode(500, new { message = "Error interno del servidor" });
            }
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUser()
        {
            if (CurrentUser == null)
                return Unauthorized();

            try
            {
                var user = await _authService.GetUserById(CurrentUser.Id);
                if (user == null)
                    return NotFound(new { message = "Usuario no encontrado" });

                // No devolver la contraseña
                user.Password = "";
                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener el usuario actual");
                return StatusCode(500, new { message = "Error interno del servidor" });
            }
        }

        [HttpPost("register")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto userDto)
        {
            try
            {
                if (await _authService.UserExists(userDto.Username))
                    return BadRequest(new { message = "El nombre de usuario ya está en uso" });

                var user = new User
                {
                    Username = userDto.Username,
                    Password = "", // Se establecerá correctamente en el servicio
                    Role = userDto.Role ?? "User",
                    CreatedBy = CurrentUser?.Id
                };

                var registeredUser = await _authService.Register(user, userDto.Password);
                
                // No devolver la contraseña
                registeredUser.Password = "";

                return CreatedAtAction(nameof(GetUser), new { id = registeredUser.Id }, registeredUser);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al registrar el usuario: {Username}", userDto.Username);
                return StatusCode(500, new { message = "Error interno del servidor al registrar el usuario" });
            }
        }

        [HttpGet("users/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUser(int id)
        {
            try
            {
                var user = await _authService.GetUserById(id);
                if (user == null)
                    return NotFound(new { message = "Usuario no encontrado" });

                // No devolver la contraseña
                user.Password = "";
                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener el usuario con ID: {UserId}", id);
                return StatusCode(500, new { message = "Error interno del servidor" });
            }
        }
    }

    public class UserRegisterDto
    {
        [Required(ErrorMessage = "El nombre de usuario es requerido")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "El nombre de usuario debe tener entre 3 y 50 caracteres")]
        public required string Username { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "La contraseña es requerida")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "La contraseña debe tener al menos 6 caracteres")]
        public required string Password { get; set; } = string.Empty;
        
        [StringLength(20, ErrorMessage = "El rol no puede tener más de 20 caracteres")]
        public string? Role { get; set; } = "User";
    }
}
