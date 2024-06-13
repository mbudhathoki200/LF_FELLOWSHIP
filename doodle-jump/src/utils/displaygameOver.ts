import gameOver from "../assets/background.png";

const gameOverScreen = document.querySelector("over__screen") as HTMLElement;

export default function displayGameOver(): void {
  const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
  const start_screen = document.querySelector(
    ".start__screen"
  ) as HTMLCanvasElement;

  canvas.style.display = "none";
  start_screen.style.display = "none";

  gameOverScreen.style.display = "flex";
}
