import Map from "../classes/Map/Map";
import { Platfrom } from "../classes/Platform/Platform";
import Player from "../classes/Player/Player";

export function collisionDetections(
  player: Player,
  platform: Platfrom
): boolean {
  //   console.log("inside collision test");
  //   console.log(player.posY);
  //   console.log(platform.y);

  return (
    player.posX < platform.x - Map.offsetX + platform.w &&
    player.posX + player.width > platform.x - Map.offsetX &&
    player.posY + 50 <= platform.y + platform.h &&
    player.posY + player.height > platform.y
  );
}
