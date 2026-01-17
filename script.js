/* ================= TEXT ANIMATION ================= */

const words = document.querySelectorAll(".word");

if (words.length > 0) {
    words.forEach(word => {
        const letters = word.textContent.split("");
        word.textContent = "";
        letters.forEach(letter => {
            const span = document.createElement("span");
            span.textContent = letter;
            span.className = "letter";
            word.appendChild(span);
        });
    });

    let currentWordIndex = 0;
    const maxWordIndex = words.length - 1;
    words[currentWordIndex].style.opacity = "1";

    const changeText = () => {
        const currentWord = words[currentWordIndex];
        const nextWord =
            currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

        Array.from(currentWord.children).forEach((letter, i) => {
            setTimeout(() => {
                letter.className = "letter out";
            }, i * 80);
        });

        nextWord.style.opacity = "1";
        Array.from(nextWord.children).forEach((letter, i) => {
            letter.className = "letter behind";
            setTimeout(() => {
                letter.className = "letter in";
            }, 340 + i * 80);
        });

        currentWordIndex =
            currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
    };

    changeText();
    setInterval(changeText, 3000);
}

/* ================= CIRCULAR SKILLS ================= */

const circles = document.querySelectorAll(".circle");

circles.forEach(circle => {
    const dots = parseInt(circle.getAttribute("data-dots"));
    const marked = parseInt(circle.getAttribute("data-percent"));
    const percent = Math.floor((dots * marked) / 100);
    const rotate = 360 / dots;
    let points = "";

    for (let i = 0; i < dots; i++) {
        points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
    }

    circle.innerHTML = points;

    const pointsMarked = circle.querySelectorAll(".points");
    for (let i = 0; i < percent; i++) {
        pointsMarked[i].classList.add("marked");
    }
});

/* ================= PORTFOLIO FILTER ================= */

if (document.querySelector(".portfolio-gallery")) {
    mixitup(".portfolio-gallery", {
        selectors: {
            target: ".port-box"
        },
        animation: {
            duration: 400
        }
    });
}

/* ================= ACTIVE MENU ON SCROLL ================= */

const menuLinks = document.querySelectorAll("header ul li a");
const sections = document.querySelectorAll("section");

function activeMenu() {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    menuLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", activeMenu);

/* ================= STICKY HEADER ================= */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("sticky", window.scrollY > 50);
});

/* ================= MOBILE MENU ================= */

const menuIcon = document.querySelector("#menu-icon");
const navlist = document.querySelector(".navlist");

menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("bx-x");
    navlist.classList.toggle("open");
});

window.addEventListener("scroll", () => {
    menuIcon.classList.remove("bx-x");
    navlist.classList.remove("open");
});

/* ================= SCROLL ANIMATIONS ================= */

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show-items");
            } else {
                entry.target.classList.remove("show-items");
            }
        });
    },
    { threshold: 0.2 }
);

document.querySelectorAll(".scroll-scale, .scroll-bottom, .scroll-top")
    .forEach(el => observer.observe(el));
