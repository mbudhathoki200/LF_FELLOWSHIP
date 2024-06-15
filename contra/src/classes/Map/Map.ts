import { CANVAS, MAP } from "../../utils/constant";

// images
import bgImage from "../../assets/images/NES - Contra - Level 1.png";

interface IMap {
  WIDTH: number;
  HEIGHT: number;
  xPos: number;
  yPos: number;
}
let background = new Image();
background.src = bgImage;

export default class implements IMap {
  WIDTH: number;
  HEIGHT: number;
  xPos: number;
  yPos: number;

  constructor(xPos: number, yPos: number) {
    this.WIDTH = MAP.WIDTH;
    this.HEIGHT = CANVAS.HEIGHT;
    this.xPos = xPos;
    this.yPos = yPos;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(background, 0, 0, this.WIDTH, this.HEIGHT);
  }
}
