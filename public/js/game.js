// Lanzar moneda con animación
export function flipCoin() {
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
