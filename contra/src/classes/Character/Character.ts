import { collisionDetections } from "../../utils/collisionDetection.ts";
import { CANVAS } from "../../utils/constant";
import { GuardEnemy } from "../Enemy/GuardEnemy.ts";
import { platformValues } from "../Platform/platformValues";

interface ICharacter {
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  velocityX: number;
  velocityY: number;
  isGrounded: boolean;
}

export class Character implements ICharacter {
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  velocityX: number;
  velocityY: number;
  isGrounded: boolean;

  constructor(
    positionX: number,
    positionY: number,
    width: number,
    height: number
  ) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = width;
    this.height = height;
    this.velocityX = 0;
    this.velocityY = 0;
    this.isGrounded = true;
  }

  gravity(): void {
    if (this.positionY + this.height + this.velocityY < CANVAS.HEIGHT) {
      this.positionY += this.velocityY;
      this.velocityY += 0.5;
    } else {
      this.velocityY = 0; // Reset velocity to zero when on the ground
    }
  }

  checkVerticalCollision(): void {
    platformValues.forEach((platform: any) => {
      if (collisionDetections(this, platform)) {
        if (this.velocityY > 0) {
          this.velocityY = 0;
          if (this.positionY + this.height >= platform.y) {
            this.positionY = platform.y - 50;
          }
        }
      }
    });
  }
}
