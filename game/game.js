import { updateGround, setupGround } from "../game/ground.js";
import { updateDino, setupDino, getDinoRect, setDinoLose } from "../game/dino.js";
import { updateCactus, setupCactus, getCactusRects } from "../game/cactus.js";


const SPEED_SCALE_INCREASE = .00001

const scoreElem = document.querySelector("[data-score]");
const startScreenElem = document.querySelector("[data-start-screen]");

document.addEventListener("keydown", handleStart, {once: true});

let prevTime
let speedScale
let score

// where does "time" come from??
function update(time) {
    if (prevTime == null){
        prevTime = time;
        window.requestAnimationFrame(update);
        return;
    }
    
    const delta = time - prevTime;

    updateGround(delta, speedScale);
    updateDino(delta, speedScale);
    updateCactus(delta, speedScale);
    updateSpeedScale(delta);
    updateScore(delta);

    if (checkLose()){
        return handleLose(); 
    }

    console.log(`${speedScale}, ${delta}`);

    prevTime = time;
    window.requestAnimationFrame(update);
}

function updateScore(delta) {
    score += delta * 0.01
    scoreElem.textContent = Math.floor(score);
}

function checkLose(){
    const dinoRect = getDinoRect();
    return getCactusRects().some(rect => isCollision(rect, dinoRect));
}

function isCollision(cactus, dino){
    return cactus.left + 5 < dino.right && cactus.right - 5 > dino.left
    && cactus.top - 5 < dino.bottom && cactus.bottom > dino.top;
}

function updateSpeedScale(delta){
    speedScale += delta * SPEED_SCALE_INCREASE;
}

// initialize values and activate the animation
function handleStart(){
    prevTime = null;
    speedScale = 1;
    score = 0;

    startScreenElem.classList.add("hide");

    setupGround();
    setupDino();
    setupCactus();

    window.requestAnimationFrame(update); // active the update loop
}

function handleLose(){
    // change the img of dino
    setDinoLose();
    setTimeout(() => {
        document.addEventListener("keydown", handleStart, {once: true});
        startScreenElem.classList.remove("hide");
    }, 200);
}