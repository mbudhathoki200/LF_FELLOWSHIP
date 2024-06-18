import { platformValues } from "./classes/Platform/platformValues";
import "./reset.css";
import "./style.css";

// classes
import Map from "./classes/Map/Map.ts";
// import Platform from "./classes/Map/Playform.ts";

//import Constants
import { CANVAS, PLAYER } from "./utils/constant.ts";
import Player from "./classes/Player/Player.ts";
import { Platfrom } from "./classes/Platform/Platform.ts";

// import drawGrid from "./classes/Map/drawrid.ts";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

//images

canvas.height = CANVAS.HEIGHT;
canvas.width = CANVAS.WIDTH;

//global variables
let gameMap = new Map(0, 0);
let player = new Player(40, 140);
let runReq = 0;
// let platformArr: Platform[] = [];

// platformArr.push(
//   new Platform(310, 273, 195, 35, "./assets/images/NES - Contra - Level 1.png")
// );
function draw() {
  ctx.clearRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);
  //map Render
  gameMap.draw(ctx);

  // ctx.drawImage(img, 0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);
  // player.update(platformArr);
  player.draw(ctx);

  player.update();

  platformValues.forEach((platform) => {
    const newPlatform = new Platfrom(
      platform.x,
      platform.y,
      platform.w,
      platform.h,
      platform.id
    );
    newPlatform.draw(ctx);
  });

  // platformArr.forEach((plat) => {
  //   plat.draw(ctx);
  // });
  // drawGrid(ctx);

  requestAnimationFrame(draw);
}

draw();

window.addEventListener("keydown", (e) => {
  console.log(e.key);
  switch (e.key) {
    case "ArrowLeft":
      player.moveLeft(gameMap);
      player.animateRunning();

      break;
    case "ArrowRight":
      console.log("first");
      player.moveRight(gameMap);
      player.animateRunning();

      break;
    case "x":
      player.jump();
      break;
  }
});
window.addEventListener("keyup", (e) => {
  cancelAnimationFrame(runReq);
  console.log({ runReq });
  switch (e.key) {
    case "ArrowRight":
      player.frameX = 0;
  }
});
