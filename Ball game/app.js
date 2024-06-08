//body
const body = document.querySelector("body");
body.style.display = "flex";
body.style.alignItems = "center";
body.style.justifyContent = "center";
body.style.minHeight = "100vh";

//box
const box = document.getElementById("box");
box.style.width = "700px";
box.style.height = "600px";
box.style.background = "lightgrey";
box.style.position = "relative";
box.style.boxShadow =
  "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px";

const BOUNDARY_X_MIN = 0;
const BOUNDARY_X_MAX = 680;

const BOUNDARY_Y_MIN = 0;
const BOUNDARY_Y_MAX = 570;

const CONTAINER_WIDTH = 700;
const CONTAINER_HEIGHT = 600;

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
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
    this.dy = dy;
    this.dx = dx;
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
    if (this.y < 0 || this.y >= 570) this.dy *= -1;

    //check horizontal boundary collision
    if (this.x < 0 || this.x > 670) this.dx *= -1;

    //for ball collision
    balls.forEach((otherball) => {
      if (otherball !== this && this.isColliding(otherball)) {
        console.log("collided");
      }
    });
  };
  isColliding(otherball) {
    const dx = this.x - otherball.x;
    const dy = this.y - otherball.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistance = (this.w + otherball.w) / 2;
    return minDistance < distance;
  }
}
const BALL_COUNT = 2;
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
// const ball = new Ball(200, 0, 70, 70, "red");
// const ball2 = new Ball(500, 0, 70, 70, "green");

//Animate

function animateBall() {
  ballArray.forEach((ball) => ball.move(ballArray));
  requestAnimationFrame(animateBall);
}
// animateBall();
