// ============================================
// LOVE WEBSITE JAVASCRIPT
// ============================================


// ============================================
// OPENING ANIMATION
// ============================================

window.addEventListener("load", function () {

    const opening = document.getElementById("opening");

    setTimeout(function () {

        opening.classList.add("hide");

    }, 3200);

});


// ============================================
// RELATIONSHIP COUNTER
// Started: 05 April 2025
// ============================================

const relationshipStart =
    new Date("2025-04-05T00:00:00");


function updateCounter() {

    const now = new Date();

    if (now < relationshipStart) {
        return;
    }


    // YEARS

    let years =
        now.getFullYear()
        -
        relationshipStart.getFullYear();


    let anniversary =
        new Date(relationshipStart);

    anniversary.setFullYear(
        relationshipStart.getFullYear() + years
    );


    if (anniversary > now) {

        years--;

        anniversary.setFullYear(
            relationshipStart.getFullYear() + years
        );

    }


    // MONTHS

    let months =
        (now.getFullYear() -
            anniversary.getFullYear()) * 12
        +
        (now.getMonth() -
            anniversary.getMonth());


    let monthStart =
        new Date(anniversary);

    monthStart.setMonth(
        anniversary.getMonth() + months
    );


    if (monthStart > now) {

        months--;

        monthStart.setMonth(
            anniversary.getMonth() + months
        );

    }


    // REMAINING TIME

    let difference =
        now.getTime()
        -
        monthStart.getTime();


    const day =
        1000 * 60 * 60 * 24;

    const hour =
        1000 * 60 * 60;

    const minute =
        1000 * 60;


    const days =
        Math.floor(difference / day);

    difference %= day;


    const hours =
        Math.floor(difference / hour);

    difference %= hour;


    const minutes =
        Math.floor(difference / minute);

    difference %= minute;


    const seconds =
        Math.floor(difference / 1000);


    // DISPLAY

    document.getElementById("years")
        .textContent = years;

    document.getElementById("months")
        .textContent = months;

    document.getElementById("days")
        .textContent = days;

    document.getElementById("hours")
        .textContent = hours;

    document.getElementById("minutes")
        .textContent = minutes;

    document.getElementById("seconds")
        .textContent = seconds;

}


// Start counter

updateCounter();


// Update every second

setInterval(
    updateCounter,
    1000
);


// ============================================
// FLOATING HEARTS
// ============================================

const heartsContainer =
    document.getElementById("hearts");


const heartSymbols = [
    "♡",
    "♥",
    "❤",
    "✦"
];


for (let i = 0; i < 25; i++) {

    const heart =
        document.createElement("div");


    heart.className =
        "heart";


    heart.textContent =
        heartSymbols[
            Math.floor(
                Math.random() *
                heartSymbols.length
            )
        ];


    heart.style.left =
        Math.random() * 100 + "%";


    heart.style.fontSize =
        (10 + Math.random() * 18) + "px";


    heart.style.animationDuration =
        (8 + Math.random() * 12) + "s";


    heart.style.animationDelay =
        Math.random() * 10 + "s";


    heartsContainer.appendChild(
        heart
    );

}


// ============================================
// SMOOTH NAVIGATION
// ============================================

document.querySelectorAll("nav a")
    .forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const target =
                    document.querySelector(
                        this.getAttribute("href")
                    );

                if (target) {

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });