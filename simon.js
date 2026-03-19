let gameseq = [];
let userseq = [];
let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

// FLASH FUNCTIONS
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 150);
}

// LEVEL UP
function levelup() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`#${randColor}`);

    gameseq.push(randColor);
    gameFlash(randBtn);
}

// CHECK ANSWER
function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        gameOver();
    }
}

// GAME OVER
function gameOver() {
    document.body.style.backgroundColor = "red";
    setTimeout(() => document.body.style.backgroundColor = "white", 200);

    h2.innerHTML = `Game Over! Your score was <b>${level - 1}</b>`;
    h3.innerText = "Click any box to start";

    reset();
}

// RESET
function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}

// BUTTON CLICKS (GAME STARTS HERE)
let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
    btn.addEventListener("click", function () {

        // START GAME ON FIRST CLICK
        if (!started) {
            started = true;
            h3.innerText = "";
            levelup();
            return;
        }

        let userColor = btn.id;
        userseq.push(userColor);

        userFlash(btn);
        checkAns(userseq.length - 1);
    });
}

