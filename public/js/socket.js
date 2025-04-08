const socket = io();

// Obtener la sala desde la URL
const params = new URLSearchParams(window.location.search);
const room = params.get('room');

if (room) {
    socket.emit('joinRoom', room);
}

// Escuchar el rol asignado (player1 o player2)
socket.on('playerRole', (role) => {
    console.log(`Eres ${role}`);
});

// Escuchar el estado del juego desde el otro jugador
socket.on('syncGameState', (data) => {
    console.log("Estado del juego sincronizado:", data);
    actualizarJuego(data); // Debes crear esta función en tu código para aplicar los cambios
});

// Sincronizar el estado cuando ocurra un cambio
function enviarEstadoDelJuego(estado) {
    socket.emit('updateGameState', { room, data: estado });
}

// Simulación de acción en el juego (cambiar por la lógica real)
document.addEventListener('click', () => {
    const nuevoEstado = { mensaje: "Un jugador ha hecho algo" };
    enviarEstadoDelJuego(nuevoEstado);
});
