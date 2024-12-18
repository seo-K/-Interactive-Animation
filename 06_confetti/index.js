import Particle from "./js/particle.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
// dpr 3~4 인경우 ctx.scale 시 퍼포먼스 이슈가 있을 수 있음. 그래서 1보다 큰경우 모두 2로 통일 (2로도 충분하게 보여줄 수 있음)
const dpr = window.devicePixelRatio > 1 ? 2 : 1;
let canvasWidth = innerWidth;
let canvasHeight = innerHeight;

const interval = 100 / 60;

const particles = [];

const init = () => {
  canvasWidth = innerWidth;
  canvasHeight = innerHeight;
  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";
  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  ctx.scale(dpr, dpr);
  confetti({ x: canvasWidth / 2, y: canvasHeight / 2, count: 20 });
};

function confetti({ x, y, count }) {
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y));
  }
}

const render = () => {
  let now, delta;
  let then = Date.now();

  const frame = () => {
    // 재귀적으로 스스로 계속 실행시킴. 144hz 1초에 144번 60hz 1초에 60번 실행된다. 두 모니터에 동일하게 보여짐.
    requestAnimationFrame(frame);
    delta = now - then;
    if (delta < interval) return;
    // ctx.clearRect(0, 0, canvasWidth , canvasHeight );
    ctx.clearRect(0, 0, canvasWidth * dpr, canvasHeight * dpr);

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw(ctx);
    }

    then = now - (delta % interval);
  };

  requestAnimationFrame(frame);
};

window.addEventListener("DOMContentLoaded", () => {
  init();
  render();
});

window.addEventListener("load", () => {
  init();
  render();
});
window.addEventListener("resize", () => init);
