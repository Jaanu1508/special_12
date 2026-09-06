/* =====================================================
   CATCH MY HEART
   ENDLESS RUNNER GAME
===================================================== */


/* =====================================================
   GAME ELEMENTS
===================================================== */

const game = document.getElementById("game");

const dora = document.getElementById("dora");
const shinchan = document.getElementById("shinchan");

const objects = document.getElementById("objects");

const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");
const livesText = document.getElementById("lives");

const startScreen = document.getElementById("start");
const winScreen = document.getElementById("win");
const loseScreen = document.getElementById("lose");

const startButton = document.getElementById("startBtn");

const finalScore = document.getElementById("finalScore");
const loseScore = document.getElementById("loseScore");


/* =====================================================
   GAME SETTINGS
===================================================== */

const LANES = [25, 50, 75];

let currentLane = 1;

let score = 0;

let lives = 3;

let timeLeft = 45;

let gameRunning = false;

let gameOver = false;

let gameSpeed = 5;

let distanceToShinchan = 100;

let lastTime = 0;

let objectTimer = 0;

let heartTimer = 0;

let difficultyTimer = 0;

let gameAnimation;


/* =====================================================
   DORA MOVEMENT
===================================================== */

let isJumping = false;

let isSliding = false;

let jumpTimer = null;

let slideTimer = null;


/* =====================================================
   START GAME
===================================================== */

startButton.addEventListener("click", startGame);


function startGame() {

    startScreen.classList.add("hidden");

    winScreen.classList.add("hidden");

    loseScreen.classList.add("hidden");

    gameRunning = true;

    gameOver = false;

    score = 0;

    lives = 3;

    timeLeft = 45;

    gameSpeed = 5;

    distanceToShinchan = 100;

    currentLane = 1;

    updateHUD();

    positionCharacters();

    lastTime = performance.now();

    requestAnimationFrame(gameLoop);

}


/* =====================================================
   GAME LOOP
===================================================== */

function gameLoop(timestamp) {

    if (!gameRunning || gameOver) {
        return;
    }

    const deltaTime = timestamp - lastTime;

    lastTime = timestamp;


    /*
        Convert milliseconds into seconds
    */

    const delta = deltaTime / 1000;


    /* TIME */

    timeLeft -= delta;

    if (timeLeft <= 0) {

        timeLeft = 0;

        catchShinchan();

        return;
    }


    /* DIFFICULTY */

    difficultyTimer += delta;

    if (difficultyTimer >= 8) {

        difficultyTimer = 0;

        gameSpeed += 0.7;

    }


    /* OBJECT GENERATION */

    objectTimer += delta;

    heartTimer += delta;


    const obstacleInterval =
        Math.max(0.65, 1.4 - gameSpeed * 0.07);


    if (objectTimer >= obstacleInterval) {

        objectTimer = 0;

        createObstacle();

    }


    /*
        Hearts appear slightly less often
    */

    if (heartTimer >= 1.8) {

        heartTimer = 0;

        createHeart();

    }


    /* MOVE OBJECTS */

    moveObjects(delta);


    /* UPDATE SHINCHAN DISTANCE */

    distanceToShinchan -=
        delta * (0.35 + gameSpeed * 0.015);


    /*
        If Dora gets close enough,
        Shinchan is caught.
    */

    if (distanceToShinchan <= 0) {

        catchShinchan();

        return;
    }


    updateHUD();


    gameAnimation =
        requestAnimationFrame(gameLoop);
}


/* =====================================================
   POSITION CHARACTERS
===================================================== */

function positionCharacters() {

    dora.style.left =
        LANES[currentLane] + "%";

    /*
        Shinchan stays ahead.
        He can slightly move from side
        to side to make the chase feel alive.
    */

    shinchan.style.left =
        "50%";
}


/* =====================================================
   LANE MOVEMENT
===================================================== */

function moveLeft() {

    if (!gameRunning) return;

    if (currentLane > 0) {

        currentLane--;

        dora.style.left =
            LANES[currentLane] + "%";
    }
}


function moveRight() {

    if (!gameRunning) return;

    if (currentLane < 2) {

        currentLane++;

        dora.style.left =
            LANES[currentLane] + "%";
    }
}


/* =====================================================
   JUMP
===================================================== */

function jump() {

    if (!gameRunning) return;

    if (isJumping || isSliding) return;

    isJumping = true;

    dora.classList.add("jumping");


    /*
        CSS transform is overridden temporarily
        to create a jump.
    */

    dora.style.transition =
        "bottom 0.22s ease";


    dora.style.bottom =
        "28%";


    clearTimeout(jumpTimer);


    jumpTimer = setTimeout(() => {

        dora.style.bottom =
            "5%";

        setTimeout(() => {

            dora.classList.remove("jumping");

            isJumping = false;

        }, 220);

    }, 420);

}


/* =====================================================
   SLIDE
===================================================== */

function slide() {

    if (!gameRunning) return;

    if (isSliding || isJumping) return;

    isSliding = true;

    dora.classList.add("sliding");


    dora.style.transform =
        "translateX(-50%) scaleY(0.65)";


    clearTimeout(slideTimer);


    slideTimer = setTimeout(() => {

        dora.style.transform =
            "translateX(-50%)";

        dora.classList.remove("sliding");

        isSliding = false;

    }, 650);

}


/* =====================================================
   KEYBOARD CONTROLS
===================================================== */

document.addEventListener("keydown", function (event) {

    if (!gameRunning) return;


    switch (event.key) {

        case "ArrowLeft":
        case "a":
        case "A":

            moveLeft();

            break;


        case "ArrowRight":
        case "d":
        case "D":

            moveRight();

            break;


        case "ArrowUp":
        case "w":
        case "W":
        case " ":

            event.preventDefault();

            jump();

            break;


        case "ArrowDown":
        case "s":
        case "S":

            slide();

            break;

    }

});


/* =====================================================
   ON-SCREEN BUTTONS
===================================================== */

document.querySelectorAll("[data-key]").forEach(button => {

    button.addEventListener("click", function () {

        const key =
            this.getAttribute("data-key");


        if (key === "ArrowLeft" || key === "a") {

            moveLeft();

        }

        else if (
            key === "ArrowRight" ||
            key === "d"
        ) {

            moveRight();

        }

        else if (key === "ArrowUp") {

            jump();

        }

        else if (key === "ArrowDown") {

            slide();

        }

    });

});


/* =====================================================
   CREATE OBSTACLE
===================================================== */

function createObstacle() {

    const obstacle =
        document.createElement("div");


    obstacle.className =
        "game-object obstacle";


    const lane =
        Math.floor(Math.random() * 3);


    obstacle.dataset.lane =
        lane;


    /*
        Different obstacle types
    */

    const types = [
        "🚧",
        "📦",
        "🪨",
        "🚗"
    ];


    obstacle.textContent =
        types[
            Math.floor(
                Math.random() * types.length
            )
        ];


    /*
        Start near the horizon.
    */

    obstacle.style.left =
        LANES[lane] + "%";


    obstacle.style.top =
        "8%";


    obstacle.style.fontSize =
        "25px";


    obstacle.style.zIndex =
        "25";


    objects.appendChild(obstacle);

}


/* =====================================================
   CREATE HEART
===================================================== */

function createHeart() {

    const heart =
        document.createElement("div");


    heart.className =
        "game-object collectible";


    const lane =
        Math.floor(Math.random() * 3);


    heart.dataset.lane =
        lane;


    heart.textContent = "❤️";


    heart.style.left =
        LANES[lane] + "%";


    heart.style.top =
        "8%";


    heart.style.fontSize =
        "24px";


    heart.style.zIndex =
        "24";


    objects.appendChild(heart);

}


/* =====================================================
   MOVE OBJECTS
===================================================== */

function moveObjects(delta) {

    const allObjects =
        document.querySelectorAll(
            ".game-object"
        );


    allObjects.forEach(object => {

        let top =
            parseFloat(object.dataset.position);


        if (isNaN(top)) {

            top =
                parseFloat(
                    object.style.top
                ) || 8;

        }


        /*
            Objects move toward Dora.
        */

        top +=
            gameSpeed * delta * 8;


        object.dataset.position =
            top;


        object.style.top =
            top + "%";


        /*
            Make objects larger as
            they approach the player.
        */

        const scale =
            0.35 + (top / 100) * 1.2;


        object.style.transform =
            `translateX(-50%) scale(${scale})`;


        /*
            Check collision
        */

        if (top > 68 && top < 94) {

            checkCollision(object);

        }


        /*
            Remove objects after
            they leave the screen.
        */

        if (top > 110) {

            object.remove();

        }

    });

}


/* =====================================================
   COLLISION DETECTION
===================================================== */

function checkCollision(object) {

    const objectLane =
        Number(object.dataset.lane);


    /*
        Only collide if Dora is
        in the same lane.
    */

    if (objectLane !== currentLane) {

        return;

    }


    const isObstacle =
        object.classList.contains(
            "obstacle"
        );


    const isHeart =
        object.classList.contains(
            "collectible"
        );


    if (isHeart) {

        collectHeart(object);

        return;

    }


    if (isObstacle) {

        /*
            Jumping can avoid normal obstacles.
        */

        if (isJumping) {

            return;

        }


        /*
            Sliding can avoid some
            low obstacles.
        */

        if (
            isSliding &&
            object.textContent === "🚧"
        ) {

            return;

        }


        hitObstacle(object);

    }

}


/* =====================================================
   COLLECT HEART
===================================================== */

function collectHeart(object) {

    if (!object.parentNode) {
        return;
    }


    score += 10;


    /*
        Hearts bring Dora closer
        to Shinchan.
    */

    distanceToShinchan -= 4;


    object.textContent = "💖";


    object.style.transform =
        "translateX(-50%) scale(1.8)";


    setTimeout(() => {

        object.remove();

    }, 120);


    updateHUD();

}


/* =====================================================
   HIT OBSTACLE
===================================================== */

function hitObstacle(object) {

    if (!object.parentNode) {
        return;
    }


    /*
        Prevent the same obstacle
        from damaging Dora repeatedly.
    */

    object.remove();


    lives--;


    /*
        Small score penalty
    */

    score =
        Math.max(0, score - 5);


    /*
        Dora damage animation
    */

    dora.animate(
        [
            {
                transform:
                    "translateX(-50%) rotate(-8deg)"
            },

            {
                transform:
                    "translateX(-50%) rotate(8deg)"
            },

            {
                transform:
                    "translateX(-50%) rotate(-8deg)"
            },

            {
                transform:
                    "translateX(-50%)"
            }
        ],
        {
            duration: 350
        }
    );


    updateHUD();


    if (lives <= 0) {

        loseGame();

    }

}


/* =====================================================
   UPDATE HUD
===================================================== */

function updateHUD() {

    scoreText.textContent =
        score;


    const seconds =
        Math.max(
            0,
            Math.ceil(timeLeft)
        );


    const minutes =
        Math.floor(seconds / 60);


    const remainingSeconds =
        seconds % 60;


    timeText.textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(remainingSeconds).padStart(2, "0");


    livesText.textContent =
        "♥ ".repeat(lives).trim();


    if (finalScore) {

        finalScore.textContent =
            score;

    }


    if (loseScore) {

        loseScore.textContent =
            score;

    }

}


/* =====================================================
   WIN
===================================================== */

function catchShinchan() {

    if (gameOver) return;

    gameOver = true;

    gameRunning = false;


    cancelAnimationFrame(
        gameAnimation
    );


    /*
        Make Shinchan move
        toward Dora.
    */

    shinchan.animate(
        [
            {
                transform:
                    "translateX(-50%) scale(1)"
            },

            {
                transform:
                    "translateX(-50%) translateY(120px) scale(0.9)"
            },

            {
                transform:
                    "translateX(-50%) translateY(180px) scale(0.75)"
            }
        ],
        {
            duration: 900,
            fill: "forwards"
        }
    );


    setTimeout(() => {

        finalScore.textContent =
            score;


        winScreen.classList.remove(
            "hidden"
        );

    }, 850);

}


/* =====================================================
   LOSE
===================================================== */

function loseGame() {

    if (gameOver) return;

    gameOver = true;

    gameRunning = false;


    cancelAnimationFrame(
        gameAnimation
    );


    loseScore.textContent =
        score;


    loseScreen.classList.remove(
        "hidden"
    );

}


/* =====================================================
   INITIAL STATE
===================================================== */

positionCharacters();

updateHUD();
