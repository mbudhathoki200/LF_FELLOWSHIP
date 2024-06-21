import bulletImgL from "../../assets/images/leftBullet.png";
import bulletImgR from "../../assets/images/rightBullet.png";
import { BULLET_SPRITE, CANVAS, PLAYER } from "../../utils/constant";

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

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.bulletImg = new Image();
    this.bulletImg.src = bulletImgR;
    this.width = BULLET_SPRITE.WIDTH;
    this.height = BULLET_SPRITE.HEIGHT;
    this.velocityX = 8;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.bulletImg, this.x, this.y, this.width, this.height);
  }

  moveBullet(playerDirection: string, bullets: Bullet[]) {
    if (playerDirection == "DIRECTION_RIGHT") {
      this.x += this.velocityX;
      if (this.x > CANVAS.WIDTH) {
        bullets.pop();
      }
    } else {
      this.x -= this.velocityX;
      if (this.x < 0) {
        bullets.pop();
      }
    }
  }
}
