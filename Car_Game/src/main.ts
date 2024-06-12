import "./reset.css";
import "./style.css";

import { CAR_DIMENSIONS, DIMENSIONS, LANE_DIMENSIONS } from "./constants";

import Car from "./Classes/Car.ts";
import Lane from "./Classes/Lane.ts";

import { getRandomInt } from "./utils/Random.ts";

import carImg1 from "./assets/otherCar.png";
import playerImg from "./assets/playerCar.png";
import { hasSpace } from "./utils/spacing.ts";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const gameScore = document.querySelector(".details__score") as HTMLElement;
const restartBlock = document.querySelector(".details__restart") as HTMLElement;
const restartBtn = document.querySelector(".restart-Btn") as HTMLButtonElement;
const showHighScore = document.querySelector(".high__score") as HTMLElement;

canvas.width = DIMENSIONS.CANVAS_WIDTH;
canvas.height = DIMENSIONS.CANVAS_HEIGHT;

let myReq: number;
let score: number = 0;
let carArr: Car[];
let laneArr: Lane[];
let playerCar: Car;
let moveX: number;
const spaceBetweenCars: number = CAR_DIMENSIONS.height * 2;
let highScore: number;

const highScoreString = localStorage.getItem("highscore");
highScore = highScoreString !== null ? parseInt(highScoreString, 10) : 0;

function intializeGame(): void {
  CAR_DIMENSIONS.SPEED = 3;

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

  playerCar = new Car(
    DIMENSIONS.CANVAS_WIDTH / 2 - CAR_DIMENSIONS.width / 2,
    DIMENSIONS.CANVAS_HEIGHT - CAR_DIMENSIONS.height,
    CAR_DIMENSIONS.width,
    CAR_DIMENSIONS.height,
    playerImg
  );
  moveX = playerCar.x;
  do {
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
    carArr = [car1, car2, car3];
  } while (!hasSpace(carArr, spaceBetweenCars));

  laneArr = [
    lane_line_1,
    lane_line_2,
    lane_line_3,
    lane_line_4,
    lane_line_5,
    lane_line_6,
  ];
}
//lane
function draw() {
  ctx.clearRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);

  ctx.fillStyle = "#343434";
  ctx.fillRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);

  CAR_DIMENSIONS.SPEED *= 1.001;

  if (playerCar.x < moveX) {
    playerCar.x += 10;
    if (playerCar.x > moveX) {
      playerCar.x = moveX;
    }
  } else if (playerCar.x > moveX) {
    playerCar.x -= 10;
    if (playerCar.x < moveX) {
      playerCar.x = moveX;
    }
  }

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
      do {
        car.y = getRandomInt(-600, 0);
      } while (!hasSpace(carArr, spaceBetweenCars));

      score++;
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highscore", JSON.stringify(highScore));
      }
      gameScore.innerHTML = `Score: ${score}`;
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
  if (playerCar.collisionDetection(carArr)) {
    cancelAnimationFrame(myReq);
    restartBlock.style.display = "flex";
    return;
  }
  showHighScore.innerHTML = `High Score: ${highScore}`;

  myReq = requestAnimationFrame(draw);
}

window.addEventListener("keypress", (event) => {
  switch (event.key) {
    case "a": {
      if (
        moveX >
        DIMENSIONS.CANVAS_WIDTH / 2 - CAR_DIMENSIONS.width / 2 - 200
      ) {
        moveX -= 200;
      }
      break;
    }
    case "d": {
      if (
        moveX <
        DIMENSIONS.CANVAS_WIDTH / 2 - CAR_DIMENSIONS.width / 2 + 200
      ) {
        moveX += 200;
      }
      break;
    }
  }
});

restartBtn.addEventListener("click", () => {
  score = 0;
  gameScore.innerHTML = `Score: ${score}`;
  restartBlock.style.display = "none";
  intializeGame();
  requestAnimationFrame(draw);
});

intializeGame();
draw();
