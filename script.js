// ==================================================
// FLOATING HEARTS
// ==================================================

const heartsContainer = document.querySelector(".hearts");

const heartSymbols = ["♡", "♥", "❤️", "💋"];

if (heartsContainer) {

    for (let i = 0; i < 45; i++) {

        const heart = document.createElement("div");

        heart.className = "heart";

        heart.textContent =
            heartSymbols[
                Math.floor(Math.random() * heartSymbols.length)
            ];

        heart.style.left =
            Math.random() * 100 + "vw";

        heart.style.fontSize =
            (10 + Math.random() * 18) + "px";

        heart.style.animationDuration =
            (8 + Math.random() * 12) + "s";

        heart.style.animationDelay =
            -(Math.random() * 15) + "s";

        heartsContainer.appendChild(heart);
    }
}


// ==================================================
// LOGIN DETAILS
// ==================================================

const correctUsername = "12102025";
const correctPassword = "38104015";


// ==================================================
// LOGIN
// ==================================================

function login() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value;

    const message =
        document.getElementById("message");


    if (
        username === correctUsername &&
        password === correctPassword
    ) {

        message.textContent =
            "IDENTITY VERIFIED ✓";

        message.style.color =
            "#ffffff";


        setTimeout(() => {

            document
                .getElementById("loginScreen")
                .classList.add("hidden");

            document
                .getElementById("archiveScreen")
                .classList.remove("hidden");

            playArchiveSequence();

        }, 1200);


    } else {

        message.textContent =
            "ACCESS DENIED ✕";

        message.style.color =
            "#ff3333";
    }
}


// ==================================================
// ARCHIVE INTRO SEQUENCE
// ==================================================

function playArchiveSequence() {

    const sequence = [
        "status1",
        "status2",
        "status3",
        "status4",
        "status5",
        "status6"
    ];

    let delay = 500;


    sequence.forEach((id, index) => {

        setTimeout(() => {

            const element =
                document.getElementById(id);

            if (element) {
                element.classList.remove("hidden");
            }

        }, delay);


        delay +=
            index === 0
                ? 1000
                : 1300;

    });


    setTimeout(() => {

        const finalIntro =
            document.getElementById("finalIntro");

        if (finalIntro) {
            finalIntro.classList.remove("hidden");
        }

    }, delay + 500);
}


// ==================================================
// OPEN ARCHIVE
// ==================================================

function startArchive() {

    document
        .getElementById("archiveScreen")
        .classList.add("hidden");

    document
        .getElementById("foldersScreen")
        .classList.remove("hidden");


    updateFile02Lock();
    updateFile03Lock();


    window.scrollTo(0, 0);
}


// ==================================================
// OPEN FILE 01
// ==================================================

function openFile01() {

    document
        .getElementById("foldersScreen")
        .classList.add("hidden");

    document
        .getElementById("file01Question")
        .classList.remove("hidden");

    window.scrollTo(0, 0);
}


// ==================================================
// FILE 01 — VERIFY ANSWER
// ==================================================

function verifyClue() {

    const answer =
        document
            .getElementById("clueAnswer")
            .value
            .trim()
            .toLowerCase();

    const message =
        document.getElementById("clueMessage");


    const correctAnswers = [
        "12.10.25",
        "12/10/25",
        "12/10/2025",
        "12.10.2025",
        "12-10-25",
        "12-10-2025"
    ];


    if (correctAnswers.includes(answer)) {

        message.textContent = "";


        document
            .getElementById("file01Question")
            .classList.add("hidden");


        document
            .getElementById("giftIntroScreen")
            .classList.remove("hidden");


        window.scrollTo(0, 0);

    } else {

        message.textContent =
            "✕ INCORRECT — TRY AGAIN.";

        message.style.color =
            "#ff3333";
    }
}


// ==================================================
// FILE 01 — START GIFT
// ==================================================

function startGift() {

    document
        .getElementById("giftIntroScreen")
        .classList.add("hidden");

    document
        .getElementById("giftScreen")
        .classList.remove("hidden");

    window.scrollTo(0, 0);
}


// ==================================================
// GIFT VARIABLES
// ==================================================

let giftTaps = 0;


// ==================================================
// GIFT — TAP
// ==================================================

function tapGift() {

    if (giftTaps >= 7) {
        return;
    }


    giftTaps++;


    const box =
        document.getElementById("giftBox");

    const counter =
        document.getElementById("tapCounter");

    const hint =
        document.getElementById("giftHint");


    counter.textContent =
        "TAP " + giftTaps + " / 7";


    box.classList.remove("shake");

    void box.offsetWidth;

    box.classList.add("shake");


    if (giftTaps < 7) {

        hint.textContent =
            "Keep going... 👀";

    } else {

        hint.textContent =
            "THE GIFT IS OPENING... ❤️";


        setTimeout(() => {

            openGift();

        }, 500);
    }
}


// ==================================================
// OPEN GIFT
// ==================================================

function openGift() {

    const box =
        document.getElementById("giftBox");


    box.classList.remove("shake");

    box.classList.add("open");


    createFireworks();
    createConfetti();


    setTimeout(() => {

        const panda =
            document.getElementById("pandaImage");

        const pandaReveal =
            document.getElementById("pandaReveal");


        pandaReveal.classList.add("show");


        panda.src =
            "panda_happy.png";


        setTimeout(() => {

            panda.src =
                "panda_wink.png";

        }, 2200);


        setTimeout(() => {

            panda.src =
                "panda_hug_heart.png";

        }, 4400);


    }, 800);
}


// ==================================================
// FIREWORKS
// ==================================================

function createFireworks() {

    const celebration =
        document.getElementById("celebration");


    if (!celebration) {
        return;
    }


    for (let i = 0; i < 8; i++) {

        const centerX =
            10 + Math.random() * 80;

        const centerY =
            15 + Math.random() * 45;


        for (let j = 0; j < 18; j++) {

            const particle =
                document.createElement("div");


            particle.className =
                "firework";


            const angle =
                (Math.PI * 2 * j) / 18;


            const distance =
                50 + Math.random() * 100;


            particle.style.left =
                centerX + "vw";


            particle.style.top =
                centerY + "vh";


            particle.style.setProperty(
                "--x",
                Math.cos(angle) *
                    distance +
                    "px"
            );


            particle.style.setProperty(
                "--y",
                Math.sin(angle) *
                    distance +
                    "px"
            );


            celebration.appendChild(
                particle
            );


            setTimeout(() => {

                particle.remove();

            }, 1100);
        }
    }
}


// ==================================================
// CONFETTI
// ==================================================

function createConfetti() {

    const celebration =
        document.getElementById("celebration");


    if (!celebration) {
        return;
    }


    for (let i = 0; i < 90; i++) {

        const piece =
            document.createElement("div");


        piece.className =
            "confetti";


        piece.style.left =
            Math.random() * 100 + "vw";


        piece.style.animationDelay =
            Math.random() * 1.5 + "s";


        piece.style.transform =
            "rotate(" +
            Math.random() * 360 +
            "deg)";


        const colors = [
            "#ff4fa3",
            "#ff72b6",
            "#ffffff",
            "#ffd1e6",
            "#ff9ac5"
        ];


        piece.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        celebration.appendChild(
            piece
        );


        setTimeout(() => {

            piece.remove();

        }, 4500);
    }
}


// ==================================================
// FILE 01 — COMPLETE
// ==================================================

function completeFile01() {

    localStorage.setItem(
        "file02Unlocked",
        "true"
    );


    document
        .getElementById("giftScreen")
        .classList.add("hidden");


    document
        .getElementById("foldersScreen")
        .classList.remove("hidden");


    updateFile02Lock();
    updateFile03Lock();


    window.scrollTo(0, 0);
}


// ==================================================
// UPDATE FILE 02 LOCK
// ==================================================

function updateFile02Lock() {

    const file02 =
        document.getElementById("file02Folder");

    const status =
        document.getElementById("file02Status");

    const footer =
        document.getElementById("folderFooter");


    if (!file02) {
        return;
    }


    const unlocked =
        localStorage.getItem("file02Unlocked") === "true";


    if (unlocked) {

        file02.classList.remove("locked");

        file02.classList.add("unlocked");


        if (status) {

            status.textContent =
                "ACCESS AVAILABLE";
        }


        if (footer) {

            footer.textContent =
                "5 FILES. 2 AVAILABLE.";
        }


    } else {

        file02.classList.remove("unlocked");

        file02.classList.add("locked");


        if (status) {

            status.textContent =
                "🔒 ACCESS LOCKED";
        }


        if (footer) {

            footer.textContent =
                "5 FILES. 1 AVAILABLE.";
        }
    }
}


// ==================================================
// OPEN FILE 02
// ==================================================

function openFile02() {

    const unlocked =
        localStorage.getItem("file02Unlocked") === "true";


    if (!unlocked) {
        return;
    }


    document
        .getElementById("foldersScreen")
        .classList.add("hidden");


    document
        .getElementById("file02Screen")
        .classList.remove("hidden");


    window.scrollTo(0, 0);
}


// ==================================================
// COMPLETE FILE 02
// ==================================================

function completeFile02() {

    // ----------------------------------------------
    // UNLOCK FILE 03
    // ----------------------------------------------

    localStorage.setItem(
        "file03Unlocked",
        "true"
    );


    // ----------------------------------------------
    // HIDE FILE 02
    // ----------------------------------------------

    document
        .getElementById("file02Screen")
        .classList.add("hidden");


    // ----------------------------------------------
    // SHOW ARCHIVE
    // ----------------------------------------------

    document
        .getElementById("foldersScreen")
        .classList.remove("hidden");


    // ----------------------------------------------
    // FORCE FILE 03 TO UPDATE
    // ----------------------------------------------

    updateFile03Lock();


    window.scrollTo(0, 0);
}


// ==================================================
// UPDATE FILE 03 LOCK
// ==================================================

function updateFile03Lock() {

    const file03 =
        document.getElementById("file03Folder");

    const status =
        document.getElementById("file03Status");


    if (!file03) {
        return;
    }


    const unlocked =
        localStorage.getItem("file03Unlocked") === "true";


    if (unlocked) {

        // REMOVE LOCKED STYLE
        file03.classList.remove("locked");

        // ADD SAME STYLE AS FILE 02
        file03.classList.add("unlocked");


        if (status) {

            status.textContent =
                "ACCESS AVAILABLE";
        }


    } else {

        // REMOVE UNLOCKED STYLE
        file03.classList.remove("unlocked");

        // ADD LOCKED STYLE
        file03.classList.add("locked");


        if (status) {

            status.textContent =
                "🔒 ACCESS LOCKED";
        }
    }
}


// ==================================================
// OPEN FILE 03
// ==================================================

function openFile03() {

    // ----------------------------------------------
    // CHECK WHETHER FILE 03 IS UNLOCKED
    // ----------------------------------------------

    const unlocked =
        localStorage.getItem("file03Unlocked") === "true";


    // DO NOT OPEN IF LOCKED
    if (!unlocked) {
        return;
    }


    // ----------------------------------------------
    // OPEN FILE 03
    // ----------------------------------------------

    document
        .getElementById("foldersScreen")
        .classList.add("hidden");


    document
        .getElementById("file03Screen")
        .classList.remove("hidden");


    window.scrollTo(0, 0);
}


// ==================================================
// COMPLETE FILE 03
// ==================================================

function completeFile03() {

    const audio =
        document.querySelector(
            "#file03Screen audio"
        );


    if (audio) {

        audio.pause();

        audio.currentTime = 0;
    }


    document
        .getElementById("file03Screen")
        .classList.add("hidden");


    document
        .getElementById("foldersScreen")
        .classList.remove("hidden");


    // Keep File 03 unlocked
    updateFile03Lock();


    window.scrollTo(0, 0);
}


// ==================================================
// PAGE LOAD — RESTORE UNLOCKED FILES
// ==================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateFile02Lock();

        updateFile03Lock();

    }
);
