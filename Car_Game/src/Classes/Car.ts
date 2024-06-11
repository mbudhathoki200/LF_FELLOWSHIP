interface ICar {
  x: number;
  y: number;
  w: number;
  h: number;
  image: HTMLImageElement;
}

export default class Car implements ICar {
  w: number;
  h: number;
  x: number;
  y: number;
  image: HTMLImageElement;

  constructor(x: number, y: number, w: number, h: number, image: string) {
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = image;
  }
}
