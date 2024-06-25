import enemySprite from "../../assets/images/Enemies.gif";
import { player } from "../../main";
import { collisionBetweenCharacters } from "../../utils/collisionDetection";
import { ENEMY } from "../../utils/constant";
import { Character } from "../Character/Character";
import Map from "../Map/Map";
import Player from "../Player/Player";
import { PLAYER } from "./../../utils/constant";
import { Bullet } from "./../Bullet/Bullet";
import { gunEnemy, sprite } from "./EnemySpriteCords";
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
  shootingRange: number;

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
    this.lastShotTime = 0;
    this.shotCooldown = 1000; // Set cooldown period in milliseconds
    this.shootingRange = 400; // Set the shooting range in pixels
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
    // if (!this.isGrounded) {
    //   this.gravity(); // For Gravity Effect
    // }

    this.checkVerticalCollision();

    this.getPlayerDirection(player);

    // Update bullets
    this.bullets.forEach((bullet, index) => {
      bullet.moveBullet(this.bullets);
      if (collisionBetweenCharacters(bullet, player)) {
        this.handleBulletCollision(this.bullets, index);
      }
    });

    // Attempt to shoot at player
    this.shootAtPlayer(player);
  }
  handleBulletCollision(bullets: Bullet[], bulletIndex: number): void {
    player.playerHit();
    console.log(`${PLAYER.LIFE} Remaining`);
    bullets.splice(bulletIndex, 1);
  }

  getPlayerDirection(player: Player) {
    const { positionX: playerX, positionY: playerY } = player;
    const { positionX: enemyX, positionY: enemyY } = this;

    this.isPlayerLeft = playerX + PLAYER.WIDTH + Map.offsetX < enemyX;

    this.isPlayerRight = playerX + Map.offsetX > enemyX + PLAYER.WIDTH;

    this.isPlayerBelow = playerY > enemyY + PLAYER.HEIGHT;

    this.isPlayerAbove = playerY < enemyY - PLAYER.HEIGHT;

    return this.changeSprite();
  }

  changeSprite() {
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

  isPlayerInRange(player: Player): boolean {
    let { positionX: playerX, positionY: playerY } = player;
    const { positionX: enemyX, positionY: enemyY } = this;

    // Calculate distance to player
    const distanceX = playerX - enemyX;
    const distanceY = playerY - enemyY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // Check if the player is within the shooting range
    return distance - Map.offsetX <= this.shootingRange;
  }

  shootAtPlayer(player: Player) {
    const currentTime = Date.now();
    if (currentTime - this.lastShotTime < this.shotCooldown) {
      return; // If the cooldown period has not passed, do not shoot
    }

    if (!this.isPlayerInRange(player)) {
      return; // If the player is not within range, do not shoot
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
