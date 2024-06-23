import { PLAYER } from "./../../utils/constant";
import enemySprite from "../../assets/images/Enemies.gif";
import { ENEMY } from "../../utils/constant";
import { Character } from "../Character/Character";
import Map from "../Map/Map";
import { gunEnemy, sprite } from "./EnemySpriteCords";
import Player from "../Player/Player";
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
  }
  update(player: Player) {
    if (!this.isGrounded) {
      this.gravity(); // For Gravity Effect
    }
    this.checkVerticalCollision();
    this.getPlayerDirection(player);
  }
  getPlayerDirection(player: Player) {
    const { positionX, positionY } = player;
    const { positionX: enemyPositionX, positionY: enemyPostionY } = this;
    console.log(`Player: ${positionX}`);
    console.log(`Enemy: ${enemyPositionX}`);

    this.isPlayerLeft = positionX + PLAYER.WIDTH + Map.offsetX < enemyPositionX;
    console.log(`Left ${this.isPlayerLeft}`);

    this.isPlayerRight =
      positionX + Map.offsetX > enemyPositionX + PLAYER.WIDTH;
    console.log(`Right ${this.isPlayerRight}`);

    this.isPlayerBelow = positionY > enemyPostionY + PLAYER.HEIGHT;
    // console.log(`Bellow ${this.isPlayerBelow}`);

    this.isPlayerAbove = positionY < enemyPostionY - PLAYER.HEIGHT;

    // console.log(`Above ${this.isPlayerAbove}`);
    this.changeEnemySprite();
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
      console.log(true);
      this.enemyAction = gunEnemy.left;
    } else if (this.isPlayerRight) {
      this.enemyAction = gunEnemy.right;
    } else if (this.isPlayerBelow) {
      this.enemyAction = gunEnemy.down;
    } else if (this.isPlayerAbove) {
      this.enemyAction = gunEnemy.up;
    }
  }
}
