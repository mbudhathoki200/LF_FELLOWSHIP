//body
const body = document.querySelector("body");
body.style.display = "flex";
body.style.alignItems = "center";
body.style.justifyContent = "center";
body.style.minHeight = "100vh";

//box

const CONTAINER_WIDTH = window.innerWidth;
const CONTAINER_HEIGHT = window.innerHeight;

const box = document.getElementById("box");
box.style.width = `${CONTAINER_WIDTH}px`;
box.style.height = `${CONTAINER_HEIGHT}px`;
box.style.background = "lightgrey";
box.style.position = "relative";
box.style.overflow = "hidden";
box.style.boxShadow =
  "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px";

const BOUNDARY_X_MIN = 0;
const BOUNDARY_X_MAX = CONTAINER_WIDTH;

const BOUNDARY_Y_MIN = 0;
const BOUNDARY_Y_MAX = CONTAINER_HEIGHT;

function getRandomInt(min, max) {
  const minCeiled = Math.floor(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
function getRandomColor(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

class Ball {
  constructor(
    x = 0,
    y = 0,
    w = 30,
    h = 30,
    color = "#000",
    dy = 1,
    dx = 1,
    speed = 5
  ) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.dy = Math.random() < 0.5 ? -1 : 1;
    this.dx = Math.random() < 0.5 ? -1 : 1;
    this.speed = speed;

    this.element = document.createElement("div");

    this.element.style.height = `${this.h}px`;
    this.element.style.width = `${this.w}px`;
    this.element.style.top = `${this.y}px`;
    this.element.style.left = `${this.x}px`;
    this.element.style.borderRadius = "50%";
    this.element.style.background = this.color;
    this.element.style.position = "absolute";

    box.appendChild(this.element);
  }
  move = (balls) => {
    this.x = this.x + this.dx * this.speed;
    this.y = this.y + this.dy * this.speed;

    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;

    //check vertical boundary collision
    if (this.y < BOUNDARY_Y_MIN) {
      this.y = BOUNDARY_Y_MIN;
      this.dy *= -1;
    }
    if (this.y > BOUNDARY_Y_MAX - this.h) {
      this.y = BOUNDARY_Y_MAX - this.w;
      this.dy *= -1;
    }
    //check horizontal boundary collision
    if (this.x < BOUNDARY_X_MIN) {
      this.x = BOUNDARY_X_MIN;
      this.dx *= -1;
    }
    if (this.x > BOUNDARY_X_MAX - this.w) {
      this.dx = -1;
    }

    //for ball collision
    balls.forEach((otherball) => {
      if (otherball !== this && this.isColliding(otherball)) {
        this.handleCollision(otherball);
      }
    });
  };
  isColliding(otherball) {
    const dx = this.x - otherball.x;
    const dy = this.y - otherball.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const radii = (this.w + otherball.w) / 2;
    return distance < radii;
  }
  handleCollision(otherball) {
    const tempDx = this.dx;
    const temDy = this.dy;
    this.dx = otherball.dx;
    this.dy = otherball.dy;
    otherball.dx = tempDx;
    otherball.dy = temDy;
  }
}
const BALL_COUNT = 50;
const ballArray = [];
const colorArray = [
  "red",
  "green",
  "blue",
  "black",
  "orange",
  "yellow",
  "#fb8500",
  "#023047",
  "#ffafcc",
];

//createBall
for (let i = 0; i < BALL_COUNT; i++) {
  const ball = new Ball(
    getRandomInt(BOUNDARY_X_MIN, BOUNDARY_X_MAX),
    getRandomInt(BOUNDARY_Y_MIN, BOUNDARY_Y_MAX),
    undefined,
    undefined,
    getRandomColor(colorArray)
  );
  ballArray.push(ball);
}

//Animate

function animateBall() {
  ballArray.forEach((ball) => ball.move(ballArray));
  requestAnimationFrame(animateBall);
}
animateBall();
