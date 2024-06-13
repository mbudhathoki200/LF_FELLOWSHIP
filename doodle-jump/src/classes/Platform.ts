interface IPlatform {
  x: number;
  y: number;
  w: number;
  h: number;
  image: HTMLImageElement;
}

export default class Platform implements IPlatform {
  x: number;
  y: number;
  w: number;
  h: number;
  image: HTMLImageElement;
  constructor(x: number, y: number, w: number, h: number, imgSrc: string) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.image = new Image();
    this.image.src = imgSrc;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  }
}

import { DIMENSIONS, PLATFORM, Tplatform } from "../constants.ts";

function isColliding(platform1: Platform, platform2: Platform): boolean {
  return !(
    platform1.x + platform1.w < platform2.x ||
    platform1.x > platform2.x + platform2.w ||
    platform1.y + platform1.h < platform2.y ||
    platform1.y > platform2.y + platform2.h
  );
}

export function generatePlatforms(
  platforms: Platform[],
  platformCount: number,
  platformImg: string
): void {
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
}

export function movePlatform(
  platforms: Platform[],
  ctx: CanvasRenderingContext2D
): void {
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
}
