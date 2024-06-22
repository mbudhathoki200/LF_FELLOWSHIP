import "./reset.css";
import "./style.css";

// classes
import Map from "./classes/Map/Map.ts";
import { Platfrom } from "./classes/Platform/Platform.ts";
import { platformValues } from "./classes/Platform/platformValues";
import Player from "./classes/Player/Player.ts";
import { Enemy } from "./classes/Enemy/Enemy.ts";

// Constants and Utilities
import { CANVAS } from "./utils/constant.ts";
import { input } from "./utils/input.ts";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

canvas.height = CANVAS.HEIGHT;
canvas.width = CANVAS.WIDTH;

// Instantiate game elements
let gameMap = new Map(0, 0);

let player = new Player(40, 100);

// let enemy = new Enemy(CANVAS.WIDTH, 100);
const enemies: Enemy[] = [
  new Enemy(CANVAS.WIDTH, 100),
  new Enemy(CANVAS.WIDTH - 200, 100),
  new Enemy(CANVAS.WIDTH * 2, 100),
  new Enemy(CANVAS.WIDTH * 3, 100),
];

// Function to draw game elements
function draw() {
  ctx.clearRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);

  //map Render
  gameMap.draw(ctx);

  //update player with platform Collision Detection
  player.draw(ctx);
  player.update(ctx, enemies);

  //Enemy
  enemies.forEach((enemy) => {
    enemy.draw(ctx);
    enemy.update();
  });

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

// Event listeners for keyboard input
window.onkeydown = (event) => {
  switch (event.key) {
    case "ArrowLeft":
      input.left = true;
      player.moveLeft(gameMap);
      break;
    case "ArrowRight":
      input.right = true;
      player.moveRight(gameMap);
      break;
    case "ArrowDown":
      input.down = true;
      break;
    case "ArrowUp":
      input.up = true;
      break;
    case "x":
      input.jump = true;
      break;
    case "z":
      input.bullet = true;
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
    case "ArrowDown":
      input.down = false;
      break;
    case "ArrowUp":
      input.up = false;
      break;
    case "x":
      input.jump = false;
      break;
    case "z":
      input.bullet = false;
      input.isShooting = false;
      break;
  }
};
