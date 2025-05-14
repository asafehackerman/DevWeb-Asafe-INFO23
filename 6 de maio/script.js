let hor = 0;
let min = 0;
let seg = 0;
let id;
let left = 0;
let inputEnabled = true;

var faseAtual = 1;
var aliensMortos = 0;
var paused = true;
var life = 3;

const playerDiv = document.querySelector("#player-div");
const naveDiv = document.querySelector("#nave-id");
const missileContainer = document.querySelector(".missile-container");
const missileDiv1 = document.querySelector("#missile1");
const missileDiv2 = document.querySelector("#missile2");
const aliensDiv = document.querySelector("#aliens-div-id");
const alien1 = document.querySelector("#alien1");
const alien2 = document.querySelector("#alien2");
const alien3 = document.querySelector("#alien3");
const background = document.querySelector("#background");
const timer = document.querySelector("#timer-text");
const numberAlien = document.querySelector("#alien-text");

let missile1Active = false;
let missile2Active = false;
let missile1Fired = false;
let missile2Fired = false;
let canReturnMissiles = false;

// Timer do jogo
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

// Função para pausar o jogo
function pause() {
  if (paused === false) {
    showScreen("pause-screen");
    clearInterval(id);
    paused = true;
    missileDiv1.style.animationPlayState = 'paused';
    missileDiv2.style.animationPlayState = 'paused';
    aliensDiv.style.animationPlayState = 'paused';
  }
}

// Função para resumir o jogo após o pause
function resume() {
  if (paused === true) {
    hideScreen("pause-screen");
    id = setInterval(add, 1000);
    paused = false;
    missileDiv1.style.animationPlayState = 'running';
    missileDiv2.style.animationPlayState = 'running';
    aliensDiv.style.animationPlayState = 'running';    
  }
}

// Função para mostrar uma tela
function showScreen(screen) {
  document.querySelector("#" + screen).style.display = "flex";
  inputEnabled = false;
}

// Função para esconder uma tela
function hideScreen(screen) {
  document.querySelector("#" + screen).style.display = "none";
  inputEnabled = true;
}

// Função para mudar a imagem do background
function changeBackground(backgroundImage) {
  background.style.backgroundImage = "url('images/" + backgroundImage + "')";
}

function missileDirection(direction, naveWidth) {
  if (!missile1Fired) {
    missileDiv1.style.left = `${direction + naveWidth / 2 - missileDiv1.offsetWidth / 2}px`;
  }
  if (!missile2Fired) {
    missileDiv2.style.left = `${direction + naveWidth / 2 - missileDiv2.offsetWidth / 2}px`;
  }
}

// Colisão da nave com o míssil
function alienMissileCollision(missil, alien) {
  const m = missil.getBoundingClientRect();
  const a = alien.getBoundingClientRect();

  return (
    m.left < a.right &&
    m.right > a.left &&
    m.top < a.bottom &&
    m.bottom > a.top
  );
}

// Função para monitorar as colissões
function monitorColission(missil) {
  const intervalo = setInterval(() => {
    if (alien1.style.visibility !== "hidden" && alienMissileCollision(missil, alien1)) {
      alien1.style.visibility = "hidden";
      missil.style.visibility = "hidden";
      aliensMortos++;
      numberAlien.textContent = `ALIEN: ${aliensMortos}`;
      clearInterval(intervalo);
    } else if (alien2.style.visibility !== "hidden" && alienMissileCollision(missil, alien2)) {
      alien2.style.visibility = "hidden";
      missil.style.visibility = "hidden";
      aliensMortos++;
      numberAlien.textContent = `ALIEN: ${aliensMortos}`;
      clearInterval(intervalo);
    } else if (alien3.style.visibility !== "hidden" && alienMissileCollision(missil, alien3)) {
      alien3.style.visibility = "hidden";
      missil.style.visibility = "hidden";
      aliensMortos++;
      numberAlien.textContent = `ALIEN: ${aliensMortos}`;
      clearInterval(intervalo);
    }
  }, 30);
}

// Função para atirar míssil
function shootMissile(missileDiv, isActive, fired) {
  if (paused === true || isActive || fired) return true;

  missileDiv.style.animation = "missile-shoot 1s linear forwards";
  monitorColission(missileDiv);
  return true;
}

// Função para resetar os mísseis
function resetMissile(missileDiv) {
  if(missileDiv.style.visibility == "hidden") {
    missileDiv.style.visibility = "visible";
  }
  missileDiv.style.animation = '';
  missileDiv.style.top = '';
}

// Função para redefinir as animações
function reviveAnimations() {
  alien1.style.visibility = "visible";
  alien2.style.visibility = "visible";
  alien3.style.visibility = "visible";

  resetMissile(missileDiv1);
  resetMissile(missileDiv2);

  missile1Fired = false;
  missile2Fired = false;
  missile1Active = false;
  missile2Active = false;
  canReturnMissiles = false;

  aliensDiv.style.animation = 'none';
  aliensDiv.offsetHeight;
  aliensDiv.style.animation = ''; 
}


// EventListener para movimentação da nave
document.addEventListener("keydown", function(e) {
  if(inputEnabled == true) {
    if (paused === true) return;

    const step = 60;
    const screenWidth = window.innerWidth;
    const naveWidth = naveDiv.offsetWidth;

    left = parseFloat(window.getComputedStyle(naveDiv).left) || 0;

    if (e.key === "ArrowLeft" && left > 0) {
      left = Math.max(0, left - step);
    }

    if (e.key === "ArrowRight" && left + naveWidth < screenWidth) {
      left = Math.min(screenWidth - naveWidth, left + step);
    }

    naveDiv.style.left = `${left}px`;

    missileDirection(left, naveWidth);
  }
});

// EventListener para pausar o jogo
document.addEventListener("keydown", function(e) {
    if (e.key === "p" || e.key === "P") {
      if (paused) {
        resume();
      } else {
        pause();
      }
    }
});

// EventListener para disparar os mísseis 
document.addEventListener("keydown", function(e) {
  if(inputEnabled == true) {
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
  }
});

// EventListener para o fim da animação do míssel 1
missileDiv1.addEventListener('animationend', function() {
  missile1Active = false;
  if (missile2Fired && !canReturnMissiles) {
    canReturnMissiles = true;
  }
});

// EventListener para o fim da animação do míssel 2
missileDiv2.addEventListener('animationend', function() {
  missile2Active = false;
  if (missile1Fired && !canReturnMissiles) {
    canReturnMissiles = true;
  }
});

// EventListener para o fim da animação dos aliens (O que definirá o fim do jogo)
aliensDiv.addEventListener('animationend', function() {
  if(alien1.style.visibility !== "hidden" || alien2.style.visibility !== "hidden" || alien3.style.visibility !== "hidden") {
      life--;
    if (life > 0) {
      showScreen("lose-screen");
    } else if (life == 0) {
      showScreen("over-screen");
    }
    clearInterval(id);

    if (life !== 3) {
      document.querySelector("#nave-text").textContent = `LIFE: ${life}`;
    }

    setTimeout(function() {
      if (life > 0) {
        hideScreen("lose-screen");
        paused = true;
        resume();
        alien1.style.visibility = 'hidden';
        alien2.style.visibility = 'hidden';
        alien3.style.visibility = 'hidden';     
        reviveAnimations(); 
      }
    }, 3000);
  } else if(faseAtual == 4 && alien1.style.visibility == 'hidden' && alien2.style.visibility == 'hidden' && alien3.style.visibility == 'hidden') {
    showScreen("win-screen");
    clearInterval(id);
  } else if(alien1.style.visibility == 'hidden' && alien2.style.visibility == 'hidden' && alien3.style.visibility == 'hidden') {
    faseAtual++;
    changeBackground("background" + faseAtual + ".jpg");
    reviveAnimations();
    aliensDiv.style.animation = 'alien-move 8s linear forwards';
  } else if(alien1.style.visibility == 'hidden' && alien2.style.visibility == 'hidden' && alien3.style.visibility == 'hidden') {
    faseAtual++;
    changeBackground("background" + faseAtual + ".jpg");
    reviveAnimations();
    aliensDiv.style.animation = 'alien-move 5s linear forwards';
  } else if(alien1.style.visibility == 'hidden' && alien2.style.visibility == 'hidden' && alien3.style.visibility == 'hidden') {
    faseAtual++;
    changeBackground("background" + faseAtual + ".jpg");
    reviveAnimations();
    aliensDiv.style.animation = 'alien-move 3s linear forwards';
  }
});