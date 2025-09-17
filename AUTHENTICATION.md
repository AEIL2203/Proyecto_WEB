# Sistema de Autenticación - Marcador de Baloncesto

Este documento explica cómo configurar y utilizar el sistema de autenticación JWT implementado en la aplicación Marcador de Baloncesto.

## Requisitos Previos

- .NET 8.0 SDK o superior
- SQL Server 2019 o superior
- Base de datos `HoopsDB` creada previamente

## Configuración Inicial

1. **Ejecutar el script de inicialización**:
   ```bash
   sqlcmd -S localhost -d HoopsDB -U sa -P "TU_CONTRASEÑA" -i db/init_auth.sql
   ```
   Esto creará la tabla de usuarios y un usuario administrador por defecto:
   - Usuario: `admin`
   - Contraseña: `Admin123!`

2. **Configurar el archivo de configuración**:
   Asegúrate de que el archivo `appsettings.json` tenga la siguiente configuración:
   ```json
   {
     "Jwt": {
       "Secret": "TU_CLAVE_SECRETA_MUY_SEGURA_DE_AL_MENOS_32_CARACTERES",
       "ExpirationInDays": 7
     }
   }
   ```

## Endpoints de Autenticación

### Iniciar Sesión

```http
POST /api/Auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "Admin123!"
}
```

**Respuesta exitosa (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiration": "2025-09-22T22:00:00Z",
  "role": "Admin"
}
```

### Obtener Usuario Actual

```http
GET /api/Auth/me
Authorization: Bearer TU_TOKEN_JWT
```

**Respuesta exitosa (200 OK):**
```json
{
  "id": 1,
  "username": "admin",
  "role": "Admin",
  "createdAt": "2025-09-15T22:00:00Z",
  "lastLogin": "2025-09-15T22:30:00Z"
}
```

### Registrar Nuevo Usuario (Solo Administradores)

```http
POST /api/Auth/register
Authorization: Bearer TU_TOKEN_JWT
Content-Type: application/json

{
  "username": "nuevo_usuario",
  "password": "ContraseñaSegura123!",
  "role": "User"
}
```

**Respuesta exitosa (201 Created):**
```json
{
  "id": 2,
  "username": "nuevo_usuario",
  "role": "User",
  "createdAt": "2025-09-15T23:00:00Z"
}
```

## Uso en los Controladores

Para proteger un controlador o un endpoint específico, usa los atributos `[Authorize]` y `[Authorize(Roles = "Admin")]`:

```csharp
[ApiController]
[Route("api/[controller]")]
[Authorize] // Requiere autenticación para todos los endpoints
public class MiControlador : BaseController
{
    [HttpGet]
    public IActionResult GetAll()
    {
        // Solo usuarios autenticados pueden acceder
        return Ok(datos);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")] // Solo administradores pueden acceder
    public IActionResult Create([FromBody] Modelo modelo)
    {
        // Solo administradores pueden acceder
        return CreatedAtAction(nameof(GetAll), new { id = modelo.Id }, modelo);
    }
}
```

## Manejo de Errores

El sistema devuelve los siguientes códigos de estado HTTP:

- `200 OK`: Solicitud exitosa
- `201 Created`: Recurso creado exitosamente
- `400 Bad Request`: Datos de entrada inválidos
- `401 Unauthorized`: No autenticado o token inválido
- `403 Forbidden`: No tiene permisos para realizar la acción
- `404 Not Found`: Recurso no encontrado
- `500 Internal Server Error`: Error interno del servidor

## Seguridad

- Las contraseñas se almacenan con hash utilizando BCrypt
- Los tokens JWT tienen una expiración configurable (por defecto 7 días)
- Se recomienda usar HTTPS en producción
- No almacenar el token JWT en localStorage (usar httpOnly cookies en producción)

## Personalización

Puedes modificar los siguientes aspectos del sistema de autenticación:

1. **Tiempo de expiración del token**: Modifica `Jwt:ExpirationInDays` en `appsettings.json`
2. **Roles personalizados**: Actualiza las validaciones en los controladores según sea necesario
3. **Políticas de contraseñas**: Modifica la lógica de registro en `AuthService`

## Solución de Problemas

1. **Error de autenticación**: Verifica que el usuario y contraseña sean correctos
2. **Token expirado**: El usuario debe volver a iniciar sesión
3. **Permisos insuficientes**: Verifica que el usuario tenga el rol requerido
4. **Error de conexión a la base de datos**: Verifica la cadena de conexión en `appsettings.json`
