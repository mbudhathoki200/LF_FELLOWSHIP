import bulletImgL from "../../assets/images/leftBullet.png";
import bulletImgR from "../../assets/images/rightBullet.png";
import {
  collisionBetweenCharacters,
  collisionBetweenWithGuardBullet,
} from "../../utils/collisionDetection";

import { BULLET_SPRITE, CANVAS, PLAYER, SCORE } from "../../utils/constant";

import { Enemy } from "../Enemy/Enemy";
import { GuardEnemy } from "../Enemy/GuardEnemy.ts";
import { MainTank } from "../Enemy/MainTank.ts";
import { Tank } from "../Enemy/Tank.ts";
import { PowerUpBox } from "../PowerUpBlock/PowerUpBox.ts";
import { BULLET } from "./../../utils/constant";
import { player } from "../../main.ts";
import { enemyHitSound, metalHitSound } from "../../utils/gameAudio.ts";
import { Explosion, explosionArray } from "../Explosion/Explosion.ts";
import { powerUP, powerUpArray } from "../PowerUpBlock/powerUp.ts";
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
  isBulletFast: boolean;

  direction: string | undefined;

  constructor(
    positionX: number,
    positionY: number,
    direction: string | undefined,
    isBulletFast: boolean = true
  ) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.bulletImg = new Image();
    this.width = BULLET_SPRITE.WIDTH;
    this.height = BULLET_SPRITE.HEIGHT;
    this.direction = direction;
    this.bulletImg.src =
      direction === "DIRECTION_RIGHT" ? bulletImgR : bulletImgL;
    this.isBulletFast = isBulletFast;
  }
  draw(
    ctx: CanvasRenderingContext2D,
    bulletImg: HTMLImageElement = this.bulletImg,
    WIDTH: number = this.width,
    HEIGHT: number = this.height
  ) {
    bulletImg = bulletImg;
    ctx.drawImage(bulletImg, this.positionX, this.positionY, WIDTH, HEIGHT);
  }

  //To move the bullets
  moveBullet(bullets: Bullet[]) {
    switch (this.direction) {
      case "DIRECTION_RIGHT":
        if (this.isBulletFast) {
          this.positionX += BULLET.SPEED;
        } else {
          this.positionX += BULLET.SLOW_SPEED;
        }
        break;
      case "DIRECTION_LEFT":
        if (this.isBulletFast) {
          this.positionX -= BULLET.SPEED;
        } else {
          this.positionX -= BULLET.SLOW_SPEED;
        }

        break;
      case "DIRECTION_UP":
        if (this.isBulletFast) {
          this.positionY -= BULLET.SPEED;
        } else {
          this.positionY -= BULLET.SLOW_SPEED;
        }
        break;
      case "DIRECTION_DOWN_RIGHT":
        if (this.isBulletFast) {
          this.positionX += BULLET.SPEED;
          this.positionY += BULLET.SPEED;
        } else {
          this.positionX += BULLET.SLOW_SPEED;
          this.positionY += BULLET.SLOW_SPEED;
        }
        break;
      case "DIRECTION_DOWN_LEFT":
        if (this.isBulletFast) {
          this.positionX -= BULLET.SPEED;
          this.positionY += BULLET.SPEED;
        } else {
          this.positionX -= BULLET.SLOW_SPEED;
          this.positionY += BULLET.SLOW_SPEED;
        }
        break;
      case "DIRECTION_UP_RIGHT":
        if (this.isBulletFast) {
          this.positionX += BULLET.SPEED;
          this.positionY -= BULLET.SPEED;
        } else {
          this.positionX += BULLET.SLOW_SPEED;
          this.positionY -= BULLET.SLOW_SPEED;
        }
        break;
      case "DIRECTION_UP_LEFT":
        if (this.isBulletFast) {
          this.positionX -= BULLET.SPEED;
          this.positionY -= BULLET.SPEED;
        } else {
          this.positionX -= BULLET.SLOW_SPEED;
          this.positionY -= BULLET.SLOW_SPEED;
        }
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

  checkCollisionsWithGuardEnemies(
    enemies: GuardEnemy[] | Tank[] | MainTank[],
    bullets: Bullet[]
  ): void {
    enemies.forEach((enemy, enemyIndex) => {
      if (collisionBetweenWithGuardBullet(this, enemy)) {
        this.handleCollisionWithGuardEnemy(enemies, bullets, enemyIndex, enemy);
      }
    });
  }
  checkCollisionsWithpowerUp(powerUps: PowerUpBox[], bullets: Bullet[]): void {
    powerUps.forEach((powerUp, enemyIndex) => {
      if (collisionBetweenWithGuardBullet(this, powerUp)) {
        this.handleCollisionWithPowerUp(powerUps, bullets, enemyIndex);
      }
    });
  }

  handleCollisionWithEnemy(
    enemies: Enemy[] | GuardEnemy[] | Tank[] | MainTank[] | PowerUpBox[],
    bullets: Bullet[],
    enemyIndex: number
  ): void {
    //Increase Score
    PLAYER.SCORE += SCORE.RUNNING_ENEMY;
    enemyHitSound();
    //Explosion Push
    explosionArray.push(
      new Explosion(this.positionX, this.positionY, "PLAYER_EXPLOSION")
    );
    //remove enemy from array
    enemies.splice(enemyIndex, 1);
    // Remove bullet from array
    this.removeBullet(bullets);
  }

  //Handle Player Bullet Hit Guard Enemy
  handleCollisionWithGuardEnemy(
    enemies: GuardEnemy[] | Tank[] | MainTank[],
    bullets: Bullet[],
    enemyIndex: number,
    enemy: GuardEnemy | Tank
  ): void {
    this.removeBullet(bullets);
    enemy.health--;

    if (enemy.health == 0) {
      PLAYER.SCORE += SCORE.GUARD_ENEMY;
      this.handleAfterEnemyHit(enemies, enemyIndex);
    }
  }

  handleCollisionWithTankEnemy(
    enemies: GuardEnemy[] | Tank[] | MainTank[],
    bullets: Bullet[],
    enemyIndex: number
  ): void {
    // Remove bullet from array
    this.removeBullet(bullets);

    PLAYER.SCORE += SCORE.TANK;
    this.handleAfterEnemyHit(enemies, enemyIndex);
  }

  handleCollisionWithPowerUp(
    powerUp: PowerUpBox[],
    bullets: Bullet[],
    enemyIndex: number
  ): void {
    metalHitSound();
    powerUpArray.push(new powerUP(player.positionX + 200, player.positionY));

    //remove enemy from array
    powerUp.splice(enemyIndex, 1);
    // Remove bullet from array
    this.removeBullet(bullets);
  }

  handleAfterEnemyHit(
    enemies: GuardEnemy[] | Tank[] | MainTank[],
    enemyIndex: number
  ) {
    enemyHitSound();
    //explosion
    explosionArray.push(
      new Explosion(this.positionX, this.positionY, "PLAYER_EXPLOSION")
    );
    //remove enemy from array
    enemies.splice(enemyIndex, 1);
  }
}
