import { CANVAS, MAP } from "../../utils/constant";

// images
import bgImage from "../../assets/images/NES - Contra - Level 1.png";

interface IMap {
  WIDTH: number;
  HEIGHT: number;
  posX: number;
  posY: number;
}
let background = new Image();
background.src = bgImage;

export default class Map implements IMap {
  WIDTH: number;
  HEIGHT: number;
  posX: number;
  posY: number;

  constructor(posX: number, posY: number) {
    this.WIDTH = MAP.WIDTH;
    this.HEIGHT = CANVAS.HEIGHT;
    this.posX = posX;
    this.posY = posY;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(background, this.posX, this.posY, this.WIDTH, this.HEIGHT);
  }

  moveLeft(speed: number): void {
    this.posX += speed;
  }

  moveRight(speed: number): void {
    this.posX -= speed;
  }
}
