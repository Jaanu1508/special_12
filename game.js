/* =========================================
   CATCH MY HEART ❤️
   SUBWAY-SURFERS STYLE RUNNER
========================================= */


const game = document.getElementById("game");

const dora = document.getElementById("dora");
const shinchan = document.getElementById("shinchan");

const objects = document.getElementById("objects");

const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const livesElement = document.getElementById("lives");

const startScreen = document.getElementById("start");
const winScreen = document.getElementById("win");
const loseScreen = document.getElementById("lose");

const startButton = document.getElementById("startBtn");


/* =========================================
   GAME SETTINGS
========================================= */

const lanes = [
    "18%",
    "50%",
    "82%"
];

let currentLane = 1;

let score = 0;

let lives = 3;

let timeLeft = 45;

let gameRunning = false;

let gameOver = false;

let lastFrame = 0;

let spawnTimer = 0;

let speed = 0.42;

let difficulty = 1;

let jumping = false;

let sliding = false;

let jumpTimer = null;

let slideTimer = null;

let timerInterval = null;


/* =========================================
   DORA POSITION
========================================= */

function updateDoraLane() {

    dora.style.left =
        `calc(${lanes[currentLane]} - 120px)`;

}


/* =========================================
   MOVE LEFT / RIGHT
========================================= */

function moveLeft() {

    if (!gameRunning) return;

    if (currentLane > 0) {

        currentLane--;

        updateDoraLane();

    }

}


function moveRight() {

    if (!gameRunning) return;

    if (currentLane < 2) {

        currentLane++;

        updateDoraLane();

    }

}


/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener("keydown", function (event) {

    if (!gameRunning) return;


    switch (event.key) {

        case "ArrowLeft":
            moveLeft();
            break;


        case "ArrowRight":
            moveRight();
            break;


        case "a":
        case "A":
            moveLeft();
            break;


        case "d":
        case "D":
            moveRight();
            break;


        case "ArrowUp":
        case "w":
        case "W":
            jump();
            break;


        case "ArrowDown":
        case "s":
        case "S":
            slide();
            break;

    }

});


/* =========================================
   JUMP
========================================= */

function jump() {

    if (!gameRunning) return;

    if (jumping || sliding) return;

    jumping = true;

    const originalBottom =
        parseFloat(
            getComputedStyle(dora).bottom
        );


    let progress = 0;


    jumpTimer = setInterval(function () {

        progress += 0.055;


        const jumpHeight =
            Math.sin(Math.PI * progress) * 120;


        dora.style.bottom =
            `${originalBottom + jumpHeight}px`;


        if (progress >= 1) {

            clearInterval(jumpTimer);

            dora.style.bottom =
                `${originalBottom}px`;

            jumping = false;

        }

    }, 28);

}


/* =========================================
   SLIDE
========================================= */

function slide() {

    if (!gameRunning) return;

    if (jumping || sliding) return;

    sliding = true;


    dora.style.transform =
        "scaleY(0.62) translateY(30px)";


    slideTimer = setTimeout(function () {

        dora.style.transform = "";

        sliding = false;

    }, 600);

}


/* =========================================
   CREATE OBJECT
========================================= */

function createObject() {

    if (!gameRunning) return;


    const object =
        document.createElement("div");


    const random =
        Math.random();


    let type;


    if (random < 0.35) {

        type = "heart";

    }

    else if (random < 0.68) {

        type = "rock";

    }

    else {

        type = "crate";

    }


    object.classList.add(
        "obj",
        type
    );


    const randomLane =
        Math.floor(
            Math.random() * 3
        );


    object.dataset.lane =
        randomLane;


    object.dataset.y =
        -70;


    object.style.left =
        lanes[randomLane];


    object.style.top =
        "-70px";


    if (type === "heart") {

        object.innerHTML = "❤️";

    }

    else if (type === "rock") {

        object.innerHTML = "🪨";

    }

    else {

        object.innerHTML = "📦";

    }


    objects.appendChild(object);

}


/* =========================================
   COLLISION
========================================= */

function isColliding(element1, element2) {

    const rect1 =
        element1.getBoundingClientRect();

    const rect2 =
        element2.getBoundingClientRect();


    return (

        rect1.left < rect2.right &&

        rect1.right > rect2.left &&

        rect1.top < rect2.bottom &&

        rect1.bottom > rect2.top

    );

}


/* =========================================
   HANDLE COLLISION
========================================= */

function handleCollision(object) {

    if (object.dataset.hit === "true") {
        return;
    }


    if (
        !isColliding(
            dora,
            object
        )
    ) {

        return;

    }


    object.dataset.hit = "true";


    /* HEART */

    if (
        object.classList.contains(
            "heart"
        )
    ) {

        score += 250;

        scoreElement.textContent =
            score;

        object.remove();

        return;

    }


    /* OBSTACLE */

    if (
        object.classList.contains(
            "rock"
        ) ||
        object.classList.contains(
            "crate"
        )
    ) {


        /*
           Jumping Dora avoids
           ground obstacles.
        */

        if (jumping) {

            return;

        }


        /*
           Sliding Dora can
           avoid some obstacles.
        */

        if (sliding) {

            return;

        }


        lives--;

        updateLives();


        object.remove();


        /*
           Screen shake
        */

        game.classList.add(
            "hit"
        );


        setTimeout(function () {

            game.classList.remove(
                "hit"
            );

        }, 250);


        if (lives <= 0) {

            loseGame();

        }

    }

}


/* =========================================
   UPDATE LIVES
========================================= */

function updateLives() {

    if (lives === 3) {

        livesElement.textContent =
            "♥ ♥ ♥";

    }

    else if (lives === 2) {

        livesElement.textContent =
            "♥ ♥";

    }

    else if (lives === 1) {

        livesElement.textContent =
            "♥";

    }

    else {

        livesElement.textContent =
            "";

    }

}


/* =========================================
   UPDATE OBJECTS
========================================= */

function updateObjects(deltaTime) {

    const allObjects =
        document.querySelectorAll(
            ".obj"
        );


    allObjects.forEach(function (object) {

        let y =
            parseFloat(
                object.dataset.y
            );


        /*
           Objects move toward Dora.
        */

        y +=
            deltaTime *
            speed *
            0.55;


        object.dataset.y =
            y;


        /*
           Perspective scaling.
        */

        const scale =
            0.55 +
            (y / 650);


        object.style.top =
            `${y}px`;


        object.style.transform =
            `translateX(-50%) scale(${scale})`;


        /*
           Collision.
        */

        handleCollision(object);


        /*
           Remove objects after
           leaving screen.
        */

        if (
            y >
            window.innerHeight + 100
        ) {

            object.remove();

        }

    });

}


/* =========================================
   SCORE
========================================= */

function updateScore(deltaTime) {

    score +=
        Math.floor(
            deltaTime *
            0.035 *
            speed *
            10
        );


    scoreElement.textContent =
        score;


    /*
       Catch Shinchan.
    */

    if (score >= 2500) {

        winGame();

    }

}


/* =========================================
   SPEED INCREASE
========================================= */

function increaseDifficulty() {

    difficulty += 0.05;

    speed += 0.01;


    /*
       Maximum speed.
    */

    if (speed > 1.15) {

        speed = 1.15;

    }

}


/* =========================================
   MAIN GAME LOOP
========================================= */

function gameLoop(timestamp) {

    if (!gameRunning) {
        return;
    }


    if (!lastFrame) {

        lastFrame =
            timestamp;

    }


    const deltaTime =
        Math.min(
            40,
            timestamp - lastFrame
        );


    lastFrame =
        timestamp;


    /*
       Spawn obstacles.
    */

    spawnTimer +=
        deltaTime;


    const spawnDelay =
        900 / speed;


    if (
        spawnTimer >
        spawnDelay
    ) {

        spawnTimer = 0;

        createObject();

    }


    /*
       Move objects.
    */

    updateObjects(
        deltaTime
    );


    /*
       Increase score.
    */

    updateScore(
        deltaTime
    );


    /*
       Gradually increase speed.
    */

    if (
        Math.random() < 0.003
    ) {

        increaseDifficulty();

    }


    /*
       Continue game.
    */

    if (gameRunning) {

        requestAnimationFrame(
            gameLoop
        );

    }

}


/* =========================================
   GAME TIMER
========================================= */

function startTimer() {

    timerInterval =
        setInterval(function () {

            if (!gameRunning) {
                return;
            }


            timeLeft--;


            timeElement.textContent =
                "00:" +
                String(timeLeft)
                    .padStart(2, "0");


            if (timeLeft <= 0) {

                loseGame();

            }

        }, 1000);

}


/* =========================================
   START GAME
========================================= */

function startGame() {

    if (gameRunning) {
        return;
    }


    gameRunning = true;

    gameOver = false;


    score = 0;

    lives = 3;

    timeLeft = 45;

    currentLane = 1;

    speed = 0.42;

    difficulty = 1;


    scoreElement.textContent =
        "0";


    timeElement.textContent =
        "00:45";


    updateLives();

    updateDoraLane();


    /*
       Remove old objects.
    */

    objects.innerHTML = "";


    /*
       Hide start screen.
    */

    startScreen.classList.add(
        "hidden"
    );


    /*
       Reset frame timing.
    */

    lastFrame =
        performance.now();


    spawnTimer = 0;


    /*
       Start timer.
    */

    startTimer();


    /*
       Start game.
    */

    requestAnimationFrame(
        gameLoop
    );

}


/* =========================================
   WIN GAME
========================================= */

function winGame() {

    if (gameOver) {
        return;
    }


    gameOver = true;

    gameRunning = false;


    clearInterval(
        timerInterval
    );


    /*
       Remove obstacles.
    */

    objects.innerHTML = "";


    /*
       Make Shinchan come closer.
    */

    shinchan.style.transition =
        "all 1.5s ease";


    shinchan.style.left =
        "calc(50% - 80px)";


    shinchan.style.bottom =
        "12%";


    shinchan.style.transform =
        "scale(1.15)";


    /*
       Show win screen
       after catch animation.
    */

    setTimeout(function () {

        winScreen.classList.remove(
            "hidden"
        );

    }, 1200);

}


/* =========================================
   LOSE GAME
========================================= */

function loseGame() {

    if (gameOver) {
        return;
    }


    gameOver = true;

    gameRunning = false;


    clearInterval(
        timerInterval
    );


    loseScreen.classList.remove(
        "hidden"
    );

}


/* =========================================
   START BUTTON
========================================= */

startButton.addEventListener(
    "click",
    startGame
);


/* =========================================
   ON-SCREEN BUTTONS
========================================= */

document
    .querySelectorAll(
        "[data-key]"
    )
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const key =
                    button.dataset.key;


                if (
                    key ===
                    "ArrowLeft"
                ) {

                    moveLeft();

                }

                else if (
                    key ===
                    "ArrowRight"
                ) {

                    moveRight();

                }

                else if (
                    key ===
                    "ArrowUp"
                ) {

                    jump();

                }

                else if (
                    key ===
                    "ArrowDown"
                ) {

                    slide();

                }

                else if (
                    key.toLowerCase() ===
                    "a"
                ) {

                    moveLeft();

                }

                else if (
                    key.toLowerCase() ===
                    "d"
                ) {

                    moveRight();

                }

            }
        );

    });


/* =========================================
   TOUCH / SWIPE CONTROLS
========================================= */

let touchStartX = 0;

let touchStartY = 0;


game.addEventListener(
    "touchstart",
    function (event) {

        const touch =
            event.changedTouches[0];


        touchStartX =
            touch.clientX;

        touchStartY =
            touch.clientY;

    },
    {
        passive: true
    }
);


game.addEventListener(
    "touchend",
    function (event) {

        const touch =
            event.changedTouches[0];


        const deltaX =
            touch.clientX -
            touchStartX;


        const deltaY =
            touch.clientY -
            touchStartY;


        const threshold = 40;


        /*
           Horizontal swipe
        */

        if (
            Math.abs(deltaX) >
            Math.abs(deltaY)
        ) {

            if (
                deltaX >
                threshold
            ) {

                moveRight();

            }

            else if (
                deltaX <
                -threshold
            ) {

                moveLeft();

            }

        }


        /*
           Vertical swipe
        */

        else {

            if (
                deltaY <
                -threshold
            ) {

                jump();

            }

            else if (
                deltaY >
                threshold
            ) {

                slide();

            }

        }

    },
    {
        passive: true
    }
);


/* =========================================
   INITIAL POSITION
========================================= */

updateDoraLane();

updateLives();
