// Animación para la entrada de la carta
export function animateCardEntrance(cardElement) {
    gsap.from(cardElement, {
        scale: 0.5,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
    });
}

// Animación de la carta al eliminarla
export function animateCardExit(cardElement) {
    gsap.to(cardElement, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
    });
}

// Animación de partículas
export function iniciarParticulas(cardElement, color, cantidad, direccion) {
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
