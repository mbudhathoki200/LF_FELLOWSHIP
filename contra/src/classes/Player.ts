import playerSheet from "../assets/images/player.gif";
import { CANVAS, PLAYER } from "../constants/constant.ts";
import { animationFrame } from "../main.ts";
import {
  TargetUpLR,
  playerPronePosition,
  playerTargetDown,
  playerTargetUp,
  runningLeft,
  runningRight,
  sprite,
} from "../spriteCords/PlayerSpriteCords.ts";
import {
  collisionBetweenCharacters,
  collisionWithPowerUp,
} from "../utils/collisionDetection.ts";
import displayGameOver from "../utils/displayGameOverScreen.ts";
import { playerHitSound } from "../utils/gameAudio.ts";
import { input } from "../utils/input.ts";
import { Bullet } from "./Bullet.ts";
import { Character } from "./Character.ts";
import { GuardEnemy } from "./GuardEnemy.ts";
import { MainTank } from "./MainTank.ts";
import Map from "./Map.ts";
import { PowerUpBox } from "./PowerUpBox.ts";
import { RunningEnemy } from "./RunningEnemy.ts";
import { Tank } from "./Tank.ts";
import { powerUP, powerUpArray } from "./powerUp.ts";

interface IPlayer {
  positionX: number;
  positionY: number;
}
//Bullet Array
const bullets: Bullet[] = [];

let bullet;

export default class Player extends Character implements IPlayer {
  playerImage: HTMLImageElement;
  velocityX: number;
  velocityY: number;
  SPEED: number;
  life: number;

  isInGrounded: boolean;
  inWater: boolean;
  isJumping: boolean;
  isRunning: boolean;
  isProne: boolean;

  runReq: number;
  animationTimer: number;
  animationCounter: number;
  playerDirection: string;
  playerAction: sprite;

  constructor(positionX: number, positionY: number) {
    super(positionX, positionY, PLAYER.WIDTH, PLAYER.HEIGHT);
    this.velocityX = 0;
    this.velocityY = 0;
    this.SPEED = PLAYER.SPEED;
    this.life = PLAYER.LIFE;

    this.isJumping = false;
    this.isRunning = false;
    this.isInGrounded = false;
    this.inWater = false;
    this.isProne = false;

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
    // ctx.strokeRect(this.positionX, this.positionY, this.width, this.height);
  }

  update(
    ctx: CanvasRenderingContext2D,
    enemies: RunningEnemy[],
    guardEnemies: GuardEnemy[],
    tanks: Tank[],
    mainTanks: MainTank[],
    powerUpBlocks: PowerUpBox[]
  ): void {
    if (!this.isInGrounded) {
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
      // bullet instantiate
      let bulletDirection = this.playerDirection;

      if (input.up) {
        bulletDirection = "DIRECTION_UP";
        bullet = new Bullet(
          this.positionX + PLAYER.WIDTH / 2,
          this.positionY + PLAYER.HEIGHT / 3,
          bulletDirection,
          true
        );
      }
      if (input.down && input.right) {
        bulletDirection = "DIRECTION_DOWN_RIGHT";
      } else if (input.down && input.left) {
        bulletDirection = "DIRECTION_DOWN_LEFT";
      } else if (input.down && input.right) {
        bulletDirection = "DIRECTION_UP_RIGHT";
      } else if (input.up && input.right) {
        bulletDirection = "DIRECTION_UP_RIGHT";
      } else if (input.up && input.left) {
        bulletDirection = "DIRECTION_UP_LEFT";
      }

      bullet = new Bullet(
        this.positionX + PLAYER.WIDTH,
        this.positionY + PLAYER.HEIGHT / 3,
        bulletDirection,
        true
      );
      bullets.push(bullet);
    }

    if (!this.inWater) {
      if (input.up) {
        this.stopMoving();
        this.targetUp(this.playerDirection);
      }
      if (input.down && input.right) {
        this.stopMoving();
        this.targetDown("DIRECTION_DOWN_RIGHT");
      }
      if (input.down && input.left) {
        this.stopMoving();
        this.targetDown("DIRECTION_DOWN_LEFT");
      }
      if (input.up && input.right) {
        this.stopMoving();
        this.targetUpLR("DIRECTION_DOWN_RIGHT");
      }
      if (input.up && input.left) {
        this.stopMoving();
        this.targetUpLR("DIRECTION_DOWN_LEFT");
      }
    }

    bullets.forEach((bullet) => {
      bullet.moveBullet(bullets);
      bullet.draw(ctx);
      //For Running Enemy
      bullet.checkCollisionsWithEnemies(enemies, bullets);
      //For Guard Enemy
      bullet.checkCollisionsWithStaticEnemies(guardEnemies, bullets);
      //For Tank
      bullet.checkCollisionsWithStaticEnemies(tanks, bullets);
      //For Main Tank
      bullet.checkCollisionsWithStaticEnemies(mainTanks, bullets);
      //For PowerUP Block
      bullet.checkCollisionsWithpowerUp(powerUpBlocks, bullets);
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

    //chech collision with powerUps
    this.checkCollisionsWithPowerUp(powerUpArray);
  }
  makeDefaultBullet(bulletDirection: string) {
    bullet = new Bullet(
      this.positionX + PLAYER.WIDTH,
      this.positionY + PLAYER.HEIGHT / 3,
      bulletDirection,
      true
    );
    bullets.push(bullet);
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
    this.height = PLAYER.HEIGHT - 22;

    if (this.playerDirection == "DIRECTION_LEFT") {
      this.playerAction = left;
    } else {
      this.playerAction = right;
    }
    this.isProne = true;
  }

  jump(): void {
    this.isJumping = true;
    this.isInGrounded = false;
    this.velocityY = -PLAYER.JUMP_POWER;
  }

  targetUp(direction: string) {
    if (direction === "DIRECTION_LEFT") {
      this.playerAction = playerTargetUp.left;
    } else {
      this.playerAction = playerTargetUp.right;
    }
  }
  targetUpLR(direction: string) {
    let { left, right } = TargetUpLR;
    if (direction == "DIRECTION_DOWN_RIGHT") {
      this.playerAction = right;
    } else {
      this.playerAction = left;
    }
    this.height = PLAYER.HEIGHT;
    this.width = PLAYER.WIDTH;
  }

  targetDown(direction: string) {
    let { left, right } = playerTargetDown;
    if (direction == "DIRECTION_DOWN_RIGHT") {
      this.playerAction = right;
    } else {
      this.playerAction = left;
    }
    this.height = PLAYER.HEIGHT;
    this.width = PLAYER.WIDTH;
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

  //check collision with Running enemies
  checkCollisionsWithEnemies(enemies: RunningEnemy[]): void {
    enemies.forEach((enemy, index) => {
      if (collisionBetweenCharacters(this, enemy)) {
        this.handleCollisionWithEnemy(enemies, index);
      }
    });
  }
  //collision with powerUps
  checkCollisionsWithPowerUp(powerUpArray: powerUP[]): void {
    powerUpArray.forEach((power, index) => {
      if (collisionWithPowerUp(this, power)) {
        this.handleCollisionWithPowerUP(powerUpArray, index);
      }
    });
  }

  handleCollisionWithEnemy(enemies: RunningEnemy[], enemyIndex: number): void {
    this.playerHit();
    // Remove the enemy from the array
    enemies.splice(enemyIndex, 1);
  }

  handleCollisionWithPowerUP(power: powerUP[], powerIndex: number): void {
    PLAYER.LIFE += 1; // Increase player life
    power.splice(powerIndex, 1);
  }

  reSpawn(): void {
    if (PLAYER.LIFE <= 1) {
      displayGameOver();
      cancelAnimationFrame(animationFrame);
    } else {
      this.positionX = PLAYER.RESPAWN_POSITION_X;
      this.positionY = PLAYER.RESPAWN_POSITION_Y;
    }
  }
  playerHit() {
    this.reSpawn();
    playerHitSound();
    PLAYER.LIFE -= 1; // Decrease player life
  }
}
