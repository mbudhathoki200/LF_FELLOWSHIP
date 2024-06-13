const gameOverScreen = document.querySelector(".over__screen") as HTMLElement;

export default function displayGameOver(): void {
  const canvas = document.querySelector("#canvas") as HTMLCanvasElement;

  canvas.style.display = "none";

  gameOverScreen.style.display = "flex";
}
