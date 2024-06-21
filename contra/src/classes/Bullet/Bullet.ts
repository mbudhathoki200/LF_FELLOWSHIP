import bulletImgL from "../../assets/images/leftBullet.png";
import bulletImgR from "../../assets/images/rightBullet.png";
import { BULLET, BULLET_SPRITE, CANVAS, PLAYER } from "../../utils/constant";

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
    this.bulletImg.src = bulletImgR;
    this.width = BULLET_SPRITE.WIDTH;
    this.height = BULLET_SPRITE.HEIGHT;
    this.velocityX =
      direction === "DIRECTION_RIGHT" ? BULLET.SPEED : -BULLET.SPEED;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.bulletImg, this.x, this.y, this.width, this.height);
  }
  update() {
    this.moveBullet();
  }
  moveBullet() {
    if (this.x > 0 || this.x < CANVAS.WIDTH) {
      console.log(this.x);
      this.x += this.velocityX;
    }
  }

  // moveBullet(bullets: Bullet[]) {
  //   if (playerDirection == "DIRECTION_RIGHT") {
  //     this.x += this.velocityX;
  //     if (this.x > CANVAS.WIDTH) {
  //       bullets.pop();
  //     }
  //   } else {
  //     this.x -= this.velocityX;
  //     if (this.x < 0) {
  //       bullets.pop();
  //     }
  //   }
  // }
}
