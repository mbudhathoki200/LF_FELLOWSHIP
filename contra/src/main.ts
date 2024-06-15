import "./reset.css";
import "./style.css";

// classes
import Map from "./classes/Map/Map.ts";

//import Constants
import { CANVAS } from "./utils/constant.ts";
const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

//images

canvas.height = CANVAS.HEIGHT;
canvas.width = CANVAS.WIDTH;

//global variables
let gameMap;

function draw() {
  ctx.clearRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);
  //map Render
  gameMap = new Map(0, 0);
  gameMap.draw(ctx);

  requestAnimationFrame(draw);
}

draw();
