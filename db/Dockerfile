# Base SQL Server 2022 image
FROM mcr.microsoft.com/mssql/server:2022-latest

# Ensure libnuma is correctly installed to avoid "file too short" loader errors
USER root
RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends libnuma1; \
    ldconfig; \
    rm -rf /var/lib/apt/lists/*

# Return to default non-root user used by the image
USER mssql

