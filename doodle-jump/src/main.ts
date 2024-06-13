import "./reset.css";
import "./style.css";

import { DIMENSIONS, PLAYER } from "./constants.ts";
import { PLATFORM } from "./constants.ts";

// classes
import Platform from "./classes/Platform.ts";
import Player from "./classes/Player.ts";

// Images
import bgImage from "./assets/background.png";
import playerImgLeft from "./assets/blueL.png";
import platformImg from "./assets/platform.png";

//functions
import displayGameOver from "./utils/displaygameOver.ts";
import { generatePlatforms, movePlatform } from "./classes/Platform.ts";

const audioOver = document.querySelector("#dead_audio") as HTMLAudioElement;

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

let background = new Image();
background.src = bgImage;

canvas.width = DIMENSIONS.CANVAS_WIDTH;
canvas.height = DIMENSIONS.CANVAS_HEIGHT;

// player
let player = new Player(
  DIMENSIONS.CANVAS_WIDTH / 2 - PLAYER.WIDTH / 2,
  DIMENSIONS.CANVAS_HEIGHT / 2 - PLAYER.HEIGHT / 2,
  PLAYER.WIDTH,
  PLAYER.HEIGHT,
  0,
  0, // initial velocityY
  playerImgLeft,
  0.2
);

// Initial platforms
let platforms: Platform[] = [];
const platformCount = 7;

platforms.push(
  new Platform(
    DIMENSIONS.CANVAS_WIDTH / 2 - PLATFORM.WIDTH / 2,
    player.y + player.h + 10, // Position just below the player
    PLATFORM.WIDTH,
    PLATFORM.HEIGHT,
    platformImg
  )
);

generatePlatforms(platforms, platformCount, platformImg);

function draw() {
  ctx.clearRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);
  ctx.drawImage(background, 0, 0);

  // Move platforms downwards
  movePlatform(platforms, ctx);

  // Prevent player from moving above the fixed y-axis position
  if (player.y < DIMENSIONS.CANVAS_HEIGHT / 2 - PLAYER.HEIGHT / 2) {
    player.y = DIMENSIONS.CANVAS_HEIGHT / 2 - PLAYER.HEIGHT / 2;
    player.velocityY = 0;
  }

  // Draw player
  player.draw(ctx, platforms);

  const animationFrame = requestAnimationFrame(draw);

  if (player.checkGameOver()) {
    cancelAnimationFrame(animationFrame);
    displayGameOver(player.SCORE);
    audioOver.play();
  }
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
