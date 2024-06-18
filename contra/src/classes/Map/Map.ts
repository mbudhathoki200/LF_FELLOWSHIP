import { CANVAS, MAP } from "../../utils/constant";

// images
import bgImage from "../../assets/images/NES - Contra - Level 1.png";
import { Platfrom } from "../Platform/Platform";

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
  static offsetX = 0;
  static offsetY = 0;

  constructor(posX: number, posY: number) {
    this.WIDTH = MAP.WIDTH;
    this.HEIGHT = MAP.HEIGHT;
    this.posX = posX;
    this.posY = posY;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(background, this.posX, this.posY, this.WIDTH, this.HEIGHT);
  }

  moveLeft(speed: number): void {
    if (this.posX > 0) {
      this.posX += speed;
    }
  }

  moveRight(speed: number): void {
    this.posX -= speed;
  }
}
