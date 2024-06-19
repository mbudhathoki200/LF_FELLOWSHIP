import "./reset.css";
import "./style.css";

// classes
import Map from "./classes/Map/Map.ts";
import Player from "./classes/Player/Player.ts";
import { Platfrom } from "./classes/Platform/Platform.ts";
import { platformValues } from "./classes/Platform/platformValues";

//import Constants
import { CANVAS, PLAYER } from "./utils/constant.ts";
import { input } from "./utils/input.ts";

// import drawGrid from "./classes/Map/drawrid.ts";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

//images

canvas.height = CANVAS.HEIGHT;
canvas.width = CANVAS.WIDTH;

//global variable

let gameMap: Map;
//instantiate
gameMap = new Map(0, 0);

let player = new Player(40, 100);

function draw() {
  ctx.clearRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);

  //map Render
  gameMap.draw(ctx);

  //update player with platform Collision Detection
  player.draw(ctx);
  player.update();

  //Draw platforms
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

  // drawGrid(ctx);

  requestAnimationFrame(draw);
}

draw();

// window.addEventListener("keydown", (e) => {
//   switch (e.key) {
//     case "ArrowLeft":
//       player.moveLeft(gameMap);
//       player.animateRunning();

//       break;
//     case "ArrowRight":
//       player.moveRight(gameMap);
//       player.animateRunning();

//       break;
//     case "x":
//       player.jump();
//       break;
//   }
// });
// window.addEventListener("keyup", (e) => {
//   cancelAnimationFrame(runReq);
// });

window.onkeydown = (event) => {
  switch (event.key) {
    case "ArrowLeft":
      input.left = true;
      player.moveLeft(gameMap);
      player.animateRunning();
      break;
    case "ArrowRight":
      input.right = true;
      player.moveRight(gameMap);
      player.animateRunning();
      break;
    case "x":
      input.jump = true;
      player.jump();
      break;
  }
};

window.onkeyup = (event) => {
  switch (event.key) {
    case "ArrowLeft":
      input.left = false;
      break;
    case "ArrowRight":
      input.right = false;
      break;
    case "x":
      input.jump = false;
      break;
  }
};
