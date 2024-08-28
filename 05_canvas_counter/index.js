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

    // 이 경우 particles 의 index 가 삭제되면서 밀리면서, 사이드이펙트가 생김
    // particles.forEach((particle, index) => {
    //   particle.update();
    //   particle.draw(ctx);
    //   console.log(particles);

    //   // 파티클의 opacity가 0 이하면 삭제되도록 하기. (아니면 opacity가 0인채로 계속 남아있게되기때문)
    //   // if (particle < 0) particles.splice(index, 1);
    // });

    // 해당하는 index 만 삭제하면 이슈가 사라짐
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw(ctx);

      if (particles[i] < 0) particles.splice(i, 1);
    }

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
  // createRing();
  const texts = document.querySelectorAll("#countdown span");

  const countDownOption = {
    opacity: 1,
    scale: 1,
    duration: 0.4,
    ease: "Power4.easeOut",
  };
  gsap.fromTo(
    texts[0],
    { opacity: 0, scale: 5 },
    {
      ...countDownOption,
    }
  );
  gsap.fromTo(
    texts[1],
    { opacity: 0, scale: 5 },
    {
      ...countDownOption,
      delay: 1,
      onStart: () => (texts[0].style.opacity = 0),
    }
  );
  gsap.fromTo(
    texts[2],
    { opacity: 0, scale: 5 },
    {
      ...countDownOption,
      delay: 2,
      onStart: () => (texts[1].style.opacity = 0),
    }
  );

  const ringImg = document.querySelector("#ring");
  gsap.fromTo(
    ringImg,
    { opaciry: 1 },
    {
      opacity: 0,
      duration: 1,
      delay: 3,
      onStart: () => {
        createRing();
        texts[2].style.opacity = 0;
      },
    }
  );
});
