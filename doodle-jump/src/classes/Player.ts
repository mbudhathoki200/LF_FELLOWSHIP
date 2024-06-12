import { DIMENSIONS } from "../constants";
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

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);

    this.update();
    this.jump();
  }

  update() {
    // Apply gravity
    this.y += this.velocityY;
    if (this.isJumping) {
      this.velocityY += this.GRAVITY;

      // Prevent the player from falling below the ground
      if (this.y + this.h >= DIMENSIONS.CANVAS_HEIGHT) {
        this.y = DIMENSIONS.CANVAS_HEIGHT - this.h;
        this.velocityY = 0;
        this.isJumping = false;
        this.jump(); // Automatically jump again
      }
    }

    this.x += this.velocityX;

    //boundary conditions
    if (this.x < -this.w) this.x = DIMENSIONS.CANVAS_WIDTH;

    if (this.x > DIMENSIONS.CANVAS_WIDTH) this.x = this.w;
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.velocityY = -10; // initial jump velocity
    }
  }
  moveLeft() {
    this.velocityX = -5;
  }
  moveRight() {
    this.velocityX = 5; // speed for moving right
  }
  stopHorizontalMovement() {
    this.velocityX = 0; // stop horizontal movement
  }
}
