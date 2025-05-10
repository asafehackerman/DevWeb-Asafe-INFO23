let hor = 0;
let min = 0;
let seg = 0;
let id;
let left = 0;

var paused = true;

const playerDiv = document.querySelector("#player-div");
const missileContainer = document.querySelector(".missile-container");
const missileDiv1 = document.querySelector("#missile1");
const missileDiv2 = document.querySelector("#missile2");
const timer = document.querySelector("#timer-text");

let missile1Active = false;
let missile2Active = false;
let missile1Fired = false;
let missile2Fired = false;
let canReturnMissiles = false;

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
    // Resume missile animations if they were active
    missileDiv1.style.animationPlayState = missile1Fired ? 'running' : 'running';
    missileDiv2.style.animationPlayState = missile2Fired ? 'running' : 'running';
  } else {
    missileDiv1.style.animationPlayState = 'running';
    missileDiv2.style.animationPlayState = 'running';
  }
}

function pause() {
  if (paused === false) {
    document.querySelector("#pause-screen").style.display = "flex";
    clearInterval(id);
    paused = true;
    // Pause missile animations
    missileDiv1.style.animationPlayState = 'paused';
    missileDiv2.style.animationPlayState = 'paused';
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

// Colisão para a nave
document.addEventListener("keydown", function(e) {
  if (paused === true) return;

  const step = 60;
  const screenWidth = window.innerWidth;
  const playerWidth = playerDiv.offsetWidth;

  left = parseInt(window.getComputedStyle(playerDiv).left) || 0;

  if (e.key === "ArrowLeft" && left > 0) {
    left = Math.max(0, left - step);
  }

  if (e.key === "ArrowRight" && left + playerWidth < screenWidth) {
    left = Math.min(screenWidth - playerWidth, left + step);
  }

  playerDiv.style.left = `${left}px`;
});

function shootMissile(missileDiv, isActive, fired) {
  if (paused === true || isActive || fired) return true;

  missileDiv.style.animation = "missile-shoot 1s linear forwards";
  return true;
}

function resetMissile(missileDiv) {
  missileDiv.style.animation = '';
  missileDiv.style.top = '';
}

document.addEventListener("keydown", function(e) {
  if (paused === true) return;

  if (e.key === " ") {
    if (!missile1Fired) {
      missile1Fired = shootMissile(missileDiv1, missile1Active, missile1Fired);
      missile1Active = true;
    } else if (!missile2Fired) {
      missile2Fired = shootMissile(missileDiv2, missile2Active, missile2Fired);
      missile2Active = true;
    } else if (missile1Fired && missile2Fired && canReturnMissiles) {
      resetMissile(missileDiv1);
      resetMissile(missileDiv2);
      missile1Fired = false;
      missile2Fired = false;
      canReturnMissiles = false;
    }
  }
});

missileDiv1.addEventListener('animationend', function() {
  missile1Active = false;
  if (missile2Fired && !canReturnMissiles) {
    canReturnMissiles = true;
  }
});

missileDiv2.addEventListener('animationend', function() {
  missile2Active = false;
  if (missile1Fired && !canReturnMissiles) {
    canReturnMissiles = true;
  }
});