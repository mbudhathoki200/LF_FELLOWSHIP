import "./reset.css";
import "./style.css";

import { DIMENSIONS, PLATFORM, PLAYER } from "./constants.ts";

// import Platform from "./classes/Platform.ts";
import Player from "./classes/Player.ts";

import bgImage from "./assets/background.png";
import playerImgLeft from "./assets/blueL.png";
import playerImgRight from "./assets/blueR.png";
import platformImg from "./assets/platform.png";

import Platform from "./classes/Platform.ts";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

let background = new Image();
background.src = bgImage;

canvas.width = DIMENSIONS.CANVAS_WIDTH;
canvas.height = DIMENSIONS.CANVAS_HEIGHT;

//player
let player = new Player(
  DIMENSIONS.CANVAS_WIDTH / 2 - PLAYER.WIDTH / 2,
  DIMENSIONS.CANVAS_HEIGHT - PLAYER.HEIGHT,
  PLAYER.WIDTH,
  PLAYER.HEIGHT,
  0,
  0, // initial velocityY
  playerImgLeft,
  0.2
);

let platform1 = new Platform(
  DIMENSIONS.CANVAS_WIDTH / 2,
  DIMENSIONS.CANVAS_HEIGHT - 100,
  PLATFORM.WIDTH,
  PLATFORM.HEIGHT,
  platformImg
);
let platform2 = new Platform(
  DIMENSIONS.CANVAS_WIDTH / 2,
  DIMENSIONS.CANVAS_HEIGHT - 300,
  PLATFORM.WIDTH,
  PLATFORM.HEIGHT,
  platformImg
);

let platformArr = [platform1, platform2];

function draw() {
  ctx.clearRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);
  ctx.drawImage(background, 0, 0);

  //draw platform
  platformArr.forEach((platform) => {
    platform.draw(ctx);
  });

  //draw player
  player.draw(ctx);

  requestAnimationFrame(draw);
}

draw();

document.addEventListener("keydown", (event) => {
  if (event.key === "a") {
    player.moveLeft();
  } else if (event.key === "d") {
    player.moveRight();
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "a" || event.key === "d") {
    player.stopHorizontalMovement();
  }
});
