```javascript
const dora = document.getElementById("dora");
const shinchan = document.getElementById("shinchan");

const objects = document.getElementById("objects");

const scoreText = document.getElementById("score");
const distanceText = document.getElementById("distance");

const startScreen = document.getElementById("startScreen");
const gameOver = document.getElementById("gameOver");

const finalScore = document.getElementById("finalScore");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");


/* =========================
   GAME VARIABLES
========================= */

let lane = 1;

const lanes = [
    "33.33%",
    "50%",
    "66.66%"
];

let score = 0;
let distance = 0;

let speed = 5;

let running = false;

let jumping = false;
let sliding = false;

let obstacleTimer = 0;
let coinTimer = 0;

let objectsList = [];

let animation;


/*
    THIS CONTROLS HOW CLOSE
    SHINCHAN GETS TO DORA.
*/

let chaseDistance = 150;


/* =========================
   START GAME
========================= */

startBtn.addEventListener(
    "click",
    startGame
);

restartBtn.addEventListener(
    "click",
    startGame
);


function startGame() {

    score = 0;

    distance = 0;

    speed = 5;

    lane = 1;

    chaseDistance = 150;

    objects.innerHTML = "";

    objectsList = [];

    scoreText.textContent = "0";

    distanceText.textContent = "0";

    startScreen.classList.add("hidden");

    gameOver.classList.add("hidden");

    running = true;

    jumping = false;

    sliding = false;

    dora.classList.add("running");

    shinchan.classList.add("running");

    setLane();

    cancelAnimationFrame(animation);

    animation =
        requestAnimationFrame(gameLoop);
}


/* =========================
   MAIN GAME LOOP
========================= */

function gameLoop(time) {

    if (!running) return;


    distance += 0.1;

    distanceText.textContent =
        Math.floor(distance);


    /*
       GAME GETS FASTER
    */

    speed += 0.001;


    /*
       SHINCHAN GETS CLOSER
       THE LONGER YOU RUN
    */

    chaseDistance -= 0.015;


    /*
       Minimum distance between
       Dora and Shinchan.
    */

    if (chaseDistance < 35) {
        chaseDistance = 35;
    }


    updateShinchan();


    spawnObjects(time);

    moveObjects();

    checkCollisions();


    animation =
        requestAnimationFrame(gameLoop);
}


/* =========================
   DORA LANE
========================= */

function setLane() {

    dora.style.left =
        lanes[lane];

    /*
       Shinchan follows Dora's lane
    */

    shinchan.style.left =
        lanes[lane];
}


/* =========================
   SHINCHAN CHASE
========================= */

function updateShinchan() {

    /*
       Shinchan starts lower
       and slowly moves upward
       toward Dora.
    */

    const maxBottom = 4;

    const movement =
        (150 - chaseDistance) * 0.095;

    shinchan.style.bottom =
        (maxBottom + movement) + "%";


    /*
       When Shinchan reaches Dora,
       game over.
    */

    if (chaseDistance <= 36) {

        endGame();
    }
}


/* =========================
   MOVE LEFT
========================= */

function moveLeft() {

    if (!running) return;

    if (lane > 0) {

        lane--;

        setLane();
    }
}


/* =========================
   MOVE RIGHT
========================= */

function moveRight() {

    if (!running) return;

    if (lane < 2) {

        lane++;

        setLane();
    }
}


/* =========================
   JUMP
========================= */

function jump() {

    if (!running) return;

    if (jumping) return;

    jumping = true;

    dora.classList.add("jumping");

    setTimeout(() => {

        dora.classList.remove("jumping");

        jumping = false;

    }, 550);
}


/* =========================
   SLIDE
========================= */

function slide() {

    if (!running) return;

    if (sliding) return;

    sliding = true;

    dora.style.transform =
        "translateX(-50%) scaleY(.55)";

    setTimeout(() => {

        dora.style.transform =
            "translateX(-50%)";

        sliding = false;

    }, 500);
}


/* =========================
   SPAWN OBJECTS
========================= */

function spawnObjects(time) {

    if (
        time - obstacleTimer >
        900
    ) {

        createObstacle();

        obstacleTimer = time;
    }


    if (
        time - coinTimer >
        500
    ) {

        createCoin();

        coinTimer = time;
    }
}


/* =========================
   OBSTACLE
========================= */

function createObstacle() {

    const obstacle =
        document.createElement("div");

    obstacle.className =
        "obstacle";

    const obstacleLane =
        Math.floor(
            Math.random() * 3
        );

    obstacle.style.left =
        lanes[obstacleLane];

    obstacle.style.top =
        "-80px";

    objects.appendChild(obstacle);

    objectsList.push({

        element: obstacle,

        type: "obstacle",

        lane: obstacleLane,

        y: -80
    });
}


/* =========================
   COIN
========================= */

function createCoin() {

    const coin =
        document.createElement("div");

    coin.className =
        "coin";

    const coinLane =
        Math.floor(
            Math.random() * 3
        );

    coin.style.left =
        lanes[coinLane];

    coin.style.top =
        "-40px";

    objects.appendChild(coin);

    objectsList.push({

        element: coin,

        type: "coin",

        lane: coinLane,

        y: -40
    });
}


/* =========================
   MOVE OBJECTS
========================= */

function moveObjects() {

    objectsList.forEach(
        (obj, index) => {

            obj.y +=
                speed;

            obj.element.style.top =
                obj.y + "px";


            if (
                obj.y >
                window.innerHeight
            ) {

                obj.element.remove();

                objectsList.splice(
                    index,
                    1
                );
            }
        }
    );
}


/* =========================
   COLLISIONS
========================= */

function checkCollisions() {

    const doraRect =
        dora.getBoundingClientRect();


    objectsList.forEach(
        (obj, index) => {

            const objectRect =
                obj.element
                    .getBoundingClientRect();


            if (
                obj.lane === lane &&
                collision(
                    doraRect,
                    objectRect
                )
            ) {


                /*
                   COIN
                */

                if (
                    obj.type === "coin"
                ) {

                    score += 10;

                    scoreText.textContent =
                        score;

                    obj.element.remove();

                    objectsList.splice(
                        index,
                        1
                    );
                }


                /*
                   OBSTACLE
                */

                if (
                    obj.type ===
                    "obstacle"
                ) {

                    /*
                       Jumping allows
                       Dora to avoid it.
                    */

                    if (!jumping &&
                        !sliding) {

                        /*
                           Shinchan gets
                           MUCH closer.
                        */

                        chaseDistance -= 35;

                        if (
                            chaseDistance <
                            35
                        ) {

                            chaseDistance =
                                35;
                        }

                        obj.element.remove();

                        objectsList.splice(
                            index,
                            1
                        );
                    }
                }
            }
        }
    );
}


/* =========================
   COLLISION FUNCTION
========================= */

function collision(a, b) {

    return !(
        a.right < b.left ||
        a.left > b.right ||
        a.bottom < b.top ||
        a.top > b.bottom
    );
}


/* =========================
   GAME OVER
========================= */

function endGame() {

    if (!running) return;

    running = false;

    cancelAnimationFrame(
        animation
    );

    dora.classList.remove(
        "running"
    );

    shinchan.classList.remove(
        "running"
    );

    finalScore.textContent =
        score;

    gameOver.classList.remove(
        "hidden"
    );
}


/* =========================
   KEYBOARD CONTROLS
========================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "ArrowLeft"
        ) {

            moveLeft();
        }


        if (
            event.key ===
            "ArrowRight"
        ) {

            moveRight();
        }


        if (
            event.key ===
            "ArrowUp" ||
            event.key === " "
        ) {

            event.preventDefault();

            jump();
        }


        if (
            event.key ===
            "ArrowDown"
        ) {

            slide();
        }
    }
);


/* =========================
   MOBILE BUTTONS
========================= */

document
    .querySelectorAll(
        ".controls button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const action =
                    button.dataset.action;


                if (
                    action === "left"
                ) {

                    moveLeft();
                }


                if (
                    action === "right"
                ) {

                    moveRight();
                }


                if (
                    action === "jump"
                ) {

                    jump();
                }


                if (
                    action === "slide"
                ) {

                    slide();
                }

            }
        );
    });


/* =========================
   SWIPE CONTROLS
========================= */

let startX = 0;
let startY = 0;


document.addEventListener(
    "touchstart",
    event => {

        const touch =
            event.changedTouches[0];

        startX =
            touch.screenX;

        startY =
            touch.screenY;
    }
);


document.addEventListener(
    "touchend",
    event => {

        const touch =
            event.changedTouches[0];

        const dx =
            touch.screenX -
            startX;

        const dy =
            touch.screenY -
            startY;


        if (
            Math.abs(dx) >
            Math.abs(dy)
        ) {

            if (dx > 40) {
                moveRight();
            }

            if (dx < -40) {
                moveLeft();
            }

        } else {

            if (dy < -40) {
                jump();
            }

            if (dy > 40) {
                slide();
            }
        }
    }
);
```
