import playerSheet from "../../assets/images/player.gif";
import { collisionBetweenCharacters } from "../../utils/collisionDetection.ts";
import { CANVAS, PLAYER } from "../../utils/constant";
import { input } from "../../utils/input.ts";
import { Bullet } from "../Bullet/Bullet.ts";
import { Character } from "../Character/Character.ts";
import { Enemy } from "../Enemy/Enemy.ts";
import Map from "../Map/Map";

import {
  playerPronePosition,
  runningLeft,
  runningRight,
  sprite,
} from "./PlayerImage.ts";

interface IPlayer {
  positionX: number;
  positionY: number;
}
//Bullet Array
const bullets: Bullet[] = [];

export default class Player extends Character implements IPlayer {
  playerImage: HTMLImageElement;
  velocityX: number;
  velocityY: number;
  SPEED: number;
  life: number;
  isGrounded: boolean;

  isJumping: boolean;
  isRunning: boolean;

  runReq: number;
  staggerFrame = 0;
  animationTimer: number;
  animationCounter: number;
  playerDirection: string;
  playerAction: sprite;
  prone: boolean;

  constructor(positionX: number, positionY: number) {
    super(positionX, positionY, PLAYER.WIDTH, PLAYER.HEIGHT);
    this.velocityX = 0;
    this.velocityY = 0;
    this.SPEED = PLAYER.SPEED;
    this.life = PLAYER.LIFE;
    this.isJumping = false;
    this.isRunning = false;
    this.isGrounded = false;
    this.prone = false;
    this.playerImage = new Image();
    this.playerImage.src = playerSheet;
    this.runReq = 0;
    this.animationTimer = 0;
    this.animationCounter = 0;
    this.playerDirection = "DIRECTION_RIGHT";
    this.playerAction = runningRight[0];
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.playerImage,
      this.playerAction.x,
      this.playerAction.y,
      this.playerAction.width,
      this.playerAction.height,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    );

    ctx.strokeStyle = "red";
    ctx.strokeRect(this.positionX, this.positionY, this.width, this.height);
  }

  update(ctx: CanvasRenderingContext2D, enemies: Enemy[]): void {
    if (!this.isGrounded) {
      this.gravity(); //For Gravity Effect
    }

    this.checkVerticalCollision();

    if (input.down) {
      this.stopMoving();
      this.playerProne();
    }

    if (input.jump) {
      this.jump();
    }

    if (input.bullet && !input.isShooting) {
      input.isShooting = true;
      //bullet instantiate
      const bullet = new Bullet(
        this.positionX + PLAYER.WIDTH,
        this.positionY + PLAYER.HEIGHT / 4,
        this.playerDirection
      );
      bullets.push(bullet);
    }

    bullets.forEach((bullet) => {
      bullet.moveBullet(bullets);
      bullet.draw(ctx);
      bullet.checkCollisionsWithEnemies(enemies, bullets);
    });

    //Reset if No input Stroke is pressed
    if (Object.values(input).every((value) => value === false)) {
      this.animationTimer = 0;
      this.animationCounter = 0;
      this.stopMoving();
      this.resetActions();
      this.resetPlayerSize();
    }
    // Check for collisions with enemies
    this.checkCollisionsWithEnemies(enemies);
  }

  moveLeft(gameMap: Map): void {
    if (this.positionX > 0) {
      this.animateMovement();

      this.playerDirection = "DIRECTION_LEFT";

      if (!input.jump) {
        this.playerRunning(this.playerDirection);
      }
      this.velocityX = this.SPEED;
      this.positionX -= this.velocityX;

      //move camera
      if (this.positionX > CANVAS.WIDTH / 2) {
        gameMap.moveLeft(this.SPEED);
        Map.offsetX -= this.SPEED;
      }
    }
  }

  moveRight(gameMap: Map): void {
    this.animateMovement();
    this.playerDirection = "DIRECTION_RIGHT";
    if (!input.jump) {
      this.playerRunning(this.playerDirection);
    }
    if (this.positionX + this.width < CANVAS.WIDTH / 2) {
      this.velocityX = this.SPEED;
      this.positionX += this.velocityX;
    }

    //For Camera Offset
    if (this.positionX + this.width > CANVAS.WIDTH / 2) {
      gameMap.moveRight(this.SPEED);
      Map.offsetX += this.SPEED;
    }
    if (this.positionX > 3475) {
      this.positionX = 3475;
      this.velocityX = 0;
    }
  }

  resetPlayerSize(): void {
    this.height = PLAYER.HEIGHT;
    this.width = PLAYER.WIDTH;
  }

  playerProne(): void {
    const { left, right } = playerPronePosition;

    this.width = PLAYER.WIDTH + 20;
    this.height = PLAYER.HEIGHT - 20;
    if (this.playerDirection == "DIRECTION_LEFT") {
      this.playerAction = left;
    } else {
      this.playerAction = right;
    }
    this.prone = true;
  }

  jump(): void {
    this.isJumping = true;
    this.isGrounded = false;
    this.velocityY = -PLAYER.JUMP_POWER;
  }

  // checkVerticalCollision(): void {
  //   platformValues.forEach((platform: any) => {
  //     if (collisionDetections(this, platform)) {
  //       if (this.velocityY > 0) {
  //         this.velocityY = 0;
  //         if (this.positionY + this.height >= platform.y) {
  //           this.positionY = platform.y - 50;
  //           this.isGrounded = true;
  //         }
  //       }
  //     } else {
  //       this.isGrounded = false;
  //     }
  //   });
  // }

  playerRunning(direction: string) {
    const runningDirection =
      direction === "DIRECTION_RIGHT" ? runningRight : runningLeft;

    const lastIndex = runningDirection.length - 1;

    if (this.animationTimer >= lastIndex) {
      this.animationTimer = 1;
    }
    this.playerAction = runningDirection[this.animationTimer];
  }

  animateMovement() {
    this.animationCounter++;
    if (this.animationCounter % 7 == 0 && this.animationCounter != 0) {
      this.animationTimer += 1;
    }
  }
  stopMoving() {
    this.velocityX = 0;
  }

  resetActions() {
    if (this.playerDirection == "DIRECTION_LEFT") {
      this.playerAction = runningLeft[0];
    } else {
      this.playerAction = runningRight[0];
    }
  }

  checkCollisionsWithEnemies(enemies: Enemy[]): void {
    enemies.forEach((enemy, index) => {
      if (collisionBetweenCharacters(this, enemy)) {
        // console.log("collided");
        this.handleCollisionWithEnemy(enemies, index);
      }
    });
  }
  handleCollisionWithEnemy(enemies: Enemy[], enemyIndex: number): void {
    this.life -= 1; // Decrease player life
    // console.log(`${this.life} Remaining`);
    // Remove the enemy from the array
    enemies.splice(enemyIndex, 1);
    // console.log(enemies);
  }
}
