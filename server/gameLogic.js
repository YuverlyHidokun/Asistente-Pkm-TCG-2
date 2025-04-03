module.exports = (io) => {
    const rooms = {}; // Almacena información de las salas

    io.on('connection', (socket) => {
        console.log(`Un jugador se ha conectado: ${socket.id}`);

        socket.on('joinRoom', (room) => {
            socket.join(room);

            // Si la sala no existe, la creamos
            if (!rooms[room]) {
                rooms[room] = { player1: null, player2: null };
            }

            // Asignar jugador a la sala
            if (!rooms[room].player1) {
                rooms[room].player1 = socket.id;
                socket.emit('playerRole', 'player1');
            } else if (!rooms[room].player2) {
                rooms[room].player2 = socket.id;
                socket.emit('playerRole', 'player2');
            } else {
                socket.emit('roomFull'); // La sala ya está llena
                return;
            }

            console.log(`Jugador ${socket.id} se unió a la sala ${room}`);

            // Notificar a ambos jugadores sobre la actualización de la sala
            io.to(room).emit('updateRoom', {
                message: `Nuevo jugador en la sala ${room}`,
                players: Object.values(rooms[room]).filter(Boolean).length
            });
        });

        // Sincronización del estado del juego
        socket.on('updateGameState', ({ room, data }) => {
            socket.to(room).emit('syncGameState', data);
        });

        // Manejar la desconexión de un jugador
        socket.on('disconnect', () => {
            console.log(`Jugador ${socket.id} se ha desconectado`);

            for (const room in rooms) {
                if (rooms[room].player1 === socket.id) {
                    rooms[room].player1 = null;
                    io.to(room).emit('playerDisconnected', 'player1');
                } else if (rooms[room].player2 === socket.id) {
                    rooms[room].player2 = null;
                    io.to(room).emit('playerDisconnected', 'player2');
                }

                // Si ambos jugadores se van, eliminar la sala
                if (!rooms[room].player1 && !rooms[room].player2) {
                    delete rooms[room];
                    console.log(`Sala ${room} eliminada`);
                }
            }
        });
    });
};
