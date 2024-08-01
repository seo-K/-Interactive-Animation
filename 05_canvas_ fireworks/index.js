import CanvasOption from "./canvasOption.js";

let canvasWidth, canvasHeight;

class Canvas extends CanvasOption {
  constructor() {
    super(); // super로 선언하면, 부모클래스에서 만든 변수나 메서드들을 자식 클래스 Canvas 클래스에서 this 로 사용가능.
  }
  init() {
    this.canvas.style.width = this.canvasWidth + "px";
    this.canvas.style.height = this.canvasHeight + "px";
    this.canvasWidth = innerWidth;
    this.canvasHeight = innerHeight;
    this.canvas.width = this.canvasWidth * this.dpr;
    this.canvas.height = this.canvasHeight * this.dpr;

    this.ctx.scale(this.dpr, this.dpr);
  }

  render() {
    let now, delta;
    let then = Date.now();

    const frame = () => {
      requestAnimationFrame(frame);
      now = Date.now();
      delta = now - then;

      if (delta < this.interval) return;

      this.ctx.fillStyle = "blue";
      this.ctx.fillRect(100, 100, 300, 300);

      then = now - (delta & this.interval);
    };

    requestAnimationFrame(frame);
  }
}

const canvas = new Canvas();

// 간단하게,
window.onload = () => {
  canvas.init();
  canvas.render();
};

window.addEventListener("resize", () => {
  canvas.init();
  canvas.render();
});
