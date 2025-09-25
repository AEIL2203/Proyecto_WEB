using Microsoft.Data.SqlClient;

namespace MarcadorBaloncesto.Infrastructure.Data
{
    public interface ISqlConnectionFactory
    {
        SqlConnection Create();
    }

    public sealed class SqlConnectionFactory : ISqlConnectionFactory
    {
        private readonly string _connectionString;

        public SqlConnectionFactory(string connectionString)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }

        public SqlConnection Create()
        {
            var conn = new SqlConnection(_connectionString);
            conn.Open();
            return conn;
        }
    }
}
