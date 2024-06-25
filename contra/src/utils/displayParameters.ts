import { PLAYER } from "../constants/constant";

export function displayPlayerScore(ctx: CanvasRenderingContext2D): void {
  ctx.font = "20px VT323";
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + PLAYER.SCORE, 20, 30);
}
export function displayPlayerLife(ctx: CanvasRenderingContext2D): void {
  ctx.font = "20px VT323";
  ctx.fillStyle = "white";
  ctx.fillText("Life: " + PLAYER.LIFE, 20, 60);
}

// function displayPlayerHealthState(healthLeft) {
//   let image = new Image();
//   let { x, y, height, width } = healthDisplaySprite;
//   image.src = "./assets/images/Contra-Extras.gif";

//   for (let i = 1; i <= healthLeft; i++) {
//     ctx.drawImage(image, x, y, width, height, i * 20, 50, 50, 50);
//   }
// }
