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
// FILE UNLOCK VARIABLES
// ==================================================
// IMPORTANT:
// These are NOT saved anywhere.
// Refreshing the page resets them.
// ==================================================

let file02Unlocked = false;
let file03Unlocked = false;
let file04Unlocked = false;
let file05Unlocked = false;


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
    updateFile04Lock();
    updateFile05Lock();

    updateFolderFooter();

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

    // Unlock ONLY File 02
    file02Unlocked = true;

    document
        .getElementById("giftScreen")
        .classList.add("hidden");

    document
        .getElementById("foldersScreen")
        .classList.remove("hidden");

    updateFile02Lock();
    updateFile03Lock();
    updateFile04Lock();
    updateFile05Lock();

    updateFolderFooter();

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

    if (!file02) {
        return;
    }


    if (file02Unlocked) {

        file02.classList.remove("locked");

        file02.classList.add("unlocked");

        if (status) {

            status.textContent =
                "ACCESS AVAILABLE";
        }

    } else {

        file02.classList.remove("unlocked");

        file02.classList.add("locked");

        if (status) {

            status.textContent =
                "🔒 ACCESS LOCKED";
        }
    }
}


// ==================================================
// OPEN FILE 02
// ==================================================

function openFile02() {

    if (!file02Unlocked) {
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

    if (!file02Unlocked) {
        return;
    }


    // Unlock ONLY File 03
    file03Unlocked = true;

    document
        .getElementById("file02Screen")
        .classList.add("hidden");

    document
        .getElementById("foldersScreen")
        .classList.remove("hidden");

    updateFile02Lock();
    updateFile03Lock();
    updateFile04Lock();
    updateFile05Lock();

    updateFolderFooter();

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


    if (file03Unlocked) {

        file03.classList.remove("locked");

        file03.classList.add("unlocked");

        if (status) {

            status.textContent =
                "ACCESS AVAILABLE";
        }

    } else {

        file03.classList.remove("unlocked");

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

    if (!file03Unlocked) {
        return;
    }

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

    if (!file03Unlocked) {
        return;
    }


    const audio =
        document.querySelector(
            "#file03Screen audio"
        );

    if (audio) {

        audio.pause();

        audio.currentTime = 0;
    }


    // Unlock ONLY File 04
    file04Unlocked = true;

    document
        .getElementById("file03Screen")
        .classList.add("hidden");

    document
        .getElementById("foldersScreen")
        .classList.remove("hidden");

    updateFile02Lock();
    updateFile03Lock();
    updateFile04Lock();
    updateFile05Lock();

    updateFolderFooter();

    window.scrollTo(0, 0);
}


// ==================================================
// UPDATE FILE 04 LOCK
// ==================================================

function updateFile04Lock() {

    const file04 =
        document.getElementById("file04Folder");

    const status =
        document.getElementById("file04Status");

    if (!file04) {
        return;
    }


    if (file04Unlocked) {

        file04.classList.remove("locked");

        file04.classList.add("unlocked");

        if (status) {

            status.textContent =
                "ACCESS AVAILABLE";
        }

    } else {

        file04.classList.remove("unlocked");

        file04.classList.add("locked");

        if (status) {

            status.textContent =
                "🔒 ACCESS LOCKED";
        }
    }
}


// ==================================================
// OPEN FILE 04
// ==================================================

function openFile04() {

    if (!file04Unlocked) {
        return;
    }

    document
        .getElementById("foldersScreen")
        .classList.add("hidden");

    document
        .getElementById("file04Screen")
        .classList.remove("hidden");

    window.scrollTo(0, 0);
}


// ==================================================
// COMPLETE FILE 04
// ==================================================

function completeFile04() {

    if (!file04Unlocked) {
        return;
    }


    // Unlock ONLY File 05
    file05Unlocked = true;

    document
        .getElementById("file04Screen")
        .classList.add("hidden");

    document
        .getElementById("foldersScreen")
        .classList.remove("hidden");

    updateFile02Lock();
    updateFile03Lock();
    updateFile04Lock();
    updateFile05Lock();

    updateFolderFooter();

    window.scrollTo(0, 0);
}


// ==================================================
// UPDATE FILE 05 LOCK
// ==================================================

function updateFile05Lock() {

    const file05 =
        document.getElementById("file05Folder");

    const status =
        document.getElementById("file05Status");

    if (!file05) {
        return;
    }


    if (file05Unlocked) {

        file05.classList.remove("locked");

        file05.classList.add("unlocked");

        if (status) {

            status.textContent =
                "ACCESS AVAILABLE";
        }

    } else {

        file05.classList.remove("unlocked");

        file05.classList.add("locked");

        if (status) {

            status.textContent =
                "🔒 ACCESS LOCKED";
        }
    }
}


// ==================================================
// OPEN FILE 05
// ==================================================

function openFile05() {

    if (!file05Unlocked) {
        return;
    }

    document
        .getElementById("foldersScreen")
        .classList.add("hidden");

    document
        .getElementById("file05Screen")
        .classList.remove("hidden");

    window.scrollTo(0, 0);
}


// ==================================================
// COMPLETE FILE 05
// ==================================================

function completeFile05() {

    const video =
        document.querySelector(
            "#file05Screen video"
        );

    if (video) {

        video.pause();

        video.currentTime = 0;
    }


    document
        .getElementById("file05Screen")
        .classList.add("hidden");

    document
        .getElementById("foldersScreen")
        .classList.remove("hidden");

    window.scrollTo(0, 0);
}


// ==================================================
// FOLDER FOOTER
// ==================================================

function updateFolderFooter() {

    const footer =
        document.querySelector(".folders-footer");

    if (!footer) {
        return;
    }


    let available = 1;


    if (file02Unlocked) {
        available = 2;
    }

    if (file03Unlocked) {
        available = 3;
    }

    if (file04Unlocked) {
        available = 4;
    }

    if (file05Unlocked) {
        available = 5;
    }


    footer.textContent =
        "5 FILES. " +
        available +
        " AVAILABLE.";
}


// ==================================================
// INITIAL PAGE LOAD
// ==================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /*
         * IMPORTANT:
         * No localStorage.
         *
         * Every refresh starts with:
         *
         * FILE 01 → UNLOCKED
         * FILE 02 → LOCKED
         * FILE 03 → LOCKED
         * FILE 04 → LOCKED
         * FILE 05 → LOCKED
         */

        updateFile02Lock();
        updateFile03Lock();
        updateFile04Lock();
        updateFile05Lock();

        updateFolderFooter();
    }
);
