import healthPowerUp from "../../assets/images/healthPowerSprite.png";
import Map from "../Map/Map";

export const powerUpArray: powerUP[] = [];

export class powerUP {
  x: number;
  y: number;
  Image: HTMLImageElement;
  height: number;
  width: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.Image = new Image();
    this.Image.src = healthPowerUp;
    this.height = 25;
    this.width = 50;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.Image,
      this.x - Map.offsetX,
      this.y,
      this.width,
      this.height
    );
  }
}
