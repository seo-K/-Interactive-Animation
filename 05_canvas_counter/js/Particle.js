import { randomNumBetween } from "./utils.js";

export default class Particle {
  constructor() {
    // 원형 각 위치 잡기
    // this.x = innerWidth / 2 + this.r * Math.cos((Math.PI / 180) * this.angle);
    // this.y = innerHeight / 2 + this.r * Math.sin((Math.PI / 180) * this.angle);

    // 반지름값
    // this.rFriction = 0.95// 마찰값 [1 이상 = 바깥으로 빠져나감.]
    this.rFriction = randomNumBetween(0.95, 1.01); // 일부는 멈추고, 1이상인 일부는 바깥으로 빠져나감
    this.rAlpha = randomNumBetween(0, 5);
    this.r = innerHeight / 4;

    // 앵글값
    // this.angleFriction = 0.97; // 마찰값 [1 이상 = 도는 속도가 빨라짐.]
    this.angleFriction = randomNumBetween(0.97, 0.99);
    this.angleAlpha = randomNumBetween(1, 2);
    this.angle = randomNumBetween(0, 360);

    // 투명도값
    // this.opacity = 1;
    this.opacity = randomNumBetween(0.2, 1);
  }
  update() {
    // this.r += 1;  // 1. 바깥쪽 일직선으로 뻗어나감
    // this.angle += 1;  // 2. 원형으로 뻗어나감

    // rAlpha, angleAlpha 선언으로 각각 랜덤한 속도로 퍼지게함.
    this.rAlpha *= this.rFriction;
    this.r += this.rAlpha;

    this.angleAlpha *= this.angleFriction;
    this.angle += this.angleAlpha;

    // 파티클 위치 및 크기 잡기
    this.x = innerWidth / 2 + this.r * Math.cos((Math.PI / 180) * this.angle);
    this.y = innerHeight / 2 + this.r * Math.sin((Math.PI / 180) * this.angle);

    // 투명도값
    this.opacity -= 0.003;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255, ${this.opacity})`;
    ctx.fill();
    ctx.closePath();
  }
}
