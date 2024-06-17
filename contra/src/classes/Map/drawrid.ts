import { CANVAS } from "../../utils/constant";

var gridSize = 41;
var width = CANVAS.WIDTH;
var height = CANVAS.HEIGHT;

// Draw vertical grid lines
export default function drawGrid(ctx: CanvasRenderingContext2D): void {
  ctx.strokeStyle = "white";

  // Draw vertical grid lines and numbers
  for (let x = 0; x <= width; x += gridSize) {
    const colNumber = Math.floor(x / gridSize) + 1;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.fillText(colNumber.toString(), x + 10, 20);
  }

  // Draw horizontal grid lines and numbers
  for (let y = 0; y <= height; y += gridSize) {
    const rowNumber = Math.floor(y / gridSize) + 1;
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.fillStyle = "white";
    ctx.fillText(rowNumber.toString(), 10, y + 20);
  }

  ctx.stroke();
}
// export default function drawGrid(ctx: CanvasRenderingContext2D): void {
//   for (var x = 0; x <= width; x += gridSize) {
//     ctx.moveTo(x, 0);
//     ctx.lineTo(x, height);
//   }

//   // Draw horizontal grid lines
//   for (var y = 0; y <= height; y += gridSize) {
//     ctx.moveTo(0, y);
//     ctx.lineTo(width, y);
//   }

//   // Set grid color and stroke
//   ctx.strokeStyle = "white";
//   ctx.stroke();
// }
