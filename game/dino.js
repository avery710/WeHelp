import { incrementCustomProperty, getCustomProperty, setCustomProperty } from "../game/updateCustomProperty.js";

const dinoElem = document.querySelector("[data-dino]");

const JUMP_SPEED = .45
const GRAVITY = .0018
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping
let dinoFrame
let currentFrameTime
let yVelocity

export function setupDino(){
    isJumping = false;
    dinoFrame = 0;
    currentFrameTime = 0;
    yVelocity = 0;
    setCustomProperty(dinoElem, "--bottom", 0);
    document.removeEventListener("keydown", onJump); // incase there is already one event listener
    document.addEventListener("keydown", onJump);
}

export function updateDino(delta, speedScale){
    handleRun(delta, speedScale);
    handleJump(delta);
}

export function getDinoRect(){
    return dinoElem.getBoundingClientRect();
}

export function setDinoLose(){
    dinoElem.src = "game-image/dino-lose.png";
}

function handleRun(delta, speedScale){
    if (isJumping){
        dinoElem.src = "./game-image/dino-stationary.png"
        return;
    }

    if (currentFrameTime >= FRAME_TIME){
        dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT; // dinoFrame will only be 0 or 1
        dinoElem.src = `./game-image/dino-run-${dinoFrame}.png`;
        currentFrameTime -= 100;
    }
    currentFrameTime += delta * speedScale;
}

function handleJump(delta){
    if (!isJumping){
        return;
    }

    incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta);

    if (getCustomProperty(dinoElem, "--bottom") <= 0){
        setCustomProperty(dinoElem, "--bottom", 0);
        isJumping = false;
    }

    // scale again with frame rate!
    yVelocity -= GRAVITY * delta
}

function onJump(e){
    if (e.code != "Space" || isJumping){
        return;
    }

    yVelocity = JUMP_SPEED;
    isJumping = true;
}