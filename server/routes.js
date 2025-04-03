const express = require('express');
const { v4: uuidv4 } = require('uuid'); // Importamos uuid para generar IDs únicos
const router = express.Router();

// Ruta para generar un nuevo código de sala
router.get('/create-room', (req, res) => {
    const roomId = uuidv4(); // Generamos un código único
    res.json({ roomId }); // Lo enviamos al frontend
});

// Ruta de prueba para verificar si el servidor está funcionando
router.get('/status', (req, res) => {
    res.json({ message: 'Servidor funcionando correctamente' });
});

// Exportamos las rutas
module.exports = router;
