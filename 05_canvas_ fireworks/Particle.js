import CanvasOption from "./canvasOption.js";

export default class Particle extends CanvasOption {
  constructor(x, y, vx, vy, opacity) {
    super();
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.opacity = opacity;
    this.gravity = 0.12; // 중력
    this.friction = 0.93; // 마찰
  }

  update() {
    this.vy += this.gravity;

    this.vx = this.vx * this.friction;
    this.vy = this.vy * this.friction;

    // this.y -= 1;
    this.x += this.vx;
    this.y += this.vy;
    this.opacity -= 0.01;
  }

  draw() {
    // this.ctx.beginPath();
    // this.ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
    // this.ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
    // this.ctx.fill();
    // this.ctx.closePath();

    this.ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
