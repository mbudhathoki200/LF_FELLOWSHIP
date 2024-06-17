import Platform from "../classes/Map/Playform";
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

type player = {
  WIDTH: number;
  HEIGHT: number;
  SPEED: number;
};

export const PLAYER: player = {
  WIDTH: 50,
  HEIGHT: 75,
  SPEED: 15,
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
