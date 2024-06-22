import { ENEMY } from "../../utils/constant";
import { Character } from "./../Character/Character";

interface IEnemy {
  posX: number;
  posY: number;
  width: number;
  height: number;
}

export class Enemy extends Character implements IEnemy {
  constructor(posX: number, posY: number) {
    super(posX, posY, ENEMY.WIDTH, ENEMY.HEIGHT);
    this.posX = posX;
    this.posY = posY;
    this.isGrounded = false;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.posX, this.posY, ENEMY.WIDTH, ENEMY.HEIGHT);
  }
  update() {
    if (!this.isGrounded) {
      this.gravity(); //For Gravity Effect
    }
    this.checkVerticalCollision();
    this.posX -= ENEMY.SPEED;
  }
}
