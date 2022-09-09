import { updateGround, setupGround } from "./ground.js";
import { updateDino, setupDino } from "./dino.js";

const SPEED_SCALE_INCREASE = .00001

const scoreElem = document.querySelector("[data-score]");
const startScreen = document.querySelector("[data-start-screen]");

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
    updateSpeedScale(delta);
    updateScore(delta);

    console.log(`${speedScale}, ${delta}`);

    prevTime = time;
    window.requestAnimationFrame(update);
}

function updateScore(delta) {
    score += delta * 0.01
    scoreElem.textContent = Math.floor(score);
}

function updateSpeedScale(delta){
    speedScale += delta * SPEED_SCALE_INCREASE;
}

// initialize values and activate the animation
function handleStart(){
    prevTime = null;
    speedScale = 1;
    score = 0;

    startScreen.classList.add("hide");

    setupGround();
    setupDino();

    window.requestAnimationFrame(update); // active the update loop
}