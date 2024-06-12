import "./reset.css";
import "./style.css";

import { DIMENSIONS, PLATFORM, PLAYER } from "./constants.ts";

// classes
import Platform from "./classes/Platform.ts";
import Player from "./classes/Player.ts";

// functions
import bgImage from "./assets/background.png";
import playerImgLeft from "./assets/blueL.png";
import platformImg from "./assets/platform.png";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

let background = new Image();
background.src = bgImage;

canvas.width = DIMENSIONS.CANVAS_WIDTH;
canvas.height = DIMENSIONS.CANVAS_HEIGHT;

// player
let player = new Player(
  DIMENSIONS.CANVAS_WIDTH / 2 - PLAYER.WIDTH / 2,
  DIMENSIONS.CANVAS_HEIGHT - PLAYER.HEIGHT,
  PLAYER.WIDTH,
  PLAYER.HEIGHT,
  0,
  0, // initial velocityY
  playerImgLeft,
  0.4
);

// Generate random platforms
// function generateRandomPlatform() {
//   const x = Math.random() * ((DIMENSIONS.CANVAS_WIDTH * 3) / 4);
//   const y = Math.random() * (DIMENSIONS.CANVAS_HEIGHT - PLATFORM.HEIGHT);
//   return new Platform(x, y, PLATFORM.WIDTH, PLATFORM.HEIGHT, platformImg);
// }

// Initial platforms
let platformArr: Platform[] = [];

for (let i = 0; i < 10; i++) {
  const x = Math.random() * ((DIMENSIONS.CANVAS_WIDTH * 3) / 4);
  const y = DIMENSIONS.CANVAS_HEIGHT - 75 * i - 150;
  platformArr.push(
    new Platform(x, y, PLATFORM.WIDTH, PLATFORM.HEIGHT, platformImg)
  );
}

function draw() {
  ctx.clearRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);
  ctx.drawImage(background, 0, 0);

  // draw platform
  platformArr.forEach((platform) => {
    platform.draw(ctx);
  });

  // draw player
  player.draw(ctx, platformArr); // Pass the platforms array to the draw method

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
