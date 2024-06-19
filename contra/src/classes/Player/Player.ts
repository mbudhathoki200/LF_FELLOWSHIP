import { PLAYER, CANVAS, PLAYER_SPRITE } from "../../utils/constant";
import { collisionDetections } from "../../utils/collisionDetection.ts";
import playerR from "../../assets/images/player_right.gif";
import playerL from "../../assets/images/player_left.gif";
import Map from "../Map/Map";
import Platform from "../Map/hawaPlatform";
import { platformValues } from "../Platform/platformValues";

interface IPlayer {
  posX: number;
  posY: number;
}

export default class Player implements IPlayer {
  posX: number;
  posY: number;
  width: number;
  height: number;
  playerImage: HTMLImageElement;
  velX: number;
  velY: number;
  SPEED: number;
  life: number;
  isGrounded: boolean;
  Ground: number;
  isJumping: boolean;
  isRunning: boolean;
  frameX: number;
  frameY: number;
  maxFrame: number;
  runReq: number;
  staggerFrame = 0;

  constructor(posX: number, posY: number) {
    this.posX = posX;
    this.posY = posY;
    this.width = PLAYER.WIDTH;
    this.height = PLAYER.HEIGHT;
    this.velX = 0;
    this.velY = 0;
    this.Ground = this.posY;
    this.SPEED = PLAYER.SPEED;
    this.life = PLAYER.LIFE;
    this.isJumping = false;
    this.isRunning = false;
    this.isGrounded = false;
    this.maxFrame = 5;
    this.frameY = 0;
    this.frameX = 0;
    this.playerImage = new Image();
    this.playerImage.src = playerR;
    this.runReq = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.playerImage,
      this.frameX * PLAYER.WIDTH,
      0,
      PLAYER.WIDTH,
      PLAYER.HEIGHT,
      this.posX,
      this.posY,
      PLAYER.WIDTH,
      // PLAYER.HEIGHT
      80
    );
    ctx.strokeStyle = "red";
    ctx.strokeRect(this.posX, this.posY, PLAYER.WIDTH, PLAYER.HEIGHT);
  }
  animateRunning = () => {
    this.frameX = Math.floor(this.staggerFrame / 5) % this.maxFrame;
    this.staggerFrame++;
    // this.frameX = Math.floor(this.frameX + 1) % (this.maxFrame + 1);
    // return requestAnimationFrame(this.animateRunning);
    // this.animateRunning();
  };

  moveLeft(gameMap: Map): void {
    if (this.posX > 0) {
      this.playerImage.src = playerL;
      this.velX = this.SPEED;
      this.posX -= this.velX;
      if (this.posX > CANVAS.WIDTH / 2) {
        gameMap.moveLeft(this.SPEED);
        Map.offsetX -= this.SPEED;
      }
    }
  }

  moveRight(gameMap: Map): void {
    this.playerImage.src = playerR;
    if (this.posX + this.width < CANVAS.WIDTH / 2) {
      this.velX = this.SPEED;
      this.posX += this.velX;
    }
    if (this.posX + this.width > CANVAS.WIDTH / 2) {
      gameMap.moveRight(this.SPEED);
      Map.offsetX += this.SPEED;
    }
    if (this.posX > 3475) {
      this.posX = 3475;
      this.velX = 0;
    }
  }

  jump(): void {
    if (!this.isJumping) {
      this.isJumping = true;
      this.velY = PLAYER.JUMP_POWER; //Jump Velocity
    }
  }

  applyGravity(): void {
    if (this.isJumping) {
      this.velY -= PLAYER.GRAVITY; //Gravity Effect
      this.posY -= this.velY;
      if (this.posY > this.Ground) {
        this.posY = this.Ground;
        this.isJumping = false;
        this.velY = 0;
      }
    }
  }
  jumping() {
    this.isJumping = true;
    this.isGrounded = false;
    this.velY = -PLAYER.JUMP_POWER;
  }

  gravity() {
    if (this.posY + PLAYER.HEIGHT + this.velY < CANVAS.HEIGHT) {
      this.posY += this.velY;
      this.velY += PLAYER.GRAVITY;
    } else {
      this.velY = 0;
    }
  }

  update(): void {
    // this.applyGravity();
    if (!this.isGrounded) {
      this.gravity();
    }
    this.checkForVerticalCollision();
  }

  checkForVerticalCollision() {
    platformValues.forEach((platform: any) => {
      if (collisionDetections(this, platform)) {
        console.log("collided");
        if (this.velY > 0) {
          this.velY = 0;
          if (this.posY + this.height >= platform.y) {
            this.posY = platform.y - 50;
            console.log("Mathi");
          }

          //     // this.isGrounded = true;
          //     // this.isJumping = false;
        }
      }
    });
  }
}
