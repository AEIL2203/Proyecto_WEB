using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using MarcadorBaloncesto.Services;

namespace MarcadorBaloncesto.Middleware
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IConfiguration _configuration;
        private readonly IAuthService _authService;

        public JwtMiddleware(RequestDelegate next, IConfiguration configuration, IAuthService authService)
        {
            _next = next;
            _configuration = configuration;
            _authService = authService;
        }

        public async Task Invoke(HttpContext context)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
                await AttachUserToContext(context, token);

            await _next(context);
        }

        private async Task AttachUserToContext(HttpContext context, string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var secret = _configuration["Jwt:Secret"];
                if (string.IsNullOrEmpty(secret))
                {
                    throw new InvalidOperationException("JWT Secret is not configured");
                }

                var key = Encoding.ASCII.GetBytes(secret);

                var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = validatedToken as JwtSecurityToken;
                if (jwtToken == null)
                {
                    return;
                }

                var userIdClaim = principal.Claims.FirstOrDefault(x => x.Type == "id")?.Value;
                if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                {
                    return;
                }

                // Adjuntar el usuario al contexto para acceder desde los controladores
                context.Items["User"] = await _authService.GetUserById(userId);
            }
            catch (Exception ex)
            {
                // No hacer nada si el token no es válido
                // El usuario no estará autenticado
                var logger = context.RequestServices.GetRequiredService<ILogger<JwtMiddleware>>();
                logger.LogError(ex, "Error al validar el token JWT");
            }
        }
    }

    public static class JwtMiddlewareExtensions
    {
        public static IApplicationBuilder UseJwtMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<JwtMiddleware>();
        }
    }
}
