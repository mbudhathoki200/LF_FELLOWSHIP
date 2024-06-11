import { CAR_DIMENSIONS } from "../constants";

interface ICar {
  x: number;
  y: number;
  w: number;
  h: number;
  image: HTMLImageElement;
  collisionDetection(carArr: Array<object>): boolean;
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
  collisionDetection(CarArr: Array<ICar>): boolean {
    for (let car of CarArr) {
      const distance = Math.sqrt(
        Math.pow(this.x - car.x, 2) + Math.pow(this.y - car.y, 2)
      );
      if (distance < this.h) {
        return true;
      }
    }
    return false;
  }
}
