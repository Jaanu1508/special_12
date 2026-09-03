const player = document.getElementById("player");
const boy = document.getElementById("boy");
const gameArea = document.getElementById("gameArea");
const timerDisplay = document.getElementById("timer");
const message = document.getElementById("gameMessage");
const winScreen = document.getElementById("winScreen");

let playerX = 100;
let boyX = 700;

let gameRunning = false;
let timeLeft = 30;

let timer;

const speed = 8;


/* START GAME */

function startGame() {

    gameRunning = true;

    timeLeft = 30;

    playerX = 100;
    boyX = 700;

    player.style.left = playerX + "px";
    boy.style.left = boyX + "px";

    timerDisplay.textContent = "TIME: " + timeLeft;

    message.textContent = "CATCH HIM. ❤️";

    clearInterval(timer);

    timer = setInterval(() => {

        timeLeft--;

        timerDisplay.textContent =
            "TIME: " + timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timer);

            gameRunning = false;

            message.textContent =
                "HE ESCAPED 😭 TRY AGAIN";

        }

    }, 1000);
}


/* KEYBOARD CONTROLS */

document.addEventListener("keydown", function(event) {

    if (!gameRunning) return;

    const key = event.key.toLowerCase();

    if (key === "arrowright" || key === "d") {

        playerX += speed;

    }

    if (key === "arrowleft" || key === "a") {

        playerX -= speed;

    }


    /* Keep player inside screen */

    const maxX =
        gameArea.clientWidth - 60;

    if (playerX < 0) {
        playerX = 0;
    }

    if (playerX > maxX) {
        playerX = maxX;
    }


    player.style.left =
        playerX + "px";


    /* Check if player caught Rajesh */

    checkCollision();

});


/* RAJESH MOVEMENT */

setInterval(() => {

    if (!gameRunning) return;

    /*
       Rajesh randomly moves
       left and right.
    */

    const movement =
        Math.random() > 0.5 ? 1 : -1;

    boyX += movement * 12;


    const maxX =
        gameArea.clientWidth - 80;

    if (boyX < 50) {
        boyX = 50;
    }

    if (boyX > maxX) {
        boyX = maxX;
    }

    boy.style.left =
        boyX + "px";


    checkCollision();

}, 400);


/* COLLISION */

function checkCollision() {

    const distance =
        Math.abs(playerX - boyX);

    if (distance < 55) {

        winGame();

    }

}


/* WIN */

function winGame() {

    if (!gameRunning) return;

    gameRunning = false;

    clearInterval(timer);

    message.textContent =
        "YOU CAUGHT HIM ❤️";

    setTimeout(() => {

        winScreen.style.display =
            "flex";

    }, 600);

}


/* CONTINUE */

function continueStory() {

    /*
       We'll connect this to
       the next page later.
    */

    window.location.href =
        "archive.html";

}
