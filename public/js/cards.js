// creacion de las cartas y su contenido

import { animateCardEntrance, animateCardExit } from './animations.js';

// Agregar una carta al jugador
export function addCard(playerId) {
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
    listItem.innerHTML = generateCardHtml(cardName, cardHp);

    animateCardEntrance(listItem);

    cardList.appendChild(listItem);

    playerDiv.querySelector(".card-name").value = "";
    playerDiv.querySelector(".card-hp").value = "";

    updateCondition(listItem.querySelector(".condition-select"));
}

// Generar HTML de la carta
function generateCardHtml(cardName, cardHp) {
    return `
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
}

// Reducir HP de la carta
export function reduceHp(button) {
    let card = button.parentElement;
    let hpSpan = card.querySelector(".hp");
    let damageInput = card.querySelector(".damage-input");
    let newHp = Math.max(0, parseInt(hpSpan.textContent) - parseInt(damageInput.value));
    hpSpan.textContent = newHp === 0 ? "Eliminado" : newHp;

    if (newHp === 0) eliminarCarta(card);
}

// Eliminar carta con animación de partículas
export function eliminarCarta(cardElement) {
    animateCardExit(cardElement);
    setTimeout(() => cardElement.remove(), 2000);
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
