using BCrypt.Net;

namespace Api.Auth.Services;

// Hash y verificación de contraseñas
public interface IPasswordHasher
{
    string Hash(string password);
    bool Verify(string password, string hash);
}

public sealed class BcryptPasswordHasher : IPasswordHasher
{
    // Genera hash seguro de la contraseña usando BCrypt
    public string Hash(string password) => BCrypt.Net.BCrypt.HashPassword(password);
    
    // Verifica si la contraseña coincide con el hash
    public bool Verify(string password, string hash) => BCrypt.Net.BCrypt.Verify(password, hash);
}
