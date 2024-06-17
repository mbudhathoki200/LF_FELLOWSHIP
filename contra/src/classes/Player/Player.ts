import { PLAYER, CANVAS } from "../../utils/constant";
import collisionDetection from "../../utils/constant";
import playerR from "../../assets/images/LanceStandingR.png";
import playerL from "../../assets/images/LanceStandingL.png";
import Map from "../Map/Map";
import Platform from "../Map/Playform";

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
  isGrounded = false;

  constructor(posX: number, posY: number) {
    this.posX = posX;
    this.posY = posY;
    this.width = PLAYER.WIDTH;
    this.height = PLAYER.HEIGHT;
    this.playerImage = new Image();
    this.playerImage.src = playerR;
    this.velX = 0;
    this.velY = 0;
    this.SPEED = PLAYER.SPEED;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.playerImage,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }

  moveLeft(gameMap: Map): void {
    if (this.posX > 0) {
      this.playerImage.src = playerL;
      this.velX = this.SPEED;
      this.posX -= this.velX;
      if (this.posX > CANVAS.WIDTH / 2) {
        gameMap.moveLeft(this.SPEED);
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
    }
    if (this.posX > 3475) {
      this.posX = 3475;
      this.velX = 0;
    }
  }

  update(platformArr: Platform[]) {
    this.velY = 5;
    platformArr.forEach((platform) => {
      if (collisionDetection(this, platform) && this.velY > 0) {
        this.posY = platform.y - this.height;
        this.isGrounded = true;
      }
    });

    if (this.isGrounded) {
      this.velY = 0;
    }

    this.posX += this.velX * 0.01;
    this.posY += this.velY * 0.1;
    // console.log("hi");
    //
  }
}
