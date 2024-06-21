type input = {
  left: boolean;
  right: boolean;
  jump: boolean;
  down: boolean;
  bullet: boolean;
  isShooting: boolean; // Flag to track if the Z key is pressed
};

export const input: input = {
  left: false,
  right: false,
  jump: false,
  down: false,
  bullet: false,
  isShooting: false, // Flag to track if the Z key is pressed
};
