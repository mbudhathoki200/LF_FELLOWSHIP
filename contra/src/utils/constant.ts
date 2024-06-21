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

export const PLAYER: player = {
  WIDTH: 33,
  HEIGHT: 72,
  SPEED: 15,
  LIFE: 3,
  JUMP_POWER: 6,
  GRAVITY: 0.5,
};
type playerSprite = {
  WIDTH: number;
  HEIGHT: number;
  COLUMNS: number;
};

export const PLAYER_SPRITE: playerSprite = {
  WIDTH: 116,
  HEIGHT: 50,
  COLUMNS: 5,
};

type bullet = {
  WIDTH: number;
  HEIGHT: number;
};
export const BULLET_SPRITE: bullet = {
  WIDTH: 20,
  HEIGHT: 20,
};
