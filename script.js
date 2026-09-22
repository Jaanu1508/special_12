// ===============================
// FLOATING HEARTS
// ===============================

const heartsContainer = document.querySelector(".hearts");

const heartSymbols = ["♡", "♥", "❤️","💋"];

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
const correctPassword = "AKNAABNA";


// ===============================
// LOGIN FUNCTION
// ===============================

function login() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value;

    const message =
        document.getElementById("message");


    // CORRECT LOGIN

    if (
        username === correctUsername &&
        password === correctPassword
    ) {

        message.textContent = "IDENTITY VERIFIED ✓";
        message.style.color = "#ffffff";


        // Wait before opening archive

        setTimeout(() => {

            document
                .getElementById("loginScreen")
                .classList.add("hidden");

            document
                .getElementById("archiveScreen")
                .classList.remove("hidden");


            // Start archive sequence

            playArchiveSequence();

        }, 1200);


    } else {

        // WRONG LOGIN

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


    // Show final message

    setTimeout(() => {

        document
            .getElementById("finalIntro")
            .classList.remove("hidden");

    }, delay + 500);

}


// ===============================
// READY BUTTON
// ===============================

function startArchive() {

    // TEMPORARY
    // We will replace this with
    // your actual next part.

    alert("NEXT PART COMING ❤️");

}
