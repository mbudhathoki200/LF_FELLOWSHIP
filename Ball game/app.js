//body styling
const body = document.querySelector("body");
body.style.display = "flex";
body.style.alignItems = "center";
body.style.justifyContent = "center";
body.style.minHeight = "100vh";

//box styling

const CONTAINER_WIDTH = window.innerWidth;
const CONTAINER_HEIGHT = window.innerHeight;

const box = document.getElementById("box");
box.style.width = `${CONTAINER_WIDTH}px`;
box.style.height = `${CONTAINER_HEIGHT}px`;
box.style.background = "#FFFAFA";
box.style.position = "relative";
box.style.overflow = "hidden";

const BOUNDARY_X_MIN = 0;
const BOUNDARY_X_MAX = CONTAINER_WIDTH;

const BOUNDARY_Y_MIN = 0;
const BOUNDARY_Y_MAX = CONTAINER_HEIGHT;

function getRandomInt(min = 10, max = 15) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
function getRandomColor(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

class Ball {
  constructor(x = 0, y = 0, s = 30, color = "#000", dy = 1, dx = 1) {
    this.x = x;
    this.y = y;
    this.w = s;
    this.h = s;
    this.color = color;

    this.dx = Math.round(Math.random() * 10 - 5);
    this.dy = Math.round(Math.random() * 10 - 5);

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
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;

    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;

    //check vertical boundary collision
    if (this.y < BOUNDARY_Y_MIN) {
      this.y = BOUNDARY_Y_MIN;
      this.dy *= -1;
    }
    if (this.y > BOUNDARY_Y_MAX - this.h) {
      this.y = BOUNDARY_Y_MAX - this.h;
      this.dy *= -1;
    }

    //check horizontal boundary collision
    if (this.x < BOUNDARY_X_MIN) {
      this.x = BOUNDARY_X_MIN;
      this.dx *= -1;
    }
    if (this.x > BOUNDARY_X_MAX - this.w) {
      this.x = BOUNDARY_X_MAX - this.w;
      this.dx *= -1;
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
    //Exchange Velocities
    const tempDx = this.dx;
    const temDy = this.dy;
    this.dx = otherball.dx;
    this.dy = otherball.dy;
    otherball.dx = tempDx;
    otherball.dy = temDy;

    //move balls apart
    const overlap =
      this.w / 2 +
      otherball.w / 2 -
      Math.sqrt((this.x - otherball.x) ** 2 + (this.y - otherball.y) ** 2);

    const moveBy = overlap / 2;

    const angle = Math.atan2(this.y - otherball.y, this.x - otherball.x);
    this.x += Math.cos(angle) * moveBy;
    this.y += Math.sin(angle) * moveBy;
    otherball.x -= Math.cos(angle) * moveBy;
    otherball.y -= Math.sin(angle) * moveBy;
  }
}
const BALL_COUNT = 500;

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
  "purple",
];

//createBall
for (let i = 0; i < BALL_COUNT; i++) {
  let x, y, isOverlapping;
  do {
    x = getRandomInt(BOUNDARY_X_MIN, BOUNDARY_X_MAX);
    y = getRandomInt(BOUNDARY_Y_MIN, BOUNDARY_Y_MAX);
    isOverlapping = ballArray.some((ball) => {
      const dx = x - ball.x;
      const dy = y - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const radius = ball.w / 2;
      return distance < radius;
    });
  } while (isOverlapping);

  const ball = new Ball(x, y, getRandomInt(), getRandomColor(colorArray));
  ballArray.push(ball);
}

//Animate

function animateBall() {
  ballArray.forEach((ball) => ball.move(ballArray));
  requestAnimationFrame(animateBall);
}
animateBall();
