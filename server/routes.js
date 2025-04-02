const express = require('express');
const router = express.Router();

// Ruta de prueba para verificar si el servidor está funcionando
router.get('/status', (req, res) => {
    res.json({ message: 'Servidor funcionando correctamente' });
});

//rutas

module.exports = router;