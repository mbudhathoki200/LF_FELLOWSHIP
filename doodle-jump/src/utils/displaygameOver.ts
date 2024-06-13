const gameOverScreen = document.querySelector(".over__screen") as HTMLElement;
const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const restartBtn = document.querySelector(".restart-btn") as HTMLButtonElement;
const scoreShow = document.querySelector(".score") as HTMLElement;
const highScoreShow = document.querySelector(".high__score") as HTMLElement;

export default function displayGameOver(score: number): void {
  canvas.style.display = "none";

  gameOverScreen.style.display = "flex";
  let highScore = parseInt(localStorage.getItem("highScore") || "0");

  if (score > highScore) {
    localStorage.setItem("highScore", JSON.stringify(score));
  }
  highScore = parseInt(localStorage.getItem("highScore") || "0");
  highScoreShow.innerText = `your high score : ${highScore}`;

  scoreShow.innerText = `your score : ${score}`;
  restartBtn?.addEventListener("click", () => {
    location.reload();
  });
}
