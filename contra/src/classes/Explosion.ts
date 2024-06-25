import explosionImage from "../../assets/images/Contra-Extras.gif";
import { EXPLOSION } from "../../constants/constant";
import {
  cloudExplosionSprite,
  extraSprite,
  normalExplosionSprite,
} from "./ExtraSpriteCords";

export const explosionArray: Explosion[] = [];

type explosion = {
  positionX: number;
  positionY: number;
  type: string;
};

export class Explosion implements explosion {
  positionX: number;
  positionY: number;
  type: string;
  explosionImage: HTMLImageElement;
  frame: number;
  size: number;
  animationTimer: number;
  removeExplosion: boolean;

  spriteState: extraSprite;

  constructor(positionX: number, positionY: number, type: string) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.type = type;
    this.explosionImage = new Image();
    this.explosionImage.src = explosionImage;

    this.size =
      this.type == "PLAYER_EXPLOSION"
        ? EXPLOSION.PLAYER_SIZE
        : EXPLOSION.TANK_SIZE;

    this.frame = 0;
    this.animationTimer = 0;
    this.removeExplosion = false;

    this.spriteState =
      this.type == "PLAYER_EXPLOSION"
        ? normalExplosionSprite[this.frame]
        : cloudExplosionSprite[this.frame];
  }
  draw(ctx: CanvasRenderingContext2D) {
    const { x, y, width, height } = this.spriteState;
    ctx.drawImage(
      this.explosionImage,
      x,
      y,
      width,
      height,
      this.positionX,
      this.positionY,
      this.size,
      this.size
    );
  }
  update() {
    const isNormalExplosion = this.type === "PLAYER_EXPLOSION";
    const lastFrame = isNormalExplosion
      ? normalExplosionSprite.length - 1
      : cloudExplosionSprite.length - 1;
    const endTime = isNormalExplosion ? 100 : 50;

    this.animationTimer++;

    if (this.animationTimer % 5 === 0 && this.frame < lastFrame) {
      this.frame++;

      this.spriteState = isNormalExplosion
        ? normalExplosionSprite[this.frame]
        : cloudExplosionSprite[this.frame];
    } else if (this.frame >= lastFrame) {
      setTimeout(() => {
        this.removeExplosion = true;
      }, endTime);
    }
  }
}
