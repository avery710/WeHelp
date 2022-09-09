// get the CSS property value of the element(ground), 
// and turn it into value
export function getCustomProperty(elem, prop) {
    return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0 ;
}

// reverse function of "getCustomProperty"
// set the CSS property value
export function setCustomProperty(elem, prop, value) {
    elem.style.setProperty(prop, value);
}

// combine these 2 functions together
export function incrementCustomProperty(elem, prop, inc) {
    setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc);
}