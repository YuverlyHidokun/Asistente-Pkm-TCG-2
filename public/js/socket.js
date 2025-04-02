// sistema de salas configuradas para el juego de cartas
// y la lógica de sincronización entre los jugadores.

import { io } from "socket.io-client";

// Conexión con el servidor
export const socket = io('http://localhost:3000');

// Unirse a una sala
export function joinRoom(room) {
    socket.emit('joinRoom', room);
}

// Actualizar el estado del juego
export function updateGameState(room, data) {
    socket.emit('updateGameState', { room, data });
}

// Escuchar eventos de sincronización del juego
export function listenGameStateUpdate(callback) {
    socket.on('syncGameState', callback);
}

// Escuchar eventos de actualización de la sala
export function listenUpdateRoom(callback) {
    socket.on('updateRoom', callback);
}
