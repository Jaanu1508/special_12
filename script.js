// ===============================
// FLOATING HEARTS
// ===============================

const heartsContainer = document.querySelector(".hearts");

const heartSymbols = ["♡", "♥", "❤️", "💋"];

for (let i = 0; i < 45; i++) {

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.textContent =
        heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize =
        (10 + Math.random() * 18) + "px";

    heart.style.animationDuration =
        (8 + Math.random() * 12) + "s";

    heart.style.animationDelay =
        -(Math.random() * 15) + "s";

    heartsContainer.appendChild(heart);
}



// ===============================
// LOGIN DETAILS
// ===============================

const correctUsername = "12102025";
const correctPassword = "38104015";



// ===============================
// LOGIN
// ===============================

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

        message.textContent = "IDENTITY VERIFIED ✓";
        message.style.color = "#ffffff";


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

        message.textContent = "ACCESS DENIED ✕";
        message.style.color = "#ff3333";

    }
}



// ===============================
// ARCHIVE SEQUENCE
// ===============================

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

            document
                .getElementById(id)
                .classList.remove("hidden");

        }, delay);

        delay += index === 0 ? 1000 : 1300;

    });


    setTimeout(() => {

        document
            .getElementById("finalIntro")
            .classList.remove("hidden");

    }, delay + 500);

}



// ===============================
// OPEN ARCHIVE
// ===============================

function startArchive() {

    document
        .getElementById("archiveScreen")
        .classList.add("hidden");

    document
        .getElementById("foldersScreen")
        .classList.remove("hidden");

}



// ===============================
// OPEN FILE 01
// ===============================

function openFile01() {

    document
        .getElementById("foldersScreen")
        .classList.add("hidden");

    document
        .getElementById("file01Welcome")
        .classList.remove("hidden");

}



// ===============================
// FILE 01 — OKAY BUTTON
// ===============================

function showFile01Question() {

    document
        .getElementById("file01Welcome")
        .classList.add("hidden");

    document
        .getElementById("file01Question")
        .classList.remove("hidden");

}



// ===============================
// FILE 01 — VERIFY ANSWER
// ===============================

function verifyClue() {

    const answer =
        document
            .getElementById("clueAnswer")
            .value
            .trim()
            .toLowerCase();


    const message =
        document.getElementById("clueMessage");


    /*
       Accepting multiple formats
       so he can type the date naturally.
    */

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


        // Hide question

        document
            .getElementById("file01Question")
            .classList.add("hidden");


        // Show success page

        document
            .getElementById("file01SuccessScreen")
            .classList.remove("hidden");


    } else {

        message.textContent =
            "✕ INCORRECT — TRY AGAIN.";

        message.style.color =
            "#ff3333";

    }

}



// ===============================
// FILE 01 — CONTINUE
// ===============================

function completeFile01() {

    document
        .getElementById("file01SuccessScreen")
        .classList.add("hidden");


    document
        .getElementById("foldersScreen")
        .classList.remove("hidden");
// ===============================
// OPEN FILE 02
// ===============================

function openFile02() {

    document
        .getElementById("foldersScreen")
        .classList.add("hidden");

    document
        .getElementById("file02Screen")
        .classList.remove("hidden");

}


// ===============================
// COMPLETE FILE 02
// ===============================

function completeFile02() {

    document
        .getElementById("file02Screen")
        .classList.add("hidden");

    document
        .getElementById("foldersScreen")
        .classList.remove("hidden");

}
}
