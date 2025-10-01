# Marcador de Baloncesto

App web para llevar el marcador de partidos de basketball en tiempo real. Incluye login de usuarios, manejo de torneos, cronómetro, faltas y una pantalla pública para que vean los espectadores.

## Stack y versiones

- __API__: .NET 8 (ASP.NET Minimal APIs)
  - Paquetes: `Dapper 2.1.66`, `Microsoft.Data.SqlClient 6.0.2`, `Swashbuckle.AspNetCore 6.6.2`, `Microsoft.AspNetCore.OpenApi 8.0.18`
- __Base de datos__: SQL Server 2022 (imagen `mcr.microsoft.com/mssql/server:2022-latest`)
- __UI__: Angular 18
  - `@angular/* 18.2.x`, `@angular/ssr 18.2.20`, `rxjs 7.8.x`, `zone.js 0.14.x`, `typescript 5.5.x`
  - Node.js 20 (imagen `node:20` para build)
  - Servida con NGINX (imagen `nginx:alpine`)

## Qué hace

- **Login y usuarios**: Sistema básico con admin y usuarios normales
- **Marcador en vivo**: Puntos, faltas, cronómetro que funciona en tiempo real
- **Torneos**: Puedes crear torneos y organizar los equipos
- **Pantalla pública**: Una página limpia para proyectar en TV sin login
- **Sonidos**: Silbatos y efectos cuando pasan cosas en el juego
- **Estadísticas**: Ve los números por jugador y equipo al final

## Estructura de carpetas

- `api/`: API .NET 8
- `ui/`: SPA Angular 18
- `db/`: scripts SQL de inicialización (`init.sql`, opcionalmente `seed.sql`)
- `scripts/`: utilidades de inicialización (`db-init.sh`, `espera_sql.sh`)
- `docker-compose.yml`: orquestación de servicios
- `.env`: variables de entorno (password, URL, nombre de BD)

## Variables de entorno (`.env`)

- `SA_PASSWORD`: contraseña del usuario `sa` de SQL Server
- `ASPNETCORE_URLS`: URL de escucha de la API (por defecto `http://0.0.0.0:8080`)
- `DB_NAME`: nombre de la base de datos (por defecto `HoopsDB`)

Ejemplo incluido:

```env
SA_PASSWORD=AZ235DWEB!
ASPNETCORE_URLS=http://0.0.0.0:8080
DB_NAME=HoopsDB
```

## Docker y orquestación

Archivo: `docker-compose.yml`

- __db__: SQL Server 2022, expone `1433:1433`, healthcheck con `sqlcmd`.
- __db_init__: inicializa la base ejecutando `db/init.sql` (y opcional `db/seed.sql`). Corre una vez tras `db` healthy.
- __api__: construye desde `api/Dockerfile`, expone `8080:8080`, depende de `db` y `db_init`.
- __ui__: construye desde `ui/Dockerfile`, sirve Angular con NGINX en `4200:80`, depende de `api`.

Perfiles disponibles: `db`, `api`, `ui`, `all`.

### Correr todo

```bash
docker compose --profile all up -d --build
```

Después de unos minutos:

- Frontend: http://localhost:4200
- API: http://localhost:8080 
- Base de datos: localhost:1433

### Levantar por partes

```bash
# Solo base de datos
docker compose --profile db up -d

# API y DB
docker compose --profile api up -d --build

# UI (requiere API)
docker compose --profile ui up -d --build
```

## Construcción de imágenes

- `api/Dockerfile`:
  - Build: `mcr.microsoft.com/dotnet/sdk:8.0` → `dotnet publish`
  - Runtime: `mcr.microsoft.com/dotnet/aspnet:8.0`, expone `8080`, `ENTRYPOINT dotnet Api.dll`
- `ui/Dockerfile`:
  - Build: `node:20` → `npm install` → `ng build --configuration=production`
  - Runtime: `nginx:alpine` con `nginx.conf`, expone `80`

## Desarrollo local (sin Docker)

Requisitos: Node 20+, .NET SDK 8, SQL Server local.

1) Base de datos

```bash
# Crear BD ejecutando db/init.sql en tu SQL Server local
# Ajusta cadena de conexión según tu entorno.
```

2) API

```bash
cd api
dotnet restore
dotnet run  # escucha en http://localhost:8080 por defecto
```

3) UI

```bash
cd ui
npm install
npm start  # http://localhost:4200 (proxy/URLs según configuración)
```

## Base de datos

Se crea automáticamente el esquema `HoopsDB.core` con estas tablas:

- **Users**: Los usuarios del sistema con sus roles
- **Club**: Los equipos (nombre, ciudad, logo)
- **Matches**: Los partidos con su estado
- **MatchEvents**: Cada punto y falta que pasa en el juego
- **MatchTimers**: El cronómetro de cada partido
- **Athletes**: Los jugadores de cada equipo
- **Tournaments**: Los torneos

Tiene índices para que vaya rápido cuando hay muchos datos.

## Endpoints principales

La API está en `http://localhost:8080/api`

**Login y registro:**
- `POST /auth/login` - hacer login
- `POST /auth/register` - registrarse (queda como usuario normal)
- `POST /auth/register-first` - crear el primer admin

**Partidos:**
- `GET /games` - ver partidos
- `POST /games` - crear partido nuevo
- `POST /games/{id}/start` - empezar el partido (solo admin)
- `POST /games/{id}/score` - anotar puntos (solo admin)
- `POST /games/{id}/foul` - marcar falta (solo admin)
- `POST /games/{id}/undo` - deshacer última acción (solo admin)

**Equipos:**
- `GET /teams` - ver equipos
- `POST /teams` - crear equipo (solo admin)
- `POST /teams/{id}/players` - agregar jugador (solo admin)

**Cronómetro:**
- `GET /games/{id}/clock` - ver estado del reloj
- `POST /games/{id}/clock/start` - iniciar cronómetro
- `POST /games/{id}/clock/pause` - pausar cronómetro

Los endpoints marcados con "solo admin" requieren estar logueado como administrador.

## Cómo usar

1. **Primer setup**: Registra el primer admin en `/auth/register-first`
2. **Crear equipos**: Agrega los equipos y sus jugadores
3. **Hacer un partido**: Crea el juego y selecciona los equipos
4. **Controlar el juego**: Usa `/controls/{id}` para llevar el marcador
5. **Pantalla pública**: Abre `/display/{id}` en otra pestaña para proyectar

Para usuarios normales solo pueden ver, no pueden crear ni editar nada.

## Detalles técnicos

**Seguridad:**
- Login con JWT tokens que expiran solos
- Los admins pueden hacer todo, usuarios normales solo ver
- Las contraseñas se guardan hasheadas

**Reglas del juego:**
- BONUS se activa con 5 faltas por equipo en el cuarto
- Jugadores quedan OUT con 5 faltas personales
- Hay sonidos para los eventos importantes
- Tiempo extra son 5 minutos automáticamente

**Como funciona:**
- Frontend en Angular con NGINX
- Backend en .NET 8 con SQL Server
- Todo corre con Docker
- Cada acción se guarda en la base para hacer estadísticas después

## Si algo no funciona

**Base de datos:**
- SQL Server no arranca → revisar que el puerto 1433 esté libre
- db_init falla → ver los logs del contenedor

**Login:**
- No puedo entrar → verificar usuario y contraseña
- Token expirado → hacer login de nuevo
- No tengo permisos → pedir al admin que te cambie el rol

**Funcionalidad:**
- No puedo crear cosas → necesitas ser admin
- El marcador no se actualiza → verificar que el partido esté iniciado
- Los sonidos no van → permitir autoplay en el navegador

**Conectividad:**
- La página no carga → esperar que la API esté lista
- Errores de CORS → reiniciar los contenedores

## URLs importantes

- Frontend: http://localhost:4200
- API: http://localhost:8080
- Base de datos: localhost:1433

**Páginas útiles:**
- `/login` - para entrar
- `/controls/{id}` - controlar un partido (solo admin)
- `/display/{id}` - pantalla pública para proyectar
- `/results?id={id}` - ver resultados
- `/admin/users` - gestionar usuarios (solo admin)