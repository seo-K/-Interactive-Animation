const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d"); // 그리게될 도구

console.log(ctx);

ctx.fillRect(50, 50, 100, 100); // x, y, width, height
ctx.fillStyle = "red";
