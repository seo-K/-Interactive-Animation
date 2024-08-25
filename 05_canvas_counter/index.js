import Particle from "./js/Particle.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
const dpr = window.devicePixelRatio;
const interval = 1000 / 60;

const particles = [];

function init() {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";

  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;

  ctx.scale(dpr, dpr);
}

function createRing() {
  const PARTICLE_NUM = 500;
  for (let i = 0; i < PARTICLE_NUM; i++) {
    particles.push(new Particle());
  }
}

function render() {
  let now, delta;
  let then = Date.now();

  const frame = () => {
    requestAnimationFrame(frame);

    now = Date.now();
    delta = now - then;
    if (delta < interval) return;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    particles.forEach((particle, index) => {
      particle.update();
      particle.draw(ctx);

      // 파티클의 opacity가 0 이하면 삭제되도록 하기. (아니면 opacity가 0인채로 계속 남아있게되기때문)
      if (particle < 0) particles.splice(index, 1);
    });

    then = now - (delta % interval);
  };

  requestAnimationFrame(frame);
}

window.addEventListener("load", () => {
  init();
  render();
});

window.addEventListener("resize", init());

window.addEventListener("click", () => {
  createRing();
});
