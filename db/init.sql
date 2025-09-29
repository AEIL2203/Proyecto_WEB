IF DB_ID('HoopsDB') IS NULL
    CREATE DATABASE HoopsDB;
GO
USE HoopsDB;
GO

/* =========================
   TEAMS
   ========================= */
IF NOT EXISTS (SELECT 1 FROM sys.schemas WHERE name = 'core')
    EXEC('CREATE SCHEMA core');
GO

IF OBJECT_ID('core.Club') IS NULL
BEGIN
    CREATE TABLE core.Club(
        TeamId    INT IDENTITY(1,1) PRIMARY KEY,
        Name      NVARCHAR(100) NOT NULL UNIQUE,
        Active    BIT NOT NULL DEFAULT 1,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );
END
GO

/* Extender Club con City y LogoUrl si no existen */
IF COL_LENGTH('core.Club','City') IS NULL
    ALTER TABLE core.Club ADD City NVARCHAR(100) NULL;
GO
IF COL_LENGTH('core.Club','LogoUrl') IS NULL
    ALTER TABLE core.Club ADD LogoUrl NVARCHAR(512) NULL;
GO
/* Extender Club con columnas para logo binario y metadatos si no existen */
IF COL_LENGTH('core.Club','Logo') IS NULL
    ALTER TABLE core.Club ADD Logo VARBINARY(MAX) NULL;
GO
IF COL_LENGTH('core.Club','LogoContentType') IS NULL
    ALTER TABLE core.Club ADD LogoContentType NVARCHAR(128) NULL;
GO
IF COL_LENGTH('core.Club','LogoFileName') IS NULL
    ALTER TABLE core.Club ADD LogoFileName NVARCHAR(255) NULL;
GO

/* Soft delete: Active flag */
IF COL_LENGTH('core.Club','Active') IS NULL
    ALTER TABLE core.Club ADD Active BIT NOT NULL CONSTRAINT DF_Club_Active DEFAULT(1);
GO

/* =========================
   TOURNAMENTS
   ========================= */
IF OBJECT_ID('core.Tournaments') IS NULL
BEGIN
    CREATE TABLE core.Tournaments(
        ID_torneo       INT IDENTITY(1,1) PRIMARY KEY,
        Nombre_torneo   NVARCHAR(200) NOT NULL,
        Descripcion     NVARCHAR(1000) NULL,
        Numero_equipos  INT NOT NULL DEFAULT 8,
        Estado          NVARCHAR(50) NOT NULL DEFAULT 'PROGRAMADO'
    );
END
GO

/* =========================
   GAMES
   ========================= */
IF OBJECT_ID('core.Matches') IS NULL
BEGIN
    CREATE TABLE core.Matches(
        GameId INT IDENTITY(1,1) PRIMARY KEY,
        HomeTeam NVARCHAR(100) NOT NULL,
        AwayTeam NVARCHAR(100) NOT NULL,
        Quarter TINYINT NOT NULL DEFAULT 1,
        HomeScore INT NOT NULL DEFAULT 0,
        AwayScore INT NOT NULL DEFAULT 0,
        Status NVARCHAR(20) NOT NULL DEFAULT 'SCHEDULED', -- SCHEDULED/IN_PROGRESS/FINISHED/CANCELLED
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );
END
GO

/* Agregar columnas opcionales para enlazar equipos por ID (para emparejar) */
IF COL_LENGTH('core.Matches','HomeTeamId') IS NULL
    ALTER TABLE core.Matches ADD HomeTeamId INT NULL REFERENCES core.Club(TeamId);
IF COL_LENGTH('core.Matches','AwayTeamId') IS NULL
    ALTER TABLE core.Matches ADD AwayTeamId INT NULL REFERENCES core.Club(TeamId);
GO

/* =========================
   GAME EVENTS
   ========================= */
IF OBJECT_ID('core.MatchEvents') IS NULL
BEGIN
    CREATE TABLE core.MatchEvents(
        EventId INT IDENTITY(1,1) PRIMARY KEY,
        GameId INT NOT NULL,
        Quarter TINYINT NOT NULL,
        Team NVARCHAR(10) NOT NULL,                 -- HOME/AWAY
        EventType NVARCHAR(20) NOT NULL,            -- POINT_1/POINT_2/POINT_3/FOUL/UNDO
        PlayerNumber INT NULL,                      -- dorsal plano (compatibilidad)
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        FOREIGN KEY(GameId) REFERENCES core.Matches(GameId)
    );
END
GO

/* Si no existe, agregar PlayerId para relacionar eventos con jugadores */
IF COL_LENGTH('core.MatchEvents', 'PlayerId') IS NULL
BEGIN
    ALTER TABLE core.MatchEvents ADD PlayerId INT NULL;
END
GO

/* =========================
   GAME CLOCKS
   ========================= */
IF OBJECT_ID('core.MatchTimers') IS NULL
BEGIN
    CREATE TABLE core.MatchTimers(
        GameId      INT         NOT NULL PRIMARY KEY
                                REFERENCES core.Matches(GameId) ON DELETE CASCADE,
        Quarter     TINYINT     NOT NULL DEFAULT 1,
        QuarterMs   INT         NOT NULL DEFAULT 720000,  -- 12 min por cuarto (NBA)
        RemainingMs INT         NOT NULL DEFAULT 720000,  -- 12 min por cuarto (NBA)
        Running     BIT         NOT NULL DEFAULT 0,
        StartedAt   DATETIME2   NULL,
        UpdatedAt   DATETIME2   NOT NULL DEFAULT SYSUTCDATETIME()
    );
END
GO

/* =========================
   PLAYERS
   ========================= */
IF OBJECT_ID('core.Athletes') IS NULL
BEGIN
    CREATE TABLE core.Athletes(
        PlayerId   INT IDENTITY(1,1) PRIMARY KEY,
        TeamId     INT NOT NULL
                   REFERENCES core.Club(TeamId) ON DELETE CASCADE,
        Number     TINYINT NULL,              -- dorsal opcional
        Name       NVARCHAR(100) NOT NULL,
        Position   NVARCHAR(20) NULL,         -- opcional (G/F/C)
        Height     DECIMAL(3,2) NULL,         -- estatura en metros (ej: 1.95)
        Age        TINYINT NULL,              -- edad del jugador
        Nationality NVARCHAR(100) NULL,       -- nacionalidad del jugador
        Active     BIT NOT NULL DEFAULT 1,
        CreatedAt  DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );

    /* Un dorsal no puede repetirse dentro del MISMO equipo (permite NULL) */
    CREATE UNIQUE INDEX UX_Athletes_Team_Number
        ON core.Athletes(TeamId, Number)
        WHERE Number IS NOT NULL;
END
GO

/* Extender Athletes con campos adicionales si no existen */
IF COL_LENGTH('core.Athletes','Height') IS NULL
    ALTER TABLE core.Athletes ADD Height DECIMAL(3,2) NULL; -- estatura en metros
GO
IF COL_LENGTH('core.Athletes','Age') IS NULL
    ALTER TABLE core.Athletes ADD Age TINYINT NULL; -- edad del jugador
GO
IF COL_LENGTH('core.Athletes','Nationality') IS NULL
    ALTER TABLE core.Athletes ADD Nationality NVARCHAR(100) NULL; -- nacionalidad del jugador
GO

/* FK de GameEvents -> Players (si no existe ya) */
IF NOT EXISTS (
    SELECT 1
    FROM sys.foreign_keys
    WHERE name = 'FK_MatchEvents_Athletes'
      AND parent_object_id = OBJECT_ID('core.MatchEvents')
)
BEGIN
    ALTER TABLE core.MatchEvents
        WITH NOCHECK
        ADD CONSTRAINT FK_MatchEvents_Athletes
        FOREIGN KEY (PlayerId) REFERENCES core.Athletes(PlayerId);
END
GO

/* =========================
   ÍNDICES
   ========================= */

/* GameEvents: por juego/evento (ya lo tenías) */
IF NOT EXISTS (
    SELECT 1 FROM sys.indexes 
    WHERE name = 'IX_MatchEvents_GameId_EventId' 
      AND object_id = OBJECT_ID('core.MatchEvents')
)
BEGIN
    CREATE INDEX IX_MatchEvents_GameId_EventId 
        ON core.MatchEvents(GameId, EventId DESC);
END
GO

/* Games: por estado (ya lo tenías) */
IF NOT EXISTS (
    SELECT 1 FROM sys.indexes 
    WHERE name = 'IX_Matches_Status' 
      AND object_id = OBJECT_ID('core.Matches')
)
BEGIN
    CREATE INDEX IX_Matches_Status 
        ON core.Matches(Status);
END
GO

/* GameEvents: búsquedas por jugador */
IF NOT EXISTS (
    SELECT 1 FROM sys.indexes
    WHERE name = 'IX_MatchEvents_PlayerId'
      AND object_id = OBJECT_ID('core.MatchEvents')
)
BEGIN
    CREATE INDEX IX_MatchEvents_PlayerId
        ON core.MatchEvents(PlayerId);
END
GO

/* Games: lecturas por equipos emparejados */
IF NOT EXISTS (
  SELECT 1 FROM sys.indexes 
  WHERE name='IX_Matches_TeamIds' 
    AND object_id=OBJECT_ID('core.Matches')
)
BEGIN
  CREATE INDEX IX_Matches_TeamIds ON core.Matches(HomeTeamId, AwayTeamId);
END
GO

/* GameEvents: conteo rápido de faltas por cuarto/equipo (incluye PlayerId) */
IF NOT EXISTS (
  SELECT 1 FROM sys.indexes 
  WHERE name='IX_MatchEvents_FoulsFast' 
    AND object_id=OBJECT_ID('core.MatchEvents')
)
BEGIN
  CREATE INDEX IX_MatchEvents_FoulsFast
    ON core.MatchEvents(GameId, Quarter, Team, EventType) INCLUDE(PlayerId);
END
GO

/* =========================
   USERS (Administradores)
   ========================= */
IF OBJECT_ID('core.Users') IS NULL
BEGIN
    CREATE TABLE core.Users(
        UserId       INT IDENTITY(1,1) PRIMARY KEY,
        UserName     NVARCHAR(100) NOT NULL,
        Email        NVARCHAR(256) NULL,
        PasswordHash NVARCHAR(255) NOT NULL,
        Role         NVARCHAR(32)  NOT NULL DEFAULT 'Admin',
        Active       BIT           NOT NULL DEFAULT 1,
        CreatedAt    DATETIME2     NOT NULL DEFAULT SYSUTCDATETIME()
    );

    /* Índices únicos */
    CREATE UNIQUE INDEX UX_Users_UserName ON core.Users(UserName);
    CREATE UNIQUE INDEX UX_Users_Email ON core.Users(Email) WHERE Email IS NOT NULL;
END
GO
