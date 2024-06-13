import "./reset.css";
import "./style.css";

import { DIMENSIONS, PLAYER } from "./constants.ts";
import { PLATFORM } from "./constants.ts";
import { Tplatform } from "./constants.ts";

// classes
import Platform from "./classes/Platform.ts";
import Player from "./classes/Player.ts";

// Images
import bgImage from "./assets/background.png";
import playerImgLeft from "./assets/blueL.png";
import platformImg from "./assets/platform.png";

//functions
import displayGameOver from "./utils/displaygameOver.ts";

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
const platformCount = 7; // Number of platforms

// Add a platform directly beneath the player initially

platforms.push(
  new Platform(
    DIMENSIONS.CANVAS_WIDTH / 2 - PLATFORM.WIDTH / 2,
    player.y + player.h + 10, // Position just below the player
    PLATFORM.WIDTH,
    PLATFORM.HEIGHT,
    platformImg
  )
);

function isColliding(platform1: Platform, platform2: Platform): boolean {
  return !(
    platform1.x + platform1.w < platform2.x ||
    platform1.x > platform2.x + platform2.w ||
    platform1.y + platform1.h < platform2.y ||
    platform1.y > platform2.y + platform2.h
  );
}
function generatePlatform(
  existingPlatforms: Platform[],
  PLATFORM: Tplatform
): Platform {
  let x: number, y: number, newPlatform: Platform | undefined;
  let isValidPosition = false;

  while (!isValidPosition) {
    x = Math.random() * (DIMENSIONS.CANVAS_WIDTH - PLATFORM.WIDTH);
    y = Math.random() * DIMENSIONS.CANVAS_HEIGHT;

    newPlatform = new Platform(
      x,
      y,
      PLATFORM.WIDTH,
      PLATFORM.HEIGHT,
      platformImg
    );

    isValidPosition = true;

    for (let i = 0; i < existingPlatforms.length; i++) {
      if (isColliding(newPlatform, existingPlatforms[i])) {
        isValidPosition = false;
        break;
      }
    }
  }

  return newPlatform!;
}
for (let i = 0; i < platformCount - 1; i++) {
  platforms.push(generatePlatform(platforms, PLATFORM));
}

function draw() {
  ctx.clearRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);
  ctx.drawImage(background, 0, 0);

  // Move platforms downwards
  platforms.forEach((platform) => {
    platform.y += 2;
    if (platform.y > DIMENSIONS.CANVAS_HEIGHT) {
      platform.y = -PLATFORM.HEIGHT;
      platform.x = Math.random() * (DIMENSIONS.CANVAS_WIDTH - PLATFORM.WIDTH);
      platform.w = PLATFORM.WIDTH; // Update platform width

      // Ensure the new position doesn't collide with other platforms
      let isValidPosition = false;
      while (!isValidPosition) {
        isValidPosition = true;
        for (let otherPlatform of platforms) {
          if (
            otherPlatform !== platform &&
            isColliding(platform, otherPlatform)
          ) {
            isValidPosition = false;
            platform.y = -PLATFORM.HEIGHT;
            platform.x =
              Math.random() * (DIMENSIONS.CANVAS_WIDTH - PLATFORM.WIDTH);
            break;
          }
        }
      }
    }
    platform.draw(ctx);
  });

  // Prevent player from moving above the fixed y-axis position

  if (player.y < DIMENSIONS.CANVAS_HEIGHT / 2 - PLAYER.HEIGHT / 2) {
    player.y = DIMENSIONS.CANVAS_HEIGHT / 2 - PLAYER.HEIGHT / 2;
    player.velocityY = 0; // Reset vertical velocity to avoid the player from moving upwards
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
