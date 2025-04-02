//modificacion del archivo socket .js para incluir la funcionalidad de conexión y actualización del estado del juego
// Conectar al servidor y unirse a una sala
let socket;

export function joinRoom(roomId) {
    socket = io('http://localhost:3000');  // Cambia la URL si es necesario
    socket.emit('joinRoom', roomId);
    console.log(`Unido a la sala: ${roomId}`);

    // Escuchar eventos de actualización de estado
    socket.on('gameStateUpdate', (data) => {
        updateGameState(data);
    });
}

export function updateGameState(stateData) {
    // Aquí puedes actualizar el estado del juego en el frontend
    console.log('Estado actualizado:', stateData);
}

// Escuchar cambios en el estado del juego
export function listenGameStateUpdate(callback) {
    socket.on('gameStateUpdate', (data) => {
        callback(data);
    });
}
