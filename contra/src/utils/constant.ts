import Platform from "../classes/Map/hawaPlatform";
import Player from "../classes/Player/Player";
type canvas = {
  WIDTH: number;
  HEIGHT: number;
};

export const CANVAS: canvas = {
  WIDTH: 1000,
  HEIGHT: 221 * 2,
};

type map = {
  WIDTH: number;
  HEIGHT: number;
};

export const MAP: map = {
  WIDTH: 3339 * 2,
  HEIGHT: 221 * 2,
};

// Player Constants

type player = {
  WIDTH: number;
  HEIGHT: number;
  SPEED: number;
  LIFE: number;
  JUMP_POWER: number;
  GRAVITY: number;
};

type playerSprite = {
  WIDTH: number;
  HEIGHT: number;
  COLUMNS: number;
};

export const PLAYER_SPRITE: playerSprite = {
  WIDTH: 116,
  HEIGHT: 38,
  COLUMNS: 5,
};
export const PLAYER: player = {
  WIDTH: PLAYER_SPRITE.WIDTH / PLAYER_SPRITE.COLUMNS,
  HEIGHT: 38,
  SPEED: 15,
  LIFE: 3,
  JUMP_POWER: 10,
  GRAVITY: 0.5,
};

export default function collisionDetection(
  player: Player,
  platform: Platform
): boolean {
  if (
    player.posY + player.height >= platform.y &&
    player.posY + player.height <= platform.y + platform.h &&
    player.posX + player.width >= platform.x &&
    player.posX <= platform.x + platform.w &&
    player.velY > 0
  ) {
    return true;
  } else {
    return false;
  }
}
