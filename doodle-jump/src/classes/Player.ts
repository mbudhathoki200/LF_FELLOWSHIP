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
  SCORE: number;

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
    this.SCORE = 0;
  }

  draw(ctx: CanvasRenderingContext2D, platformArr: Platform[]) {
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    this.update(platformArr);
    this.displayScore(ctx);
  }

  //display score
  displayScore(ctx: CanvasRenderingContext2D): void {
    ctx.font = "bold 25px Patrick Hand";
    ctx.fillStyle = "grey";
    ctx.fillText("Score: " + this.SCORE, 10, 30);
  }

  checkGameOver(): boolean {
    return this.y + this.h >= DIMENSIONS.CANVAS_HEIGHT;
  }

  update(platformArr: Platform[]) {
    // Apply gravity
    this.velocityY += this.GRAVITY;
    this.y += this.velocityY;

    // Check for collisions with platforms
    platformArr.forEach((platform) => {
      if (collisionDetection(this, platform) && this.velocityY > 0) {
        this.y = platform.y - this.h;
        this.velocityY = -10; // Bounce up
        this.SCORE++;
        console.log(this.SCORE);
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
    }
  }

  jump() {
    if (!this.isJumping) {
      console.log("Jumping");
      this.isJumping = true;
      this.velocityY = -12; // Initial jump velocity
    }
  }

  moveLeft() {
    this.velocityX = -7;
  }

  moveRight() {
    this.velocityX = 7;
  }

  stopHorizontalMovement() {
    this.velocityX = 0;
  }
}
