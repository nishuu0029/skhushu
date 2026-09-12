/* =====================================================
   ❤️ KHUSHUU × SAGAR
   RELATIONSHIP START DATE

   YAHAN APNI ACTUAL DATE/TIME DAALNA

   Format:
   YYYY-MM-DDTHH:MM:SS

   Example:
   12 June 2023 - 9:15 PM

   "2025-04-05T21:15:00"
===================================================== */

const relationshipStart =
    new Date("2025-04-05T20:30:00");


/* =====================================================
   LIVE RELATIONSHIP COUNTER
===================================================== */

function updateCounter() {

    const now = new Date();

    let difference =
        now - relationshipStart;

    if (difference < 0) {
        difference = 0;
    }


    const totalSeconds =
        Math.floor(difference / 1000);


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
        String(hours).padStart(2, "0");


    document.getElementById("minutes")
        .textContent =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds")
        .textContent =
        String(seconds).padStart(2, "0");
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

function openLove() {

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
   LOCK PAGE UNTIL OPEN BUTTON
===================================================== */

document.body.style.overflow =
    "hidden";