document.addEventListener('DOMContentLoaded', () => {
    const createRoomBtn = document.getElementById('createRoomBtn');
    const joinRoomBtn = document.getElementById('joinRoomBtn');
    const roomCodeDisplay = document.getElementById('roomCode');
    const roomIdInput = document.getElementById('roomId');

    createRoomBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/create-room'); // Llamamos al backend
            const data = await response.json();
            roomCodeDisplay.textContent = data.roomId; // Mostramos el código en pantalla
        } catch (error) {
            console.error('Error al crear la sala:', error);
        }
    });

    joinRoomBtn.addEventListener('click', () => {
        const roomId = roomIdInput.value.trim();
        if (roomId) {
            window.location.href = `/index.html?room=${roomId}`; // Redirigir a la sala con ese ID
        }
    });
});
