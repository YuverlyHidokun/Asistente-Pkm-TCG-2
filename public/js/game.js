// logica del juego

export function flipCoin() {
    let coinResult = document.getElementById("coin-result");
    let coinImage = document.getElementById("coin-image");

    coinResult.textContent = "";
    coinImage.style.display = "block";
    gsap.set(coinImage, { rotationX: 0 });

    gsap.to(coinImage, {
        rotationX: 720,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
            let outcome = Math.random() < 0.5 ? "Cara" : "Cruz";
            coinResult.textContent = outcome;
            coinImage.src = `assets/${outcome.toLowerCase()}.png`;
        }
    });
}
