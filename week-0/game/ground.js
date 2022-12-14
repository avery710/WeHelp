import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "../game/updateCustomProperty.js";

const SPEED = .05
const groundElems = document.querySelectorAll("[data-ground]");

// initialize the position of ground
export function setupGround(){
    setCustomProperty(groundElems[0], "--left", 0);
    setCustomProperty(groundElems[1], "--left", 300);
}

// 
export function updateGround(delta, speedscale){
    groundElems.forEach(ground => {
        incrementCustomProperty(ground, "--left", delta * speedscale * SPEED * -1);

        if (getCustomProperty(ground, "--left") <= -300){
            incrementCustomProperty(ground, "--left", 600);
        }
    });
}