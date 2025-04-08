// Lógica de las salas del juego con sincronización en tiempo real
module.exports = (io) => {
    const rooms = {};

    io.on('connection', (socket) => {
        console.log('Un jugador se ha conectado');

        socket.on('joinRoom', (room) => {
            socket.join(room);

            if (!rooms[room]) {
                rooms[room] = { players: [] };
            }

            // Agregar al jugador si no está en la sala
            if (rooms[room].players.length < 2) {
                rooms[room].players.push(socket.id);
                socket.emit('playerRole', `player${rooms[room].players.length}`);
            } else {
                socket.emit('roomFull');
                return;
            }

            io.to(room).emit('updateRoom', rooms[room]); // Notificar a todos los jugadores
        });

        // **Nueva funcionalidad: Sincronizar estados entre los jugadores**
        socket.on('updateGameState', ({ room, data }) => {
            socket.to(room).emit('syncGameState', data); // Enviar al otro jugador
        });

        socket.on('disconnect', () => {
            console.log('Un jugador se ha desconectado');
            for (const room in rooms) {
                rooms[room].players = rooms[room].players.filter(id => id !== socket.id);
                io.to(room).emit('playerDisconnected', socket.id);
            }
        });
    });
};
