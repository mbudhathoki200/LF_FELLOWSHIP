type dimensions = {
  CANVAS_HEIGHT: number;
  CANVAS_WIDTH: number;
};

export const DIMENSIONS: dimensions = {
  CANVAS_HEIGHT: 750,
  CANVAS_WIDTH: 700,
};

type car = {
  width: number;
  height: number;
  SPEED: number;
};

export const CAR_DIMENSIONS: car = {
  width: 150,
  height: 150,
  SPEED: 3,
};

type roadlane = {
  LANE_WIDTH: number;
  LANE_HEIGHT: number;
  SPEED: number;
};

export const LANE_DIMENSIONS: roadlane = {
  LANE_WIDTH: 20,
  LANE_HEIGHT: 150,
  SPEED: 3,
};
