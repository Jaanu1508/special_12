// HEART ANIMATION

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


// LOGIN INFORMATION

const correctUsername = "12102025";
const correctPassword = "AKNAABNA";


// LOGIN FUNCTION

function login() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    if (username === correctUsername && password === correctPassword) {

        message.textContent = "IDENTITY VERIFIED ✓";
        message.style.color = "white";

        setTimeout(() => {
            window.location.href = "game.html";
        }, 1500);

    } else {

        message.textContent = "ACCESS DENIED ✕";
        message.style.color = "#ff4444";
    }
}
