import { ENEMY } from "../../utils/constant";
import { Character } from "./../Character/Character";

interface IEnemy {
  positionX: number;
  positionY: number;
  width: number;
  height: number;
}

export class Enemy extends Character implements IEnemy {
  constructor(positionX: number, positionY: number) {
    super(positionX, positionY, ENEMY.WIDTH, ENEMY.HEIGHT);
    this.positionX = positionX;
    this.positionY = positionY;
    this.isGrounded = false;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.positionX, this.positionY, ENEMY.WIDTH, ENEMY.HEIGHT);
  }
  update() {
    if (!this.isGrounded) {
      this.gravity(); //For Gravity Effect
    }
    this.checkVerticalCollision();
    this.positionX -= 10;
  }
}
