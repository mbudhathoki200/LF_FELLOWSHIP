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
  DIMENSIONS.CANVAS_HEIGHT / 2 - PLAYER.HEIGHT / 2,
  PLAYER.WIDTH,
  PLAYER.HEIGHT,
  0,
  0, // initial velocityY
  playerImgLeft,
  0.2
);

// Initial platforms
let platformArr: Platform[] = [];

function generateInitialPlatforms() {
  for (let i = 0; i < 10; i++) {
    const x = Math.random() * ((DIMENSIONS.CANVAS_WIDTH * 3) / 4);
    const y = DIMENSIONS.CANVAS_HEIGHT - 75 * i - 250;
    platformArr.push(
      new Platform(x, y, PLATFORM.WIDTH, PLATFORM.HEIGHT, platformImg)
    );
  }
}

generateInitialPlatforms();

function generatePlatform() {
  let x = Math.floor(Math.random() * ((DIMENSIONS.CANVAS_WIDTH * 3) / 4));
  platformArr.push(
    new Platform(
      x,
      -PLATFORM.HEIGHT,
      PLATFORM.WIDTH,
      PLATFORM.HEIGHT,
      platformImg
    )
  );
}

function draw() {
  ctx.clearRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);
  ctx.drawImage(background, 0, 0);

  // Move platforms downwards
  platformArr.forEach((platform) => {
    platform.y += 2;
    // if (player.velocityY < 0 && player.y < (DIMENSIONS.CANVAS_HEIGHT * 3) / 4) {
    //   platform.y -= 10;
    // }
    platform.draw(ctx);
  });

  //clear platforms and add new positions
  while (
    platformArr.length > 0 &&
    platformArr[0].y >= DIMENSIONS.CANVAS_HEIGHT
  ) {
    platformArr.shift(); //removes first element from array
    generatePlatform();
  }

  // Prevent player from moving above the fixed y-axis position

  if (player.y < DIMENSIONS.CANVAS_HEIGHT / 2 - PLAYER.HEIGHT / 2) {
    player.y = DIMENSIONS.CANVAS_HEIGHT / 2 - PLAYER.HEIGHT / 2;
    player.velocityY = 0; // Reset vertical velocity to avoid the player from moving upwards
  }
  // Draw player
  player.draw(ctx, platformArr);

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
