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

export default class implements IMap {
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

  draw(ctx: CanvasRenderingContext2D, req: number) {
    // this.posX -= 15;
    // if (this.posX <= -5500) {
    //   cancelAnimationFrame(req);
    // }
    ctx.drawImage(background, this.posX, 0, this.WIDTH, this.HEIGHT);
  }
}
