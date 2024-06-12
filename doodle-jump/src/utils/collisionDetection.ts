import Player from "../classes/Player";
import Platform from "../classes/Platform";

export default function collisionDetection(
  player: Player,
  platform: Platform
): boolean {
  const playerBottom = player.y + player.h;
  const platformTop = platform.y;
  const playerTop = player.y;
  const platformBottom = platform.y + platform.h;
  const playerRight = player.x + player.w;
  const platformLeft = platform.x;
  const playerLeft = player.x;
  const platformRight = platform.x + platform.w;

  if (
    playerBottom > platformTop &&
    playerTop < platformBottom &&
    playerRight > platformLeft &&
    playerLeft < platformRight
  ) {
    return true;
  }

  return false;
}
