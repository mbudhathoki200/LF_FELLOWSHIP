import { PLAYER } from "./../../utils/constant";
import enemySprite from "../../assets/images/Enemies.gif";
import { ENEMY } from "../../utils/constant";
import { Character } from "../Character/Character";
import Map from "../Map/Map";
import { gunEnemy, sprite } from "./EnemySpriteCords";
import Player from "../Player/Player";
import { Bullet } from "../Bullet/Bullet";
interface IEnemy {
  positionX: number;
  positionY: number;
}
export class GuardEnemy extends Character implements IEnemy {
  positionX: number;
  positionY: number;
  isGrounded: boolean;
  guardImg: HTMLImageElement;
  enemyAction: sprite;
  isPlayerLeft: boolean;
  isPlayerRight: boolean;
  isPlayerAbove: boolean;
  isPlayerBelow: boolean;
  bullets: Bullet[] = [];
  lastShotTime: number;
  shotCooldown: number;

  constructor(positionX: number, positionY: number) {
    super(positionX, positionY, ENEMY.WIDTH, ENEMY.HEIGHT);
    this.positionX = positionX;
    this.positionY = positionY;
    this.isGrounded = false;
    this.guardImg = new Image();
    this.guardImg.src = enemySprite;
    this.enemyAction = gunEnemy.right;
    this.isPlayerLeft = false;
    this.isPlayerRight = false;
    this.isPlayerAbove = false;
    this.isPlayerBelow = false;
    this.lastShotTime = 0; // Initialize lastShotTime
    this.shotCooldown = 1000; // Set cooldown period in milliseconds
  }
  draw(ctx: CanvasRenderingContext2D) {
    const { x, y, width, height } = this.enemyAction;
    ctx.drawImage(
      this.guardImg,
      x,
      y,
      width,
      height,
      this.positionX - Map.offsetX,
      this.positionY,
      this.width,
      this.height
    );
    // Draw bullets
    this.bullets.forEach((bullet) => bullet.draw(ctx));
  }
  update(player: Player) {
    if (!this.isGrounded) {
      this.gravity(); // For Gravity Effect
    }
    this.checkVerticalCollision();
    this.getPlayerDirection(player);

    // Update bullets
    this.bullets.forEach((bullet) => bullet.moveBullet(this.bullets));

    // Attempt to shoot at player
    this.shootAtPlayer(player);
  }

  getPlayerDirection(player: Player) {
    const { positionX, positionY } = player;
    const { positionX: enemyPositionX, positionY: enemyPostionY } = this;

    this.isPlayerLeft = positionX + PLAYER.WIDTH + Map.offsetX < enemyPositionX;

    this.isPlayerRight =
      positionX + Map.offsetX > enemyPositionX + PLAYER.WIDTH;

    this.isPlayerBelow = positionY > enemyPostionY + PLAYER.HEIGHT;

    this.isPlayerAbove = positionY < enemyPostionY - PLAYER.HEIGHT;

    return this.changeEnemySprite();
  }

  changeEnemySprite() {
    if (this.isPlayerLeft && this.isPlayerAbove) {
      this.enemyAction = gunEnemy.upLeft;
      return "DIRECTION_UP_LEFT";
    } else if (this.isPlayerRight && this.isPlayerAbove) {
      this.enemyAction = gunEnemy.upRight;
      return "DIRECTION_UP_RIGHT";
    } else if (this.isPlayerRight && this.isPlayerBelow) {
      this.enemyAction = gunEnemy.downRight;
      return "DIRECTION_DOWN_RIGHT";
    } else if (this.isPlayerLeft && this.isPlayerBelow) {
      this.enemyAction = gunEnemy.downLeft;
      return "DIRECTION_DOWN_LEFT";
    } else if (this.isPlayerLeft) {
      this.enemyAction = gunEnemy.left;
      return "DIRECTION_LEFT";
    } else if (this.isPlayerRight) {
      this.enemyAction = gunEnemy.right;
      return "DIRECTION_RIGHT";
    } else if (this.isPlayerBelow) {
      this.enemyAction = gunEnemy.down;
      return "DIRECTION_DOWN";
    } else if (this.isPlayerAbove) {
      this.enemyAction = gunEnemy.up;
      return "DIRECTION_UP";
    }
  }

  shootAtPlayer(player: Player) {
    const currentTime = Date.now();
    if (currentTime - this.lastShotTime < this.shotCooldown) {
      return; // If the cooldown period has not passed, do not shoot
    }

    const { positionX: enemyX, positionY: enemyY } = this;

    let direction = this.getPlayerDirection(player);

    // Create and add bullet
    const bullet = new Bullet(enemyX - Map.offsetX, enemyY, direction);
    this.bullets.push(bullet);

    // Update the last shot time
    this.lastShotTime = currentTime;
  }
}
