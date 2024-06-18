interface IPlatform {
  x: number;
  y: number;
  w: number;
  h: number;
  image: HTMLImageElement;
}

export default class Platforms implements IPlatform {
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
    ctx.strokeStyle = "red";
    ctx.strokeRect(this.x, this.y, this.w, this.h);
    // ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  }
}

function isColliding(platform1: Platforms, platform2: Platforms): boolean {
  return !(
    platform1.x + platform1.w < platform2.x ||
    platform1.x > platform2.x + platform2.w ||
    platform1.y + platform1.h < platform2.y ||
    platform1.y > platform2.y + platform2.h
  );
}
