import { setCustomProperty, getCustomProperty, incrementCustomProperty } from "./updateCustomProperty.js"

const SPEED = .05
const CACTUS_INTERVAL_MIN = 500 // 0.5 second
const CACTUS_INTERVAL_MAX = 2000
const worldElem = document.querySelector("[data-world]");

let nextCactusTime

export function setupCactus(){
    nextCactusTime = CACTUS_INTERVAL_MIN;
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
        cactus.remove();
    })
}

export function updateCactus(delta, speedScale){
    // let cactus move like ground
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
        incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1);

        // if the cactus reaches left: -100%, remove!
        if (getCustomProperty(cactus, "--left") <= -100){
            cactus.remove();
        }
    });

    // create cactus
    if (nextCactusTime <= 0){
        createCactus();
        nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale;
    }

    nextCactusTime -= delta;
}

export function getCactusRects(){
    return [...document.querySelectorAll("[data-cactus]")].map(cactus => {
        return cactus.getBoundingClientRect(); // return [top, right, bottom, left] value as a nodelist
    })
}

function createCactus(){
    const cactus = document.createElement("img");
    cactus.dataset.cactus = true; // [data-cactus]
    cactus.src = "./game-image/dino-run-0.png";
    cactus.classList.add("cactus");
    setCustomProperty(cactus, "--left", 100);

    worldElem.append(cactus);
}

function randomNumberBetween(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
    // math.random will generate a number between 0 and 1
}