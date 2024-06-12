import { DIMENSIONS } from "../constants";
import Platform from "./Platform";
import collisionDetection from "../utils/collisionDetection";

interface IPlayer {
  x: number;
  y: number;
  w: number;
  h: number;
  velocityX: number;
  velocityY: number;
  image: HTMLImageElement;
  isJumping: boolean;
  GRAVITY: number;
}

export default class Player implements IPlayer {
  x: number;
  y: number;
  w: number;
  h: number;
  velocityX: number;
  velocityY: number;
  image: HTMLImageElement;
  isJumping: boolean;
  GRAVITY: number;

  constructor(
    x: number,
    y: number,
    w: number,
    h: number,
    velocityX: number,
    velocityY: number,
    imgSrc: string,
    GRAVITY: number
  ) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.image = new Image();
    this.image.src = imgSrc;
    this.isJumping = false;
    this.GRAVITY = GRAVITY;
  }

  draw(ctx: CanvasRenderingContext2D, platformArr: Platform[]) {
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    this.update(platformArr);
  }

  update(platformArr: Platform[]) {
    // Apply gravity
    this.velocityY += this.GRAVITY;
    this.y += this.velocityY;

    // Check for collisions with platforms
    platformArr.forEach((platform) => {
      if (collisionDetection(this, platform) && this.velocityY > 0) {
        console.log("Collision detected");
        this.velocityY = -10; // Bounce up
        this.isJumping = true;
      }
    });

    this.x += this.velocityX;

    // Boundary conditions
    if (this.x < -this.w) this.x = DIMENSIONS.CANVAS_WIDTH;
    if (this.x > DIMENSIONS.CANVAS_WIDTH) this.x = this.w;

    // Prevent the player from falling below the ground
    if (this.y + this.h >= DIMENSIONS.CANVAS_HEIGHT) {
      this.y = DIMENSIONS.CANVAS_HEIGHT - this.h;
      this.velocityY = 0;
      this.isJumping = false;
      console.log("Player hit the ground, jumping again");
      this.jump(); // Automatically jump again
    }
  }

  jump() {
    if (!this.isJumping) {
      console.log("Jumping");
      this.isJumping = true;
      this.velocityY = -10; // Initial jump velocity
    }
  }

  moveLeft() {
    this.velocityX = -5;
  }

  moveRight() {
    this.velocityX = 5;
  }

  stopHorizontalMovement() {
    this.velocityX = 0;
  }
}
