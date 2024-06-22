import bulletImgL from "../../assets/images/leftBullet.png";
import bulletImgR from "../../assets/images/rightBullet.png";
import { BULLET_SPRITE, CANVAS } from "../../utils/constant";
import { BULLET } from "./../../utils/constant";
// import { Bullet } from "./Bullet";

interface IBullet {
  positionX: number;
  positionY: number;
}
export class Bullet implements IBullet {
  positionX: number;
  positionY: number;
  height: number;
  width: number;
  bulletImg: HTMLImageElement;
  velocityX: number;

  constructor(positionX: number, positionY: number, direction: string) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.bulletImg = new Image();
    this.width = BULLET_SPRITE.WIDTH;
    this.height = BULLET_SPRITE.HEIGHT;
    this.velocityX =
      direction === "DIRECTION_RIGHT" ? BULLET.SPEED : -BULLET.SPEED;
    this.bulletImg.src =
      direction === "DIRECTION_RIGHT" ? bulletImgR : bulletImgL;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.bulletImg,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    );
  }

  moveBullet(bullets: Bullet[]) {
    this.positionX += this.velocityX;
    if (this.positionX < 0 || this.positionX > CANVAS.WIDTH) {
      this.removeBullet(bullets);
    }
  }
  removeBullet(bullets: Bullet[]) {
    const index = bullets.indexOf(this);
    if (index > -1) {
      bullets.splice(index, 1);
    }
  }
}
