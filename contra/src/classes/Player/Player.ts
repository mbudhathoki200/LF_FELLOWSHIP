import { PLAYER } from "../../utils/constant";

import playerR from "../../assets/images/LanceStandingR.png";
import playerL from "../../assets/images/LanceStandingL.png";
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
  moveLeft() {
    this.playerImage.src = playerL;
    this.velX = this.SPEED;
    this.posX -= this.velX;
  }
  moveRigth() {
    this.playerImage.src = playerR;
    this.velX = this.SPEED;
    this.posX += this.velX;
  }
}
