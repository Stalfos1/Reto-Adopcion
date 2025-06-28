# 🐾 Plataforma de Adopción Responsable

Bienvenido/a a este proyecto demo de **Plataforma de Adopción Responsable**, desarrollado con **Angular**, **Express** y **SQLite**.  
Permite gestionar usuarios, mascotas, adopciones y sugerencias personalizadas de adopción.

---

## 🚀 Descripción

Este sistema es un prototipo de una plataforma donde:
- Las personas pueden registrarse como adoptantes.
- Administradores pueden registrar mascotas disponibles.
- Se sugiere la mascota ideal para cada persona según su tipo de vivienda.
- Se hace seguimiento de las adopciones.
- Se muestra una reputación del adoptante con una imagen representativa.

---

## ✨ Principales características

✅ **Autenticación sencilla de usuarios adoptantes**  
✅ **Galería de mascotas disponibles** con imágenes y detalles.  
✅ **Sugerencias de mascotas** basadas en el tipo de vivienda (casa, departamento, patio).  
✅ **Registro de adopciones y seguimiento** (vacunas, esterilización, fotos de progreso).  
✅ **Indicador de reputación del adoptante**, que muestra una imagen especial según su etiqueta:
   - Adoptante Ejemplar 🟢 → ![excelente.jpg](public/images/excelente.jpg)
   - En riesgo de abandono 🟡 → ![mediocre.jpg](public/images/mediocre.jpg)
   - Nuevo adoptante 🔵 → ![new.png](public/images/new.png)

✅ **API REST** con endpoints claros:
- `/api/personas` para CRUD de personas.
- `/api/mascotas` para listar mascotas.
- `/api/mascotas-sugeridas/:personaId` para sugerencias.
- `/api/etiqueta-imagen/:personaId` para la reputación.

✅ **Frontend Angular** modular con rutas:
- `/login` → Página de login.
- `/home` → Bienvenida al usuario con reputación.
- `/galeria` → Galería de todas las mascotas.
- `/sugerencia` → Página de mascotas sugeridas.

✅ **Base de datos SQLite** embebida para persistencia de datos.

---

## ⚙️ Tecnologías utilizadas

- **Frontend:** Angular Standalone API, Router, Primeng (opcional).
- **Backend:** Node.js con Express.
- **Base de datos:** SQLite3.
- **Servidor estático:** Servir Angular desde Express.

---
