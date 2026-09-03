const heartsContainer = document.querySelector(".hearts");

const hearts = ["❤️", "🤍"];

for (let i = 0; i < 100; i++) {
    const heart = document.createElement("span");

    heart.className = "heart";

    heart.textContent =
        hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = (12 + Math.random() * 25) + "px";
    heart.style.animationDuration = (6 + Math.random() * 8) + "s";
    heart.style.animationDelay = -(Math.random() * 10) + "s";

    heartsContainer.appendChild(heart);
}
