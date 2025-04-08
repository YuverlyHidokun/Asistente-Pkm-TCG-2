// Agregar una carta al jugador
function addCard(playerId) {
    let playerDiv = document.getElementById(playerId);
    let cardName = playerDiv.querySelector(".card-name").value;
    let cardHp = playerDiv.querySelector(".card-hp").value;

    if (!cardName || !cardHp) {
        alert("Por favor, ingresa un nombre y HP.");
        return;
    }

    let cardList = playerDiv.querySelector(".cards-list");
    let listItem = document.createElement("li");
    listItem.classList.add("card");
    listItem.innerHTML = `
        <strong>${cardName}</strong> - HP: <span class="hp">${cardHp}</span>
        <br>
        <label>Restar HP:</label>
        <input type="number" class="damage-input" min="0" value="10">
        <button onclick="reduceHp(this)">Restar</button>
        <div class="particles-container"></div>
        <br>
        <label>Condición:</label>
        <select class="condition-select" onchange="updateCondition(this)">
            <option value="Ninguna">Ninguna</option>
            <option value="Paralizado">Paralizado</option>
            <option value="Dormido">Dormido</option>
            <option value="Confundido">Confundido</option>
            <option value="Envenenado">Envenenado</option>
        </select>
        <br>
        <button onclick="toggleAbility(this)">Usó habilidad</button>
        <span class="status">No usada</span>
    `;

    // Animación de la carta al ser agregada
    gsap.from(listItem, {
        scale: 0.5,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
    });

    cardList.appendChild(listItem);

    // Limpiar campos
    playerDiv.querySelector(".card-name").value = "";
    playerDiv.querySelector(".card-hp").value = "";

    // Después de agregar, aplicar animación de condición de estado
    updateCondition(listItem.querySelector(".condition-select"));
}

// Reducir HP de una carta
function reduceHp(button) {
    let card = button.parentElement;
    let hpSpan = card.querySelector(".hp");
    let damageInput = card.querySelector(".damage-input");
    let newHp = Math.max(0, parseInt(hpSpan.textContent) - parseInt(damageInput.value));
    hpSpan.textContent = newHp === 0 ? "Eliminado" : newHp;

    if (newHp === 0) eliminarCarta(card);
}

// Eliminar carta con animación de derrota
function eliminarCarta(cardElement) {
    // Agregar la clase que aplica la animación de derrota
    cardElement.classList.add("card-eliminated");

    // Eliminar la carta después de la animación
    setTimeout(() => cardElement.remove(), 1000); // 1000ms = 1 segundo de animación
}

// Eliminar carta con animación de partículas
function eliminarCarta(cardElement) {
    iniciarParticulas(cardElement, "#ff0000", 50, "top");
    setTimeout(() => cardElement.remove(), 2000);
}

function updateCondition(selectElement) {
    let card = selectElement.closest(".card");
    let conditionText = card.querySelector(".status");

    // Animación de cambio de estado
    gsap.to(card, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: "power2.inOut"
            });
        }
    });

    // Actualizar el texto del estado
    conditionText.textContent = selectElement.value;

    // Cambiar color según la condición
    switch (selectElement.value) {
        case "Paralizado":
            conditionText.style.color = "#ff4444"; // Rojo
            break;
        case "Dormido":
            conditionText.style.color = "#aa66cc"; // Violeta
            break;
        case "Confundido":
            conditionText.style.color = "#ffcc00"; // Amarillo
            break;
        case "Envenenado":
            conditionText.style.color = "#33cc33"; // Verde
            break;
        default:
            conditionText.style.color = "#aaaaaa"; // Gris para ninguna condición
    }
}

// Iniciar animación de efectos con GSAP
function iniciarParticulas(cardElement, color, cantidad, direccion) {
    // Creación de un "destello" animado con GSAP
    let effectContainer = document.createElement("div");
    effectContainer.classList.add("effect-container");
    cardElement.appendChild(effectContainer);

    gsap.fromTo(effectContainer, {
        scale: 0,
        opacity: 0,
    }, {
        scale: 1.2,
        opacity: 1,
        duration: 1,
        repeat: -1, 
        yoyo: true,
        ease: "power1.inOut",
        backgroundColor: color
    });
}

// Alternar estado de habilidad usada
function toggleAbility(button) {
    let statusSpan = button.nextElementSibling;
    statusSpan.textContent = statusSpan.textContent === "No usada" ? "Usada" : "No usada";
    statusSpan.style.color = statusSpan.textContent === "Usada" ? "blue" : "white";

    // Efecto visual de habilidad con GSAP
    gsap.to(button, {
        rotation: 360,
        duration: 0.5,
        ease: "bounce.out"
    });
}

// Obtener sprite de Pokémon desde la API
async function fetchPokemonSprite(pokemonName, playerId) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        if (!response.ok) throw new Error("Pokémon no encontrado");
        
        const data = await response.json();
        let spriteUrl = data.sprites.front_default;
        let playerDiv = document.getElementById(playerId);
        let spriteImg = playerDiv.querySelector(".pokemon-sprite") || document.createElement("img");
        
        spriteImg.classList.add("pokemon-sprite");
        spriteImg.src = spriteUrl;
        if (!playerDiv.contains(spriteImg)) playerDiv.insertBefore(spriteImg, playerDiv.querySelector("h2").nextSibling);
    } catch (error) {
        console.error("Error al obtener el Pokémon:", error);
    }
}

// Cargar sprite al escribir nombre de Pokémon
document.querySelectorAll(".card-name").forEach(input => {
    input.addEventListener("change", event => {
        const playerId = event.target.closest(".player").id;
        fetchPokemonSprite(event.target.value, playerId);
    });
});

// Lanzamiento de moneda con animación
function flipCoin() {
    let coinResult = document.getElementById("coin-result");
    let coinImage = document.getElementById("coin-image");

    // Borramos el resultado anterior y mostramos la moneda
    coinResult.textContent = "";
    coinImage.style.display = "block";

    // Reiniciar la rotación antes de la nueva animación
    gsap.set(coinImage, { rotationX: 0 });

    // Animación con GSAP
    gsap.to(coinImage, {
        rotationX: 720,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
            let outcome = Math.random() < 0.5 ? "Cara" : "Cruz"; // Resultado aleatorio
            coinResult.textContent = outcome; // Mostramos el resultado en el párrafo
            coinImage.src = `assets/${outcome.toLowerCase()}.png`; // Cambiamos la imagen con la ruta correcta
        }
    });
}

//Evento de las salas con el socket
const joinRoomBtn = document.getElementById('joinRoomBtn');
if (joinRoomBtn) {
    joinRoomBtn.addEventListener('click', () => {
        const roomId = document.getElementById('roomId').value;
        if (roomId) {
            joinRoom(roomId);
        } else {
            alert("Por favor ingresa un ID de sala.");
        }
    });
}

function actualizarJuego(data) {
    console.log("actualizarJuego llamada con:", data);
    
    const log = document.getElementById("sync-log");
    if (log) {
        log.textContent = `Mensaje recibido: ${data.mensaje}`;
    }
}
