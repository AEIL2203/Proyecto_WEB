using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using MarcadorBaloncesto.Models;

namespace MarcadorBaloncesto.Controllers
{
    [ApiController]
    [Authorize] // Todos los controladores que hereden de este requerirán autenticación
    public class BaseController : ControllerBase
    {
        protected User? CurrentUser 
        {
            get 
            {
                var user = HttpContext.Items["User"] as User;
                if (user == null)
                {
                    var logger = HttpContext.RequestServices.GetRequiredService<ILogger<BaseController>>();
                    logger.LogWarning("No se pudo obtener el usuario actual del contexto");
                }
                return user;
            }
        }
        
        protected IActionResult HandleError(string message, int statusCode = 400)
        {
            return statusCode switch
            {
                400 => BadRequest(new { message }),
                401 => Unauthorized(new { message = "No autorizado" }),
                403 => StatusCode(403, new { message = "No tiene permisos para realizar esta acción" }),
                404 => NotFound(new { message }),
                _ => StatusCode(500, new { message = "Error interno del servidor" })
            };
        }
    }
}
