import CanvasOption from "./canvasOption.js";
import Particle from "./Particle.js";
import { randomNumBetween } from "./utils.js";

let canvasWidth, canvasHeight;

class Canvas extends CanvasOption {
  constructor() {
    super(); // 부모 클래스의 생성자를 호출
    // ->>>> super로 선언하면, 부모클래스에서 만든 변수나 메서드들을 자식 클래스 Canvas 클래스에서 this 로 사용가능.

    this.particles = [];
  }
  init() {
    this.canvasWidth = innerWidth;
    this.canvasHeight = innerHeight;

    // this.canvas.style.width = this.canvasWidth + "px";
    // this.canvas.style.height = this.canvasHeight + "px";

    this.canvas.width = this.canvasWidth * this.dpr;
    this.canvas.height = this.canvasHeight * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);

    this.canvas.style.width = this.canvasWidth + "px";
    this.canvas.style.height = this.canvasHeight + "px";

    this.createParticles();
  }

  createParticles() {
    const PARTICLE_NUM = 400;
    const x = randomNumBetween(0, this.canvasWidth);
    const y = randomNumBetween(0, this.canvasHeight);

    for (let i = 0; i < PARTICLE_NUM; i++) {
      const r = randomNumBetween(2, 100) * 0.2;
      const angle = (Math.PI / 180) * randomNumBetween(0, 360);

      // 네모 형식으로가 아닌 원형으로 퍼지도록 세팅
      const vx = r * Math.cos(angle);
      const vy = r * Math.sin(angle);
      const opacity = randomNumBetween(0.6, 0.9);

      console.log(x, y, vx, vy);
      // 네모로 퍼지는 이슈가 있음
      // const vx = randomNumBetween(-5, 5);
      // const vy = randomNumBetween(-5, 5);
      this.particles.push(new Particle(x, y, vx, vy, opacity));
    }
  }

  render() {
    let now, delta;
    let then = Date.now();

    const frame = () => {
      requestAnimationFrame(frame);
      now = Date.now();
      delta = now - then;

      if (delta < this.interval) return;

      // this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

      this.ctx.fillStyle = this.bgColor + "40"; // #00000010
      this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // // opacity가 0 이하인 파티클을 제거합니다
      // this.particles = this.particles.filter(particle => particle.opacity > 0);

      this.particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // console.log(particle.opacity, this.particles, index);

        if (particle.opacity < 0) this.particles.splice(index, 1);
      });

      then = now - (delta & this.interval);
    };

    requestAnimationFrame(frame);
  }
}

const canvas = new Canvas();

// 간단하게,
// window.onload = () => {
//   canvas.init();
//   canvas.render();
// };

window.addEventListener("load", () => {
  canvas.init();
  canvas.render();
});

window.addEventListener("resize", () => {
  canvas.init();
  canvas.render();
});
