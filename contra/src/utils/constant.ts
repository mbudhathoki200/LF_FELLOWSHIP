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
  WIDTH: 30,
  HEIGHT: 72,
  SPEED: 15,
  LIFE: 3,
  JUMP_POWER: 6,
  GRAVITY: 0.5,
};
