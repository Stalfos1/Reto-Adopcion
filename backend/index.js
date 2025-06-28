const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database('adopcion_mascotas_db.sqlite', (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos', err);
  } else {
    console.log('Conectado a SQLite');
  }
});



// Middlewares
app.use(cors());
app.use(express.json());



// === PERSONA ===
// Crear persona
app.post('/api/personas', (req, res) => {
  const { nombre, email } = req.body;
  const sql = 'INSERT INTO persona (nombre, email) VALUES (?, ?)';
  db.run(sql, [nombre, email], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, nombre, email });
  });
});

// Obtener todas las personas
app.get('/api/personas', (req, res) => {
  db.all('SELECT * FROM persona', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Obtener una persona por ID
app.get('/api/personas/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM persona WHERE id = ?';
  db.get(sql, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Persona no encontrada' });
    res.json(row);
  });
});


// === MASCOTAS ===
// Obtener todas las mascotas
app.get('/api/mascotas', (req, res) => {
  db.all('SELECT * FROM mascota', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// === ADOPCIONES ===
// Crear adopción
app.post('/api/adopciones', (req, res) => {
  const { persona_id, mascota_id, fecha_adopcion } = req.body;
  const sql = 'INSERT INTO adopcion (persona_id, mascota_id, fecha_adopcion) VALUES (?, ?, ?)';
  db.run(sql, [persona_id, mascota_id, fecha_adopcion], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

// Ver adopciones
app.get('/api/adopciones', (req, res) => {
  const sql = `
    SELECT a.*, p.nombre as persona_nombre, m.nombre as mascota_nombre
    FROM adopcion a
    JOIN persona p ON p.id = a.persona_id
    JOIN mascota m ON m.id = a.mascota_id
  `;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


// === SEGUIMIENTO ===
// Registrar seguimiento
app.post('/api/seguimiento', (req, res) => {
  const { adopcion_id, esterilizacion, vacunas_al_dia, foto } = req.body;
  const sql = `
    INSERT INTO seguimiento (adopcion_id, esterilizacion, vacunas_al_dia, foto)
    VALUES (?, ?, ?, ?)
  `;
  db.run(sql, [adopcion_id, esterilizacion, vacunas_al_dia, foto], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

// Ver seguimiento de una adopción
app.get('/api/seguimiento/:adopcionId', (req, res) => {
  const adopcionId = req.params.adopcionId;
  const sql = 'SELECT * FROM seguimiento WHERE adopcion_id = ?';
  db.all(sql, [adopcionId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


// === VIVIENDAS ===
// Crear o actualizar vivienda
app.post('/api/viviendas', (req, res) => {
  const { persona_id, tipo_vivienda, patio, cantidad_niños, experiencia_mascotas, horas_fuera } = req.body;
  const sql = `
    INSERT INTO viviendas (persona_id, tipo_vivienda, patio, cantidad_niños, experiencia_mascotas, horas_fuera)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.run(sql, [persona_id, tipo_vivienda, patio, cantidad_niños, experiencia_mascotas, horas_fuera], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});


// === Mascotas Sugeridas =====
// Sugerir Mascotas segun las preferencias de cada persona

app.get('/api/mascotas-sugeridas/:personaId', (req, res) => {
  const personaId = req.params.personaId;

  const viviendaSql = 'SELECT tipo_vivienda, patio FROM viviendas WHERE persona_id = ?';

  db.get(viviendaSql, [personaId], (err, vivienda) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!vivienda) return res.status(404).json({ error: 'No se encontró vivienda para la persona' });

    let tamaños = [];

    if (vivienda.tipo_vivienda === 'casa') {
      if (vivienda.patio) {
        tamaños = ['grande', 'mediano'];
      } else {
        tamaños = ['mediano'];
      }
    } else if (vivienda.tipo_vivienda === 'departamento') {
      tamaños = ['pequeño'];
    } else {
      // Por defecto, devolver todos
      tamaños = ['pequeño', 'mediano', 'grande'];
    }

    const mascotasSql = `SELECT * FROM mascota WHERE tamaño IN (${tamaños.map(() => '?').join(',')})`;

    db.all(mascotasSql, tamaños, (err, mascotas) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(mascotas);
    });
  });
});

// === Etiqueta Imagen ===
// Devuelve la URL de la imagen según la etiqueta de la persona
app.get('/api/etiqueta-imagen/:personaId', (req, res) => {
  const personaId = req.params.personaId;
  const sql = 'SELECT etiqueta FROM persona WHERE id = ?';

  db.get(sql, [personaId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }

    const etiqueta = row.etiqueta ? row.etiqueta.toLowerCase() : '';

    let imagenUrl = '';

    if (etiqueta === 'adoptante ejemplar') {
      imagenUrl = './images/excelente.jpg';
    } else if (etiqueta === 'en riesgo de abandono') {
      imagenUrl = './images/mediocre.jpg';
    } else if (etiqueta === 'nuevo adoptante') {
      imagenUrl = './images/new.png';
    }
    res.json({ imagenUrl: imagenUrl });
  });
});




// Servir Angular
app.use(express.static(path.join(__dirname, 'public')));
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
