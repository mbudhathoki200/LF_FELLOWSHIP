interface IPlatform {
  x: number;
  y: number;
  w: number;
  h: number;
  image: HTMLImageElement;
}

export default class Platform implements IPlatform {
  x: number;
  y: number;
  w: number;
  h: number;
  image: HTMLImageElement;
  constructor(x: number, y: number, w: number, h: number, imgSrc: string) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.image = new Image();
    this.image.src = imgSrc;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  }
}
