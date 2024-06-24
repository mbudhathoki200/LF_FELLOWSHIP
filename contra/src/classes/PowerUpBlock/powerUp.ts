import healthPowerUp from "../../assets/images/healthPowerSprite.png";
import { PLAYER } from "../../utils/constant";
import Map from "../Map/Map";

export const powerUpArray: powerUP[] = [];
export class powerUP {
  positionX: number;
  positionY: number;
  Image: HTMLImageElement;
  height: number;
  width: number;

  constructor(positionX: number, positionY: number) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.Image = new Image();
    this.Image.src = healthPowerUp;
    this.height = 25;
    this.width = 50;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.Image,
      this.positionX - Map.offsetX,
      this.positionY + PLAYER.HEIGHT / 2,
      this.width,
      this.height
    );
  }
}
