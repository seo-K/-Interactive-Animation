const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
// dpr 3~4 인경우 ctx.scale 시 퍼포먼스 이슈가 있을 수 있음. 그래서 1보다 큰경우 모두 2로 통일 (2로도 충분하게 보여줄 수 있음)
const dpr = window.devicePixelRatio > 1 ? 2 : 1;
let canvasWidth = innerWidth;
let canvasHeight = innerHeight;

const interval = 100 / 60;

const init = () => {
  canvasWidth = innerWidth;
  canvasHeight = innerHeight;
  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";
  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  ctx.scale(dpr, dpr);
};

const render = () => {
  let now, delta;
  let then = Date.now();

  const x = innerWidth;
  let y = innerHeight;
  // const x = innerWidth / 2;
  // let y = innerHeight / 2;
  let widthAlpah = 0;
  const width = 50;
  const height = 50;
  let deg = -0.1;

  const frame = () => {
    // 재귀적으로 스스로 계속 실행시킴. 144hz 1초에 144번 60hz 1초에 60번 실행된다. 두 모니터에 동일하게 보여짐.
    requestAnimationFrame(frame);
    delta = now - then;
    if (delta < interval) return;
    // ctx.clearRect(0, 0, canvasWidth , canvasHeight );
    ctx.clearRect(0, 0, canvasWidth * dpr, canvasHeight * dpr);

    widthAlpah += 0.1;
    deg += 0.1;
    y += 1;

    ctx.translate(x + width, y + height);
    ctx.rotate(deg);
    ctx.translate(-x - width, -y - height);

    // 생성
    ctx.fillStyle = "blue";
    //  Math.cos(n) 결과값은 1 ~ -1 사이를 왔다갔다한다.
    // ctx.fillRect(x, y, width, height);
    ctx.fillRect(
      x,
      y,
      width * Math.cos(widthAlpah),
      height * Math.sin(widthAlpah)
    );
    ctx.resetTransform();

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
