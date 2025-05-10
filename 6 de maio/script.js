let hor = 0;
let min = 0;
let seg = 0;
let id;
let left = 0;

var paused = true;

const playerDiv = document.querySelector("#player-div");
const timer = document.querySelector("#timer-text");

function add() {
    seg++;
    if (seg === 60) {
        seg = 0;
        min++;
    }
    if (min === 60) {
        min = 0;
        hor++;
    }

    // Formata os números com 2 dígitos (ex: 01, 02, etc.)
    let textoHora = String(hor).padStart(2, "0");
    let textoMin = String(min).padStart(2, "0");
    let textoSeg = String(seg).padStart(2, "0");

    timer.textContent = `${textoHora}:${textoMin}:${textoSeg}`;
}

function resume() {
    if (paused === true) {
        document.querySelector("#pause-screen").style.display = "none";
        id = setInterval(add, 1000);
        paused = false;
    }
}

function pause() {
    if (paused === false) {
        document.querySelector("#pause-screen").style.display = "flex";
        clearInterval(id);
        paused = true;
    }
}

document.addEventListener("keydown", function(e) {
    if (e.key === "p" || e.key === "P") {
        if (paused) {
            resume();
        } else {
            pause();
        }
    }
});

document.addEventListener("keydown", function(e) {
    if (paused === true) return; // se o jogo estiver pausado, não move a nave

    const step = 60;
    const screenWidth = window.innerWidth;
    const playerWidth = playerDiv.offsetWidth;

    // posição atual da nave
    left = parseInt(window.getComputedStyle(playerDiv).left) || 0;

    if (e.key === "ArrowLeft" && left > 0) {
        left = Math.max(0, left - step); // evita ultrapassar o lado esquerdo
    }

    if (e.key === "ArrowRight" && left + playerWidth < screenWidth) {
        left = Math.min(screenWidth - playerWidth, left + step); // evita ultrapassar o lado direito
    }

    playerDiv.style.left = `${left}px`;
});

document.addEventListener("keydown", function(e) {
    if (paused === true) return;

    if (e.key === " ") {
        document.querySelector("#missile1").style.animation = "missile-shoot 1s linear forwards";
        document.querySelector("#missile2").style.animation = "missile-shoot 1s linear forwards";
    }
});
