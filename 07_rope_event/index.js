const canves = document.querySelector("canvas");
const ctx = canves.getContext("2d");
const dpr = window.devicePixelRatio > 1 ? 2 : 1;

let canvasWidth = innerWidth;
let canvasHeight = innerHeight;

canvas.style.width = canvasWidth + "px";
canvas.style.height = canvasHeight + "px";
