const heartsContainer = document.querySelector(".hearts");

const heartSymbols = ["❤️", "💋"];

for (let i = 0; i < 100; i++) {
    const heart = document.createElement("div");

    heart.className = "heart";

    heart.textContent =
        heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (12 + Math.random() * 28) + "px";
    heart.style.animationDuration = (5 + Math.random() * 10) + "s";
    heart.style.animationDelay = -(Math.random() * 15) + "s";

    heartsContainer.appendChild(heart);
}
