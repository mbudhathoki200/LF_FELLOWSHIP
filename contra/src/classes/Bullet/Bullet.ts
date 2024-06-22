import bulletImgL from "../../assets/images/leftBullet.png";
import bulletImgR from "../../assets/images/rightBullet.png";
import { BULLET, BULLET_SPRITE, CANVAS } from "../../utils/constant";

interface IBullet {
  x: number;
  y: number;
}
export class Bullet implements IBullet {
  x: number;
  y: number;
  height: number;
  width: number;
  bulletImg: HTMLImageElement;
  velocityX: number;

  constructor(x: number, y: number, direction: string) {
    this.x = x;
    this.y = y;
    this.bulletImg = new Image();
    this.width = BULLET_SPRITE.WIDTH;
    this.height = BULLET_SPRITE.HEIGHT;
    this.velocityX =
      direction === "DIRECTION_RIGHT" ? BULLET.SPEED : -BULLET.SPEED;
    this.bulletImg.src =
      direction === "DIRECTION_RIGHT" ? bulletImgR : bulletImgL;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.bulletImg, this.x, this.y, this.width, this.height);
  }

  moveBullet(bullets: Bullet[]) {
    this.x += this.velocityX;
    if (this.x < 0 || this.x > CANVAS.WIDTH) {
      const index = bullets.indexOf(this);
      if (index > -1) {
        bullets.splice(index, 1); // Remove the bullet from the array
      }
    }
  }
}
