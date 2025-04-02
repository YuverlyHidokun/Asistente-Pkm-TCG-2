// Integracion de todos los modulos

import { addCard, reduceHp, eliminarCarta } from './cards.js';
import { flipCoin } from './game.js';
import { joinRoom, updateGameState, listenGameStateUpdate, listenUpdateRoom } from './socket.js';

// Conectar al servidor y unirse a la sala
const room = 'room1'; // Ejemplo de nombre de sala
joinRoom(room);

// Escuchar actualizaciones del estado del juego
listenGameStateUpdate((data) => {
    console.log("Estado del juego actualizado:", data);
});

// Actualizar el estado del juego
function updateState(data) {
    updateGameState(room, data);
}

// Lanzar moneda al hacer clic
document.getElementById('flip-coin').addEventListener('click', flipCoin);

// Agregar cartas a los jugadores
document.querySelector('#add-card-player1').addEventListener('click', () => addCard('player1'));
document.querySelector('#add-card-player2').addEventListener('click', () => addCard('player2'));
