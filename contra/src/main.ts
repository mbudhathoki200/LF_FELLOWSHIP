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
import { GuardEnemy } from "./classes/Enemy/GuardEnemy.ts";
import { Tank } from "./classes/Enemy/Tank.ts";
import { MainTank } from "./classes/Enemy/MainTank.ts";
import { PowerUpBox } from "./classes/PowerUpBlock/PowerUpBox.ts";
import { powerUpArray } from "./classes/PowerUpBlock/powerUp.ts";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

canvas.height = CANVAS.HEIGHT;
canvas.width = CANVAS.WIDTH;

// Instantiate game elements
const gameMap = new Map(0, 0);

export let player = new Player(40, 100);

let guardEnemies: GuardEnemy[] = [
  new GuardEnemy(614, 150),
  new GuardEnemy(900, 150),
  new GuardEnemy(614, 340),
  new GuardEnemy(1256, 340),
  new GuardEnemy(2892, 340),
  new GuardEnemy(4785, 150),
  new GuardEnemy(5330, 239),
];

const enemies: Enemy[] = [
  new Enemy(CANVAS.WIDTH, 100),
  new Enemy(CANVAS.WIDTH - 200, 100),
  new Enemy(CANVAS.WIDTH * 2, 100),
  new Enemy(CANVAS.WIDTH * 3, 100),
];

const tanks: Tank[] = [
  new Tank(2508, 285),
  new Tank(3278, 219),
  new Tank(3660, 220),
  new Tank(4558, 351),
  new Tank(6221, 349),
  new Tank(6477, 349),
];

const mainTanks: MainTank[] = [
  new MainTank(4095, 110),
  new MainTank(4557, 173),
  new MainTank(5951, 304),
  new MainTank(6270, 175),
];

const powerUpBlocks: PowerUpBox[] = [new PowerUpBox(650, 283)];

// Function to draw game elements
function draw() {
  ctx.clearRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);

  //map Render
  gameMap.draw(ctx);

  //update player with platform Collision Detection
  player.draw(ctx);
  player.update(ctx, enemies, guardEnemies, tanks, mainTanks, powerUpBlocks);

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
    // newPlatform.draw(ctx);
  });
  //guard Enemy
  guardEnemies.forEach((enemy) => {
    enemy.draw(ctx);
    enemy.update(player);
  });
  powerUpArray.forEach((powerup) => powerup.draw(ctx));
  console.log(powerUpArray);

  //Tank
  tanks.forEach((tank) => {
    tank.draw(ctx);
    tank.update(player);
  });

  mainTanks.forEach((tank) => {
    tank.draw(ctx);
    tank.update(player);
  });

  powerUpBlocks.forEach((block) => {
    block.draw(ctx);
    block.update(player);
  });

  requestAnimationFrame(draw);
}

draw();

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
