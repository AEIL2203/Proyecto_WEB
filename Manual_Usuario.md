# 📘 Manual de Usuario – Marcador de Baloncesto

Aplicación web diseñada para simular un marcador de baloncesto en tiempo real.  
Integra **Angular** (frontend), **.NET 8 con C#** (backend) y **SQL Server 2022** (base de datos), desplegados en **Docker**.  

El sistema está orientado a la práctica de conceptos **full stack**, APIs RESTful, persistencia de datos y despliegue en contenedores.

---

## 📑 Tabla de Contenidos

1. [Descripción General](#-descripción-general)  
2. [Instalación y Acceso](#-instalación-y-acceso)  
3. [Requisitos Previos](#-requisitos-previos)  
4. [Crear o Seleccionar Juego](#-crear-o-seleccionar-juego)  
5. [Marcador y Flujo del Juego](#-marcador-y-flujo-del-juego)  
6. [Panel de Control](#-panel-de-control)  
7. [Lógica de Faltas y Estados](#-lógica-de-faltas-y-estados)  
8. [Cronómetro](#-cronómetro)  
9. [Plantillas HOME/AWAY](#-plantillas-homeaway)  
10. [Administración de Plantillas](#-administración-de-plantillas)  
11. [Página de Resultados](#-página-de-resultados)  
12. [Consejos de Uso](#-consejos-de-uso)  
13. [Errores Comunes y Solución](#-errores-comunes-y-solución)  
14. [Operación Rápida](#-operación-rápida)  

---

## 📖 Descripción General

- **Propósito**: Gestionar un partido de baloncesto en vivo (puntuación, cronómetro, faltas y plantillas).  
- **Pantallas clave**:  
  - **Home** → marcador, controles, cronómetro y plantillas.  
  - **Resultados** → resumen por jugador y equipo.  

![Vista general](imagen1.png)

---

## ⚙️ Instalación y Acceso

1. Abra la aplicación en un navegador (local o servidor).  
2. Verifique que el **backend/API** y la **base de datos** estén en ejecución.  

![Instalación](imagen2.png)

---

## 📋 Requisitos Previos

- **Datos del juego**: haber creado/seleccionado un partido.  
- **Jugadores**: opcionalmente, administrar plantillas en “Gestión de jugadores por equipo”.  

---

## 🏀 Crear o Seleccionar Juego

- Desde la sección administrativa, cree un juego nuevo o seleccione uno existente.  
- El tablero mostrará el **Detalle seleccionado** con el partido activo.  

![Selección de juego](imagen3.png)

---

## 🎯 Marcador y Flujo del Juego

- **Marcador**: puntuación, nombre de los equipos y estado del partido.  
- **Flujo de estados**:  
  1. `Programado` → pulsar **Start**.  
  2. `En progreso` → usar controles de puntos, faltas y cronómetro.  
  3. `Q2 / Q3 / Q4` → avanzar de periodo.  
  4. `Finish` → finalizar el partido.  

![Marcador](imagen4.png)

---

## 🎮 Panel de Control

- **Acciones globales**:  
  - `Start` → iniciar partido.  
  - `Qn` → avanzar de cuarto.  
  - `Finish` → finalizar.  
  - `Undo` → deshacer última acción.  

- **Bloques HOME/AWAY**: columnas por equipo.  
- **Puntos**: `+1`, `+2`, `+3`, `-Pts`.  
- **Jugador**: selector opcional para asociar acciones.  
- **Faltas**:  
  - `+Foul` suma.  
  - `-Foul` revierte.  
- **Penalización (BONUS)**: se activa con 5 faltas de equipo.  

![Panel de control](imagen5.png)

---

## 🚨 Lógica de Faltas y Estados

- **Equipo**: acumula faltas por cuarto (5 = BONUS).  
- **Jugador**: se marcan de forma individual; si llega al límite, queda `OUT`.  
- **Indicadores visuales**: penalización resaltada y estado OUT.  

![Lógica de faltas](imagen6.png)

---

## ⏱️ Cronómetro

- **Controles**: Iniciar / Pausar / Reiniciar.  
- **Vinculación**: corresponde al cuarto actual.  
- **Expiración**: al llegar a 0 → se dispara evento de final del periodo.  
- **Avance de cuartos**: usar `Qn` tras expirar.  

![Cronómetro](imagen7.png)

---

## 👥 Plantillas HOME/AWAY

- Vista con número, nombre y posición.  
- Estado `OUT` si el jugador excede el límite de faltas.  

![Plantillas](imagen8.png)

---

## 🛠️ Administración de Plantillas

- Sección “Gestión de jugadores por equipo”.  
- Añadir/editar jugadores antes o durante el partido.  
- Cambios reflejados en los selectores de jugador.  

---

## 📊 Página de Resultados

- **Tablas por equipo** con Q1–Q4 y totales.  
- **BONUS**: se muestra como badge cuando corresponde.  

---

## 💡 Consejos de Uso

- Seleccione jugador **antes** de sumar falta.  
- Use `Undo` para corregir puntos/faltas.  
- Avance de cuarto cuando el cronómetro llegue a 0.  

---

## 🛠️ Errores Comunes y Solución

- **No suma puntos** → verificar estado `IN_PROGRESS`.  
- **No suma faltas** → seleccionar jugador válido.  
- **Títulos duplicados en plantilla** → generados automáticamente.  

---

## 🚀 Operación Rápida

```
Start → Cronómetro Iniciar → Sumar puntos/faltas → Qn → Repetir → Finish
```

---
