/* =====================================================
   ❤️ KHUSHUU × SAGAR
   SHA-256 PASSWORD PROTECTION
===================================================== */

const PASSWORD_HASH =
    "bb038aadeb02f0f6582f36bb907732c68fd472196b1489f4e85930cf1212ce27";


/* =====================================================
   SHA-256
===================================================== */

async function sha256(text) {

    const encoder = new TextEncoder();

    const data =
        encoder.encode(text);

    const hashBuffer =
        await crypto.subtle.digest(
            "SHA-256",
            data
        );

    const hashArray =
        Array.from(
            new Uint8Array(hashBuffer)
        );

    return hashArray
        .map(
            byte =>
                byte
                    .toString(16)
                    .padStart(2, "0")
        )
        .join("");
}


/* =====================================================
   PASSWORD CHECK
===================================================== */

async function checkPassword() {

    const password =
        prompt("Enter password ❤️");

    if (password === null) {
        return false;
    }

    const hash =
        await sha256(password);

    if (hash === PASSWORD_HASH) {
        return true;
    }

    alert("Wrong password ❤️");

    return false;
}


/* =====================================================
   RELATIONSHIP START DATE
===================================================== */

const relationshipStart =
    new Date("2025-04-05T20:30:00");


/* =====================================================
   LIVE RELATIONSHIP COUNTER
===================================================== */

function updateCounter() {

    const now =
        new Date();

    let difference =
        now - relationshipStart;

    if (difference < 0) {
        difference = 0;
    }

    const totalSeconds =
        Math.floor(
            difference / 1000
        );

    const days =
        Math.floor(
            totalSeconds / 86400
        );

    const hours =
        Math.floor(
            (totalSeconds % 86400) / 3600
        );

    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );

    const seconds =
        totalSeconds % 60;


    document.getElementById("days")
        .textContent =
        days.toLocaleString();

    document.getElementById("hours")
        .textContent =
        String(hours)
            .padStart(2, "0");

    document.getElementById("minutes")
        .textContent =
        String(minutes)
            .padStart(2, "0");

    document.getElementById("seconds")
        .textContent =
        String(seconds)
            .padStart(2, "0");
}


/* Start counter */

updateCounter();

setInterval(
    updateCounter,
    1000
);


/* =====================================================
   OPENING SCREEN
===================================================== */

async function openLove() {

    const correct =
        await checkPassword();

    if (!correct) {
        return;
    }


    const intro =
        document.getElementById("intro");

    intro.classList.add("hide");

    document.body.style.overflow =
        "auto";


    setTimeout(() => {

        document
            .getElementById("home")
            .scrollIntoView({
                behavior: "smooth"
            });

    }, 700);
}


/* =====================================================
   STORY SCROLL ANIMATION
===================================================== */

const storyItems =
    document.querySelectorAll(
        ".story-item"
    );


const observer =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("show");

                    }

                }
            );

        },

        {
            threshold: 0.15
        }

    );


storyItems.forEach(
    (item) => {

        observer.observe(item);

    }
);


/* =====================================================
   LOCK PAGE UNTIL PASSWORD
===================================================== */

document.body.style.overflow =
    "hidden";