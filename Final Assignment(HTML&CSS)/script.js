let lightModeEnabled = true;
let removedDivs = [];

const lightModeButton = document.getElementById("lightModeButton");

lightModeButton.addEventListener("click", () => {
  lightModeEnabled = !lightModeEnabled;

  if (lightModeEnabled) {
    enableLightMode();
  } else {
    disableLightMode();
  }
});

const enableLightMode = () => {
  document.body.classList.add("light-mode");
  const divToRemove1 = document.getElementById("");
  if (divToRemove1) {
    removedDivs.push(divToRemove1);
    divToRemove1.remove();
  }
  const divToRemove2 = document.getElementById("blue");
  if (divToRemove2) {
    removedDivs.push(divToRemove2);
    divToRemove2.remove();
  }
};

const disableLightMode = () => {
  document.body.classList.remove("light-mode");

  removedDivs.forEach((div) => document.body.appendChild(div));
};
