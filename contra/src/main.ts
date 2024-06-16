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
  gameMap.draw(ctx);
  player.draw(ctx);
}

draw();

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "a":
      if (player.posX > CANVAS.WIDTH / 2) {
        player.moveLeft();
      } else {
        gameMap.moveLeft(player.SPEED);
      }
      break;
    case "d":
      if (player.posX + player.width < CANVAS.WIDTH / 2) {
        player.moveRight();
      } else {
        gameMap.moveRight(player.SPEED);
      }
      break;
  }
});
