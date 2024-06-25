import { powerUpBoxs } from "./constants/powerUpBlocksPositions";
import "./reset.css";
import "./style.css";

// classes
import Map from "./classes/Map/Map.ts";
import Player from "./classes/Player/Player.ts";

import { Enemy, enemies } from "./classes/Enemy/Enemy.ts";
import { GuardEnemy, guardEnemies } from "./classes/Enemy/GuardEnemy.ts";
import { MainTank, mainTanks } from "./classes/Enemy/MainTank.ts";
import { Tank, tanks } from "./classes/Enemy/Tank.ts";
import { explosionArray } from "./classes/Explosion/Explosion.ts";
import { Platfrom } from "./classes/Platform/Platform.ts";
import { platformValues } from "./classes/Platform/platformValues";
import {
  PowerUpBox,
  powerUpBlocks,
} from "./classes/PowerUpBlock/PowerUpBox.ts";
import { powerUpArray } from "./classes/PowerUpBlock/powerUp.ts";

// Constants and Utilities
import { CANVAS } from "./constants/constant.ts";
import {
  guardEnemy,
  mainTank,
  runningEnemy,
  tank,
} from "./constants/enemyPositions.ts";
import {
  displayPlayerLife,
  displayPlayerScore,
} from "./utils/displayParameters.ts";
import { playerGunSound } from "./utils/gameAudio.ts";
import { input } from "./utils/input.ts";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

canvas.height = CANVAS.HEIGHT;
canvas.width = CANVAS.WIDTH;

// Instantiate game elements
const gameMap = new Map(0, 0);

export let player = new Player(40, 100);

//Guard Enemy
guardEnemy.forEach((enemy) => {
  const newGuardEnemy = new GuardEnemy(
    enemy.positionX,
    enemy.positionY,
    enemy.isBulletFast
  );
  guardEnemies.push(newGuardEnemy);
});

//Running Enemy
runningEnemy.forEach((enemy) => {
  const newRunningEnemy = new Enemy(enemy.positionX, enemy.positionY);
  enemies.push(newRunningEnemy);
});

//Tank
tank.forEach((tank) => {
  const newTankEnemy = new Tank(tank.positionX, tank.positionY);
  tanks.push(newTankEnemy);
});

//Big Tank
mainTank.forEach((tank) => {
  const newTankEnemy = new MainTank(tank.positionX, tank.positionY);
  mainTanks.push(newTankEnemy);
});

//powerUps
powerUpBoxs.forEach((powerup) => {
  const newTankEnemy = new PowerUpBox(powerup.positionX, powerup.positionY);
  powerUpBlocks.push(newTankEnemy);
});

// Function to draw game elements
function draw() {
  ctx.clearRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);

  //map Render
  gameMap.draw(ctx);

  //score Display
  displayPlayerScore(ctx);

  //Display Life
  displayPlayerLife(ctx);

  //update player with platform Collision Detection
  player.draw(ctx);
  player.update(ctx, enemies, guardEnemies, tanks, mainTanks, powerUpBlocks);

  //Render Enemy
  enemies.forEach((enemy) => {
    enemy.draw(ctx);
    enemy.update();
  });

  //Draw platforms
  platformValues.forEach((platform) => {
    new Platfrom(platform.x, platform.y, platform.w, platform.h, platform.id);
  });

  //Render Guard Enemy
  guardEnemies.forEach((enemy) => {
    enemy.draw(ctx);
    enemy.update(player);
  });

  //Render PowerUps
  powerUpArray.forEach((powerup) => {
    powerup.draw(ctx);
  });

  //Render Tanks
  tanks.forEach((tank) => {
    tank.draw(ctx);
    tank.update(player);
  });

  // Render Main Tans
  mainTanks.forEach((tank) => {
    tank.draw(ctx);
    tank.update(player);
  });
  //render PowerUps
  powerUpBlocks.forEach((block) => {
    block.draw(ctx);
    block.update(player);
  });

  //render Explosions
  explosionArray.forEach((explosion) => {
    explosion.draw(ctx);
    explosion.update();
    if (explosion.removeExplosion) {
      explosionArray.splice(explosionArray.indexOf(explosion), 1);
    }
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
      playerGunSound();
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
