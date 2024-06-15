import "./reset.css";
import "./style.css";

// classes
import Map from "./classes/Map/Map.ts";

//import Constants
import { CANVAS } from "./utils/constant.ts";
import Player from "./classes/Player/Player.ts";
const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

//images

canvas.height = CANVAS.HEIGHT;
canvas.width = CANVAS.WIDTH;

//global variables
let gameMap = new Map(0, 0);

let player = new Player(50, 175);

function draw() {
  ctx.clearRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);
  //map Render
  const req = requestAnimationFrame(draw);
  gameMap.draw(ctx, req);
  player.draw(ctx);
}

draw();

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "a":
      player.moveLeft();
      break;
    case "d":
      player.moveRigth();
      break;
  }
});
