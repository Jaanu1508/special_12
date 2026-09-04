/* =========================================
   ELEMENTS
========================================= */

const gameArea =
    document.getElementById("gameArea");

const dora =
    document.getElementById("dora");

const shinchan =
    document.getElementById("shinchan");

const timerDisplay =
    document.getElementById("timer");

const scoreDisplay =
    document.getElementById("score");

const chaseMessage =
    document.getElementById("chaseMessage");

const missionOverlay =
    document.getElementById("missionOverlay");

const winScreen =
    document.getElementById("winScreen");

const loseScreen =
    document.getElementById("loseScreen");

const startButton =
    document.getElementById("startButton");

const retryButton =
    document.getElementById("retryButton");

const continueButton =
    document.getElementById("continueButton");


/* =========================================
   GAME VARIABLES
========================================= */

let doraX = 100;

let shinX = 700;

let gameRunning = false;

let timeLeft = 45;

let score = 0;

let lastTime = 0;

let shinDirection = 1;

let keys = {};

let animationFrame;

let timerInterval;


/* =========================================
   START
========================================= */

function startGame() {

    missionOverlay.style.display = "none";

    winScreen.style.display = "none";

    loseScreen.style.display = "none";


    doraX = 100;

    shinX =
        Math.max(
            gameArea.clientWidth - 280,
            500
        );


    timeLeft = 45;

    score = 0;


    updatePositions();

    scoreDisplay.textContent =
        "SCORE : 0";

    timerDisplay.textContent =
        "00:45";


    gameRunning = true;


    dora.classList.add("running");

    shinchan.classList.add("running");


    chaseMessage.textContent =
        "CATCH HIM!";


    clearInterval(timerInterval);


    timerInterval =
        setInterval(() => {

            if (!gameRunning)
                return;

            timeLeft--;

            timerDisplay.textContent =
                "00:" +
                String(timeLeft).padStart(2, "0");


            if (timeLeft <= 0) {

                loseGame();

            }

        }, 1000);


    lastTime = performance.now();

    animationFrame =
        requestAnimationFrame(gameLoop);

}


/* =========================================
   GAME LOOP
========================================= */

function gameLoop(timestamp) {

    if (!gameRunning)
        return;


    const delta =
        Math.min(
            (timestamp - lastTime) / 16.67,
            2
        );


    lastTime = timestamp;


    moveDora(delta);

    moveShinchan(delta);

    checkCatch();


    animationFrame =
        requestAnimationFrame(gameLoop);

}


/* =========================================
   DORA MOVEMENT
========================================= */

function moveDora(delta) {

    const moveSpeed = 6 * delta;


    let moving = false;


    if (
        keys["arrowright"] ||
        keys["d"]
    ) {

        doraX += moveSpeed;

        moving = true;

    }


    if (
        keys["arrowleft"] ||
        keys["a"]
    ) {

        doraX -= moveSpeed;

        moving = true;

    }


    const maxX =
        gameArea.clientWidth - 150;


    if (doraX < 10)
        doraX = 10;


    if (doraX > maxX)
        doraX = maxX;


    dora.style.left =
        doraX + "px";


    if (moving) {

        dora.classList.add("running");

    }
    else {

        dora.classList.remove("running");

    }

}


/* =========================================
   SHINCHAN MOVEMENT
========================================= */

function moveShinchan(delta) {

    /*
        Shinchan keeps running.

        He changes direction
        near the edges so the
        chase feels alive.
    */


    const speed =
        2.7 * delta;


    shinX +=
        shinDirection * speed;


    const leftLimit =
        gameArea.clientWidth * 0.45;


    const rightLimit =
        gameArea.clientWidth - 160;


    if (shinX > rightLimit) {

        shinDirection = -1;

    }


    if (shinX < leftLimit) {

        shinDirection = 1;

    }


    shinchan.style.left =
        shinX + "px";


    shinchan.style.right =
        "auto";


    shinchan.classList.add("running");

}


/* =========================================
   COLLISION
========================================= */

function checkCatch() {

    const doraCenter =
        doraX + 60;


    const shinCenter =
        shinX + 77;


    const distance =
        Math.abs(
            doraCenter - shinCenter
        );


    if (distance < 105) {

        winGame();

    }


    /*
       Score increases when
       Dora gets closer.
    */

    if (distance < 300) {

        score += 1;

        scoreDisplay.textContent =
            "SCORE : " +
            score;

    }

}


/* =========================================
   UPDATE POSITIONS
========================================= */

function updatePositions() {

    dora.style.left =
        doraX + "px";


    shinchan.style.left =
        shinX + "px";


    shinchan.style.right =
        "auto";

}


/* =========================================
   KEYBOARD
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        const key =
            event.key.toLowerCase();


        if (
            key === "arrowleft" ||
            key === "arrowright" ||
            key === "a" ||
            key === "d"
        ) {

            event.preventDefault();

            keys[key] = true;

        }

    }
);


document.addEventListener(
    "keyup",
    function(event) {

        const key =
            event.key.toLowerCase();


        keys[key] = false;

    }
);


/* =========================================
   MOBILE / BUTTON CONTROLS
========================================= */

document
    .querySelectorAll(".controls button")
    .forEach(button => {

        const key =
            button.dataset.key.toLowerCase();


        button.addEventListener(
            "mousedown",
            () => {

                keys[key] = true;

            }
        );


        button.addEventListener(
            "mouseup",
            () => {

                keys[key] = false;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                keys[key] = false;

            }
        );


        button.addEventListener(
            "touchstart",
            event => {

                event.preventDefault();

                keys[key] = true;

            }
        );


        button.addEventListener(
            "touchend",
            event => {

                event.preventDefault();

                keys[key] = false;

            }
        );

    });


/* =========================================
   WIN
========================================= */

function winGame() {

    if (!gameRunning)
        return;


    gameRunning = false;


    clearInterval(timerInterval);

    cancelAnimationFrame(animationFrame);


    dora.classList.remove("running");

    shinchan.classList.remove("running");


    chaseMessage.textContent =
        "YOU CAUGHT HIM! ❤️";


    score += 500;


    scoreDisplay.textContent =
        "SCORE : " +
        score;


    setTimeout(() => {

        winScreen.style.display =
            "flex";

    }, 700);

}


/* =========================================
   LOSE
========================================= */

function loseGame() {

    if (!gameRunning)
        return;


    gameRunning = false;


    clearInterval(timerInterval);

    cancelAnimationFrame(animationFrame);


    dora.classList.remove("running");

    shinchan.classList.remove("running");


    chaseMessage.textContent =
        "HE ESCAPED!";


    setTimeout(() => {

        loseScreen.style.display =
            "flex";

    }, 500);

}


/* =========================================
   RETRY
========================================= */

retryButton.addEventListener(
    "click",
    startGame
);


/* =========================================
   START BUTTON
========================================= */

startButton.addEventListener(
    "click",
    startGame
);


/* =========================================
   NEXT CHAPTER
========================================= */

continueButton.addEventListener(
    "click",
    function() {

        /*
          We'll connect this to
          archive.html when we
          build the next page.
        */

        window.location.href =
            "archive.html";

    }
);


/* =========================================
   INITIAL POSITION
========================================= */

shinchan.style.left = "700px";

dora.style.left = "100px";
