/* =========================================
   ELEMENTS
========================================= */

const gameWorld =
    document.getElementById("gameWorld");

const dora =
    document.getElementById("dora");

const shinchan =
    document.getElementById("shinchan");

const objectsContainer =
    document.getElementById("objects");

const timerDisplay =
    document.getElementById("timer");

const scoreDisplay =
    document.getElementById("score");

const message =
    document.getElementById("message");

const startScreen =
    document.getElementById("startScreen");

const winScreen =
    document.getElementById("winScreen");

const loseScreen =
    document.getElementById("loseScreen");

const startButton =
    document.getElementById("startButton");

const retryButton =
    document.getElementById("retryButton");

const nextButton =
    document.getElementById("nextButton");


/* =========================================
   GAME VARIABLES
========================================= */

let running = false;

let lane = 1;

let doraLane = 1;

let jump = false;

let sliding = false;

let jumpHeight = 0;

let objects = [];

let speed = 0.42;

let score = 0;

let timeLeft = 60;

let lives = 3;

let lastTime = 0;

let spawnTimer = 0;

let timer;


/* =========================================
   LANE POSITIONS
========================================= */

const lanes = [
    25,
    50,
    75
];


/* =========================================
   START GAME
========================================= */

function startGame() {

    startScreen.classList.add("hidden");

    winScreen.classList.add("hidden");

    loseScreen.classList.add("hidden");


    running = true;

    lane = 1;

    doraLane = 1;

    speed = 0.42;

    score = 0;

    timeLeft = 60;

    lives = 3;


    clearObjects();


    updateDora();


    scoreDisplay.textContent =
        "SCORE 0000";

    timerDisplay.textContent =
        "01:00";


    dora.classList.add("running");

    shinchan.classList.add("running");


    message.textContent =
        "CATCH HIM!";


    clearInterval(timer);


    timer = setInterval(() => {

        if (!running)
            return;


        timeLeft--;


        timerDisplay.textContent =
            "00:" +
            String(timeLeft).padStart(2, "0");


        if (timeLeft <= 0) {

            loseGame();

        }

    }, 1000);


    lastTime =
        performance.now();


    requestAnimationFrame(
        gameLoop
    );

}


/* =========================================
   GAME LOOP
========================================= */

function gameLoop(time) {

    if (!running)
        return;


    const delta =
        Math.min(
            time - lastTime,
            40
        );


    lastTime = time;


    updateDora();

    updateObjects(delta);

    spawnTimer += delta;


    if (spawnTimer > 750) {

        spawnObject();

        spawnTimer = 0;

    }


    /*
       Slowly increase speed
    */

    speed += 0.00004 * delta;


    if (speed > 0.9)
        speed = 0.9;


    if (speed > 0.65) {

        gameWorld.classList.add("fast");

    }


    checkCatchShinchan();


    requestAnimationFrame(
        gameLoop
    );

}


/* =========================================
   DORA LANE MOVEMENT
========================================= */

function moveLeft() {

    if (!running)
        return;


    if (lane > 0) {

        lane--;

        doraLane = lane;

        updateDora();

    }

}


function moveRight() {

    if (!running)
        return;


    if (lane < 2) {

        lane++;

        doraLane = lane;

        updateDora();

    }

}


/* =========================================
   DORA POSITION
========================================= */

function updateDora() {

    const percentage =
        lanes[doraLane];


    dora.style.left =
        percentage + "%";


    dora.style.transform =
        `translateX(-50%) scale(${jump ? 1 : 0.9}) translateY(${-jumpHeight}px)`;

}


/* =========================================
   JUMP
========================================= */

function doJump() {

    if (!running)
        return;


    if (jump)
        return;


    jump = true;


    let start =
        performance.now();


    function jumpAnimation(now) {

        if (!jump)
            return;


        let progress =
            (now - start) / 700;


        if (progress >= 1) {

            jump = false;

            jumpHeight = 0;

            updateDora();

            return;

        }


        /*
           Parabolic jump
        */

        jumpHeight =
            Math.sin(progress * Math.PI) * 130;


        updateDora();


        requestAnimationFrame(
            jumpAnimation
        );

    }


    requestAnimationFrame(
        jumpAnimation
    );

}


/* =========================================
   SLIDE
========================================= */

function doSlide() {

    if (!running)
        return;


    if (sliding)
        return;


    sliding = true;

    dora.style.transform =
        `translateX(-50%) translateY(-${jumpHeight}px) scaleY(.55) scaleX(1.15)`;


    setTimeout(() => {

        sliding = false;

        updateDora();

    }, 500);

}


/* =========================================
   SPAWN OBJECT
========================================= */

function spawnObject() {

    if (!running)
        return;


    const object =
        document.createElement("div");


    object.classList.add(
        "game-object"
    );


    /*
       Random lane
    */

    const objectLane =
        Math.floor(
            Math.random() * 3
        );


    object.dataset.lane =
        objectLane;


    /*
       Random object
    */

    const random =
        Math.random();


    if (random < .55) {

        object.classList.add(
            "obstacle-rock"
        );

        object.dataset.type =
            "obstacle";

    }

    else if (random < .78) {

        object.classList.add(
            "obstacle-cone"
        );

        object.dataset.type =
            "obstacle";

    }

    else if (random < .90) {

        object.classList.add(
            "obstacle-box"
        );

        object.dataset.type =
            "obstacle";

    }

    else {

        object.classList.add(
            "collectible"
        );

        object.textContent =
            "♥";

        object.dataset.type =
            "heart";

    }


    object.style.left =
        lanes[objectLane] + "%";


    /*
       Start at horizon
    */

    object.dataset.depth = 0;


    objectsContainer.appendChild(
        object
    );


    objects.push(object);

}


/* =========================================
   UPDATE OBJECTS
========================================= */

function updateObjects(delta) {

    for (
        let i = objects.length - 1;
        i >= 0;
        i--
    ) {

        const object =
            objects[i];


        let depth =
            parseFloat(
                object.dataset.depth
            );


        depth +=
            speed *
            delta /
            100;


        object.dataset.depth =
            depth;


        /*
           Perspective movement
        */

        const top =
            32 +
            depth * 75;


        const scale =
            .1 +
            depth * 1.5;


        object.style.top =
            top + "%";


        object.style.transform =
            `translateX(-50%) scale(${scale})`;


        /*
           Collision area
        */

        if (
            depth > .82 &&
            depth < 1.12
        ) {

            checkCollision(
                object
            );

        }


        /*
           Remove when passed
        */

        if (depth > 1.2) {

            object.remove();

            objects.splice(i, 1);

        }

    }

}


/* =========================================
   COLLISION
========================================= */

function checkCollision(object) {

    if (
        Number(object.dataset.lane)
        !== doraLane
    ) {

        return;

    }


    /*
       Hearts
    */

    if (
        object.dataset.type ===
        "heart"
    ) {

        collectHeart(object);

        return;

    }


    /*
       Jump over obstacle
    */

    if (
        jumpHeight > 55
    ) {

        return;

    }


    /*
       Hit obstacle
    */

    hitObstacle(object);

}


/* =========================================
   HEART COLLECTION
========================================= */

function collectHeart(object) {

    score += 100;


    scoreDisplay.textContent =
        "SCORE " +
        String(score)
            .padStart(4, "0");


    message.textContent =
        "+100 ❤️";


    object.remove();


    objects =
        objects.filter(
            item => item !== object
        );


    setTimeout(() => {

        if (running) {

            message.textContent =
                "CATCH HIM!";

        }

    }, 500);

}


/* =========================================
   OBSTACLE HIT
========================================= */

function hitObstacle(object) {

    /*
       Prevent repeated hits
    */

    if (
        object.dataset.hit ===
        "true"
    ) {

        return;

    }


    object.dataset.hit =
        "true";


    lives--;


    object.remove();


    objects =
        objects.filter(
            item => item !== object
        );


    score =
        Math.max(
            0,
            score - 50
        );


    scoreDisplay.textContent =
        "SCORE " +
        String(score)
            .padStart(4, "0");


    message.textContent =
        "OUCH! KEEP RUNNING!";


    dora.animate(
        [
            {
                transform:
                    "translateX(-50%) translateX(-15px)"
            },
            {
                transform:
                    "translateX(-50%) translateX(15px)"
            },
            {
                transform:
                    "translateX(-50%) translateX(0)"
            }
        ],
        {
            duration: 300
        }
    );


    if (lives <= 0) {

        setTimeout(
            loseGame,
            500
        );

    }

}


/* =========================================
   CATCH SHINCHAN
========================================= */

function checkCatchShinchan() {

    /*
       As score increases,
       Shinchan slowly comes closer.
    */

    const progress =
        Math.min(
            score / 2500,
            1
        );


    const scale =
        .65 +
        progress * .25;


    shinchan.style.transform =
        `translateX(-50%) scale(${scale})`;


    /*
       At enough score,
       Dora catches him.
    */

    if (
        score >= 2500
    ) {

        winGame();

    }

}


/* =========================================
   WIN
========================================= */

function winGame() {

    if (!running)
        return;


    running = false;


    clearInterval(timer);


    dora.classList.remove(
        "running"
    );

    shinchan.classList.remove(
        "running"
    );


    message.textContent =
        "YOU CAUGHT HIM! ❤️";


    score += 500;


    scoreDisplay.textContent =
        "SCORE " +
        String(score)
            .padStart(4, "0");


    setTimeout(() => {

        winScreen.classList.remove(
            "hidden"
        );

    }, 800);

}


/* =========================================
   LOSE
========================================= */

function loseGame() {

    if (!running)
        return;


    running = false;


    clearInterval(timer);


    dora.classList.remove(
        "running"
    );

    shinchan.classList.remove(
        "running"
    );


    loseScreen.classList.remove(
        "hidden"
    );

}


/* =========================================
   CLEAR OBJECTS
========================================= */

function clearObjects() {

    objects.forEach(
        object => object.remove()
    );


    objects = [];

}


/* =========================================
   KEYBOARD
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            [
                "ArrowLeft",
                "ArrowRight",
                "ArrowUp",
                "ArrowDown"
            ].includes(event.key)
        ) {

            event.preventDefault();

        }


        if (
            event.key === "ArrowLeft" ||
            event.key.toLowerCase() === "a"
        ) {

            moveLeft();

        }


        if (
            event.key === "ArrowRight" ||
            event.key.toLowerCase() === "d"
        ) {

            moveRight();

        }


        if (
            event.key === "ArrowUp" ||
            event.key.toLowerCase() === "w"
        ) {

            doJump();

        }


        if (
            event.key === "ArrowDown" ||
            event.key.toLowerCase() === "s"
        ) {

            doSlide();

        }

    }
);


/* =========================================
   MOBILE BUTTONS
========================================= */

document
    .querySelector('[data-key="left"]')
    .addEventListener(
        "click",
        moveLeft
    );


document
    .querySelector('[data-key="right"]')
    .addEventListener(
        "click",
        moveRight
    );


document
    .querySelector('[data-key="jump"]')
    .addEventListener(
        "click",
        doJump
    );


document
    .querySelector('[data-key="slide"]')
    .addEventListener(
        "click",
        doSlide
    );


/* =========================================
   BUTTONS
========================================= */

startButton.addEventListener(
    "click",
    startGame
);


retryButton.addEventListener(
    "click",
    startGame
);


nextButton.addEventListener(
    "click",
    () => {

        window.location.href =
            "archive.html";

    }
);
