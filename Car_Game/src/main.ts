import "./reset.css";
import "./style.css";

import { DIMENSIONS, CAR_DIMENSIONS, LANE_DIMENSIONS } from "./constants";

import Car from "./Classes/Car.ts";
import Lane from "./Classes/Lane.ts";

import { getRandomInt } from "./utils/Random.ts";

import playerImg from "./assets/car-1.png";
import carImg1 from "./assets/car-03.png";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

canvas.width = DIMENSIONS.CANVAS_WIDTH;
canvas.height = DIMENSIONS.CANVAS_HEIGHT;

//lane
const lane_line_1 = new Lane(
  DIMENSIONS.CANVAS_WIDTH * (1 / 3),
  0,
  LANE_DIMENSIONS.LANE_WIDTH,
  LANE_DIMENSIONS.LANE_HEIGHT
);
const lane_line_2 = new Lane(
  DIMENSIONS.CANVAS_WIDTH * (2 / 3),
  0,
  LANE_DIMENSIONS.LANE_WIDTH,
  LANE_DIMENSIONS.LANE_HEIGHT
);
const lane_line_3 = new Lane(
  DIMENSIONS.CANVAS_WIDTH * (1 / 3),
  300,
  LANE_DIMENSIONS.LANE_WIDTH,
  LANE_DIMENSIONS.LANE_HEIGHT
);
const lane_line_4 = new Lane(
  DIMENSIONS.CANVAS_WIDTH * (2 / 3),
  300,
  LANE_DIMENSIONS.LANE_WIDTH,
  LANE_DIMENSIONS.LANE_HEIGHT
);
const lane_line_5 = new Lane(
  DIMENSIONS.CANVAS_WIDTH * (1 / 3),
  600,
  LANE_DIMENSIONS.LANE_WIDTH,
  LANE_DIMENSIONS.LANE_HEIGHT
);
const lane_line_6 = new Lane(
  DIMENSIONS.CANVAS_WIDTH * (2 / 3),
  600,
  LANE_DIMENSIONS.LANE_WIDTH,
  LANE_DIMENSIONS.LANE_HEIGHT
);

const playerCar = new Car(
  DIMENSIONS.CANVAS_WIDTH / 2 - CAR_DIMENSIONS.width / 2,
  DIMENSIONS.CANVAS_HEIGHT - CAR_DIMENSIONS.height,
  CAR_DIMENSIONS.width,
  CAR_DIMENSIONS.height,
  playerImg
);

const car1 = new Car(
  DIMENSIONS.CANVAS_WIDTH / 2 - CAR_DIMENSIONS.width / 2 - 200,
  getRandomInt(-600, 0),
  CAR_DIMENSIONS.width,
  CAR_DIMENSIONS.height,
  carImg1
);
const car2 = new Car(
  DIMENSIONS.CANVAS_WIDTH / 2 - CAR_DIMENSIONS.width / 2 + 200,
  getRandomInt(-600, 0),
  CAR_DIMENSIONS.width,
  CAR_DIMENSIONS.height,
  carImg1
);

const car3 = new Car(
  DIMENSIONS.CANVAS_WIDTH / 2 - CAR_DIMENSIONS.width / 2,
  getRandomInt(-600, 0),
  CAR_DIMENSIONS.width,
  CAR_DIMENSIONS.height,
  carImg1
);
const carArr = [car1, car2, car3];
const laneArr = [
  lane_line_1,
  lane_line_2,
  lane_line_3,
  lane_line_4,
  lane_line_5,
  lane_line_6,
];

function draw() {
  ctx.clearRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);

  ctx.fillStyle = "#343434";
  ctx.fillRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);

  ctx.drawImage(
    playerCar.image,
    playerCar.x,
    playerCar.y,
    playerCar.w,
    playerCar.h
  );

  //Draw Car
  carArr.forEach((car) => {
    ctx.drawImage(car.image, car.x, car.y, car.w, car.h);
    car.y += CAR_DIMENSIONS.SPEED;
    if (car.y > DIMENSIONS.CANVAS_HEIGHT) {
      car.y = getRandomInt(-300, 0);
    }
  });
  //Draw Lane Line
  laneArr.forEach((lane) => {
    ctx.fillStyle = "white";
    ctx.fillRect(lane.x, lane.y, lane.w, lane.h);
    lane.y += LANE_DIMENSIONS.SPEED;
    if (lane.y > DIMENSIONS.CANVAS_HEIGHT) {
      lane.y = -120;
    }
  });
  requestAnimationFrame(draw);
}
window.addEventListener("keypress", (event) => {
  console.log(event.key);
  switch (event.key) {
    case "a": {
      playerCar.x -= 200;
      break;
    }
    case "d": {
      playerCar.x += 200;
      break;
    }
  }
});

draw();
