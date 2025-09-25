using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Api.Auth.Services;

public interface IJwtService
{
    string CreateToken(string userName, string role, TimeSpan? expires = null);
}

public sealed class JwtService : IJwtService
{
    private readonly IConfiguration _cfg;
    public JwtService(IConfiguration cfg) => _cfg = cfg;

    public string CreateToken(string userName, string role, TimeSpan? expires = null)
    {
        var issuer = _cfg["Jwt:Issuer"] ?? "marcador-api";
        var audience = _cfg["Jwt:Audience"] ?? "marcador-ui";
        var key = _cfg["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key no configurado");
        var lifetime = expires ?? TimeSpan.FromMinutes(int.TryParse(_cfg["Jwt:ExpiresMinutes"], out var m) ? m : 60);

        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, userName),
            new Claim(ClaimTypes.Name, userName),
            new Claim(ClaimTypes.Role, role)
        };

        var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        var creds = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            notBefore: DateTime.UtcNow,
            expires: DateTime.UtcNow.Add(lifetime),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
