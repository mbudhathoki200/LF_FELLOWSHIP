import Player from "../classes/Player";
import Platform from "../classes/Platform";

export default function collisionDetection(
  player: Player,
  platform: Platform
): boolean {
  if (
    player.y + player.h >= platform.y &&
    player.y + player.h <= platform.y + platform.h &&
    player.x + player.w >= platform.x &&
    player.x <= platform.x + platform.w &&
    player.velocityY > 0
  ) {
    return true;
  } else {
    return false;
  }
}
