import bulletImgL from "../../assets/images/leftBullet.png";
import bulletImgR from "../../assets/images/rightBullet.png";
import { collisionBetweenCharacters } from "../../utils/collisionDetection";
import { BULLET_SPRITE, CANVAS } from "../../utils/constant";
import { Enemy } from "../Enemy/Enemy";
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

  direction: string;

  constructor(positionX: number, positionY: number, direction: string) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.bulletImg = new Image();
    this.width = BULLET_SPRITE.WIDTH;
    this.height = BULLET_SPRITE.HEIGHT;
    this.direction = direction;
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
    switch (this.direction) {
      case "DIRECTION_RIGHT":
        this.positionX += BULLET.SPEED;
        break;
      case "DIRECTION_LEFT":
        this.positionX -= BULLET.SPEED;
        break;
      case "DIRECTION_UP":
        this.positionY -= BULLET.SPEED;
        break;
      case "DIRECTION_DOWN_RIGHT":
        this.positionX += BULLET.SPEED;
        this.positionY += BULLET.SPEED;
        break;
      case "DIRECTION_DOWN_LEFT":
        this.positionX -= BULLET.SPEED;
        this.positionY += BULLET.SPEED;
        break;
      case "DIRECTION_UP_RIGHT":
        this.positionX += BULLET.SPEED;
        this.positionY -= BULLET.SPEED;
        break;
      case "DIRECTION_UP_LEFT":
        this.positionX -= BULLET.SPEED;
        this.positionY -= BULLET.SPEED;
        break;
    }
    if (
      this.positionX < 0 ||
      this.positionX > CANVAS.WIDTH ||
      this.positionY < 0 ||
      this.positionY > CANVAS.HEIGHT
    ) {
      this.removeBullet(bullets);
    }
  }
  removeBullet(bullets: Bullet[]) {
    const index = bullets.indexOf(this);
    if (index > -1) {
      bullets.splice(index, 1);
    }
  }
  checkCollisionsWithEnemies(enemies: Enemy[], bullets: Bullet[]): void {
    enemies.forEach((enemy, enemyIndex) => {
      if (collisionBetweenCharacters(this, enemy)) {
        this.handleCollisionWithEnemy(enemies, bullets, enemyIndex);
      }
    });
  }
  handleCollisionWithEnemy(
    enemies: Enemy[],
    bullets: Bullet[],
    enemyIndex: number
  ): void {
    enemies.splice(enemyIndex, 1);
    // Remove bullet from array
    this.removeBullet(bullets);
  }
}
