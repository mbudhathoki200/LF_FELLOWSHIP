import { CANVAS } from "../../utils/constant";
import { collisionDetections } from "../../utils/collisionDetection.ts";
import { platformValues } from "../Platform/platformValues";

interface ICharacter {
  posX: number;
  posY: number;
  width: number;
  height: number;
  velX: number;
  velY: number;
  isGrounded: boolean;
}

export class Character implements ICharacter {
  posX: number;
  posY: number;
  width: number;
  height: number;
  velX: number;
  velY: number;
  isGrounded: boolean;

  constructor(posX: number, posY: number, width: number, height: number) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.velX = 0;
    this.velY = 0;
    this.isGrounded = true;
  }

  gravity(): void {
    if (this.posY + this.height + this.velY < CANVAS.HEIGHT) {
      this.posY += this.velY;
      this.velY += 0.5;
    } else {
      this.velY = 0; // Reset velocity to zero when on the ground
    }
  }

  checkVerticalCollision(): void {
    platformValues.forEach((platform: any) => {
      if (collisionDetections(this, platform)) {
        console.log(collisionDetections(this, platform));
        if (this.velY > 0) {
          this.velY = 0;
          if (this.posY + this.height >= platform.y) {
            this.posY = platform.y - 50;
          }
        }
      }
    });
  }
}
