//Logica del las salas del juego
module.exports = (io) => {
    const rooms = {};

    io.on('connection', (socket) => {
        console.log('Un jugador se ha conectado');
        
        socket.on('joinRoom', (room) => {
            socket.join(room);
            if (!rooms[room]) {
                rooms[room] = { player1: null, player2: null };
            }
            
            if (!rooms[room].player1) {
                rooms[room].player1 = socket.id;
                socket.emit('playerRole', 'player1');
            } else if (!rooms[room].player2) {
                rooms[room].player2 = socket.id;
                socket.emit('playerRole', 'player2');
            } else {
                socket.emit('roomFull');
                return;
            }
            
            io.to(room).emit('updateRoom', rooms[room]);
        });
        
        socket.on('updateGameState', ({ room, data }) => {
            socket.to(room).emit('syncGameState', data);
        });
        
        socket.on('disconnect', () => {
            console.log('Un jugador se ha desconectado');
            for (const room in rooms) {
                if (rooms[room].player1 === socket.id) {
                    rooms[room].player1 = null;
                } else if (rooms[room].player2 === socket.id) {
                    rooms[room].player2 = null;
                }
            }
        });
    });
};
