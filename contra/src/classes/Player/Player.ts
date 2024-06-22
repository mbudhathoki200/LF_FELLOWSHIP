import playerSheet from "../../assets/images/player.gif";
import { CANVAS, PLAYER } from "../../utils/constant";
import { input } from "../../utils/input.ts";
import { Bullet } from "../Bullet/Bullet.ts";
import { Character } from "../Character/Character.ts";
import Map from "../Map/Map";

import {
  playerPronePosition,
  runningLeft,
  runningRight,
  sprite,
} from "./PlayerImage.ts";

interface IPlayer {
  posX: number;
  posY: number;
}
//Bullet Array
const bullets: Bullet[] = [];
export default class Player extends Character implements IPlayer {
  playerImage: HTMLImageElement;
  velX: number;
  velY: number;
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

  constructor(posX: number, posY: number) {
    super(posX, posY, PLAYER.WIDTH, PLAYER.HEIGHT);
    this.velX = 0;
    this.velY = 0;
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
      this.posX,
      this.posY,
      this.width,
      this.height
    );

    ctx.strokeStyle = "red";
    ctx.strokeRect(this.posX, this.posY, this.width, this.height);
  }

  update(ctx: CanvasRenderingContext2D): void {
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
        this.posX + PLAYER.WIDTH,
        this.posY + PLAYER.HEIGHT / 4,
        this.playerDirection
      );
      bullets.push(bullet);
    }

    bullets.forEach((bullet) => {
      bullet.moveBullet(bullets);
      bullet.draw(ctx);
    });

    //Reset if No input Stroke is pressed
    if (Object.values(input).every((value) => value === false)) {
      this.animationTimer = 0;
      this.animationCounter = 0;
      this.stopMoving();
      this.resetActions();
      this.resetPlayerSize();
    }
  }

  moveLeft(gameMap: Map): void {
    if (this.posX > 0) {
      this.animateMovement();

      this.playerDirection = "DIRECTION_LEFT";

      if (!input.jump) {
        this.playerRunning(this.playerDirection);
      }
      this.velX = this.SPEED;
      this.posX -= this.velX;

      //move camera
      if (this.posX > CANVAS.WIDTH / 2) {
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
    if (this.posX + this.width < CANVAS.WIDTH / 2) {
      this.velX = this.SPEED;
      this.posX += this.velX;
    }

    //For Camera Offset
    if (this.posX + this.width > CANVAS.WIDTH / 2) {
      gameMap.moveRight(this.SPEED);
      Map.offsetX += this.SPEED;
    }
    if (this.posX > 3475) {
      this.posX = 3475;
      this.velX = 0;
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
    this.velY = -PLAYER.JUMP_POWER;
  }

  // checkVerticalCollision(): void {
  //   platformValues.forEach((platform: any) => {
  //     if (collisionDetections(this, platform)) {
  //       if (this.velY > 0) {
  //         this.velY = 0;
  //         if (this.posY + this.height >= platform.y) {
  //           this.posY = platform.y - 50;
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
    this.velX = 0;
  }

  resetActions() {
    if (this.playerDirection == "DIRECTION_LEFT") {
      this.playerAction = runningLeft[0];
    } else {
      this.playerAction = runningRight[0];
    }
  }
}
