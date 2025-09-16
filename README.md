"# Marcador de Baloncesto

Aplicación full‑stack para gestionar marcadores de baloncesto con control de reloj, faltas, plantillas y resultados.

## Stack y versiones

- __API__: .NET 8 (ASP.NET Minimal APIs)
  - Paquetes: `Dapper 2.1.66`, `Microsoft.Data.SqlClient 6.0.2`, `Swashbuckle.AspNetCore 6.6.2`, `Microsoft.AspNetCore.OpenApi 8.0.18`
- __Base de datos__: SQL Server 2022 (imagen `mcr.microsoft.com/mssql/server:2022-latest`)
- __UI__: Angular 18
  - `@angular/* 18.2.x`, `@angular/ssr 18.2.20`, `rxjs 7.8.x`, `zone.js 0.14.x`, `typescript 5.5.x`
  - Node.js 20 (imagen `node:20` para build)
  - Servida con NGINX (imagen `nginx:alpine`)

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

### Levantar todo

```bash
docker compose --profile all up -d --build
```

Servicios:

- UI: http://localhost:4200
- API: http://localhost:8080 (Swagger en dev)
- SQL Server: localhost, puerto 1433

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

## Esquema de base de datos (resumen)

Esquema `HoopsDB.core` creado por `db/init.sql`:

- __Club__: equipos (`TeamId`, `Name` único)
- __Matches__: juegos con marcador y estado (`SCHEDULED`/`IN_PROGRESS`/`FINISHED`)
- __MatchEvents__: eventos por juego (POINT_1/2/3, FOUL, REMOVE_*, UNDO; incluye `PlayerId` opcional)
- __MatchTimers__: temporizador del juego por cuarto (`QuarterMs`, `RemainingMs`, `Running`)
- __Athletes__: jugadores por equipo (dorsal único por equipo cuando no es NULL)
- Índices para consultas rápidas: `IX_MatchEvents_GameId_EventId`, `IX_Matches_Status`, `IX_MatchEvents_PlayerId`, `IX_Matches_TeamIds`, `IX_MatchEvents_FoulsFast`

## API REST (resumen)

Base URL: `http://localhost:8080/api`

- __GET__ `/games` → lista últimos juegos
- __POST__ `/games` `{ home?, away?, quarterMs? }` → crea juego (12min por defecto)
- __GET__ `/games/{id}` → detalle del juego + eventos
- __POST__ `/games/{id}/start` → inicia juego (status `IN_PROGRESS`)
- __POST__ `/games/{id}/advance-quarter` → avanza cuarto; si es OT, fija 5min; valida empate/regla de finalización
- __POST__ `/games/{id}/finish` → finaliza juego

- __POST__ `/games/{id}/score` `{ team: HOME|AWAY, points: 1|2|3, playerId?, playerNumber? }` → anota
- __POST__ `/games/{id}/remove-score` `{ team }` → elimina última anotación del equipo y ajusta marcador
- __POST__ `/games/{id}/foul` `{ team, playerId?, playerNumber? }` → registra falta
- __POST__ `/games/{id}/remove-foul` `{ team, playerId? }` → elimina última falta del equipo (opcionalmente del jugador)
- __POST__ `/games/{id}/undo` → deshace último evento de puntos o falta (registra `UNDO`)

- __GET__ `/teams` → lista equipos
- __POST__ `/teams` `{ name }` → crea equipo (solo letras y espacios)
- __GET__ `/games/{id}/players/{side}` → roster HOME/AWAY del juego
- __GET__ `/games/{id}/fouls/summary` → resumen de faltas por equipo y jugador
- __POST__ `/teams/{teamId}/players` `{ name, number?, position? }` → crea jugador
- __PATCH__ `/players/{playerId}` `{ number?, name?, position?, active? }` → actualiza jugador
- __DELETE__ `/players/{playerId}` → elimina jugador

### Reloj (Clock)

- __GET__ `/games/{id}/clock` → estado (`remainingMs`, `quarter`, `running`)
- __POST__ `/games/{id}/clock/start`
- __POST__ `/games/{id}/clock/pause`
- __POST__ `/games/{id}/clock/reset` `{ quarterMs? }`

## UI (Angular)

- Scripts: `npm start` (dev), `npm run build` (prod). SSR disponible via `serve:ssr:marcador` si se quiere probar con Node.
- Build de producción queda servido por NGINX en el contenedor `ui`.

## Funcionamiento

- __Flujo típico de uso__
  1. __Crear equipos__: `POST /api/teams { name }` o desde la UI si está habilitado ese flujo.
  2. __Crear juego__: 
     - Rápido: `POST /api/games { home?, away?, quarterMs? }`.
     - Emparejando equipos existentes: `POST /api/games/pair { homeTeamId, awayTeamId, quarterMs? }`.
  3. __Iniciar reloj__: `POST /api/games/{id}/start` y/o `POST /api/games/{id}/clock/start`.
  4. __Gestionar cronómetro__: `clock/pause`, `clock/reset { quarterMs? }` según se requiera.
  5. __Registrar acciones__: 
     - Anotaciones: `POST /api/games/{id}/score { team, points(1|2|3), playerId? }`.
     - Faltas: `POST /api/games/{id}/foul { team, playerId? }`.
     - Correcciones: `remove-score`, `remove-foul`, o `undo` (revierte el último evento de puntos o falta).
  6. __Cambiar de cuarto__: `POST /api/games/{id}/advance-quarter`.
     - Si es después del 4º cuarto y el marcador NO está empatado, la API impide avanzar (el juego debe finalizar).
     - Si es prórroga (OT), la duración se fija en 5 minutos (300000 ms).
  7. __Finalizar juego__: `POST /api/games/{id}/finish`.

- __Lógica de bonus y OUT__
  - La UI calcula el __BONUS__ por equipo por cuarto a partir del resumen de faltas (`GET /api/games/{id}/fouls/summary`). Por diseño, entra en bonus a partir de 5 faltas en el cuarto.
  - La UI marca jugadores __OUT__ cuando alcanzan 5 faltas personales (etiqueta visual). La API registra eventos de falta, pero no “bloquea” acciones; el backoffice/operador decide.

- __Arquitectura en ejecución__
  - La __UI__ (contenedor `ui`) se sirve con NGINX y consume la API mediante HTTP.
  - La __API__ (contenedor `api`) expone `:8080` y usa `DB_CONNECTION_STRING` (inyectada por `docker-compose.yml`) para conectarse a __SQL Server__ (servicio `db`).
  - `db_init` espera a que `db` esté healthy y ejecuta `db/init.sql` (y `db/seed.sql` si existe) para provisionar el esquema `HoopsDB.core`.

- __Persistencia y auditoría__
  - Cada anotación/falta se registra en `core.MatchEvents` con `Quarter`, `Team`, `EventType` y `PlayerId` opcional. Esto permite reconstruir el estado, conteos de faltas por cuarto y estadísticas.

## Troubleshooting

- __SQL Server no arranca__: verifica `SA_PASSWORD` cumple complejidad (ya incluida), y que el puerto 1433 no esté ocupado.
- __`db_init` falla__: revisa logs del contenedor y la existencia de `db/init.sql`. Asegúrate de que `db` esté healthy primero.
- __API 500/Conexión__: confirma `DB_CONNECTION_STRING` generado en `docker-compose.yml` apunte a `Server=db,1433;...`.
- __UI no carga__: espera a que `api` esté arriba; el servicio `ui` se reinicia si hay fallos de DNS iniciales.

## Licencia

Uso académico.
