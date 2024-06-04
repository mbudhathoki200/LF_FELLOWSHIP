let lightModeEnabled = true;
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
};

const disableLightMode = () => {
  document.body.classList.remove("light-mode");
};
