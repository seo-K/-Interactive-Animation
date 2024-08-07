// 캔버스 관련 기본 설정을 초기화 및 재사용 가능한 공통 속성들을 정의.

export default class CanvasOption {
  constructor() {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.dpr = window.devicePixelRatio;
    this.fps = 60;
    this.interval = 1000 / this.fps;
    this.canvasWidth = innerWidth;
    this.canvasHeight = innerHeight;
    this.bgColor = "#000000";
  }
}
