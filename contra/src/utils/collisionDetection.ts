import Map from "../classes/Map/Map";
import { Platfrom } from "../classes/Platform/Platform";
import { Character } from "./../classes/Character/Character";

// export function collisionDetections(
//   player: Player,
//   platform: Platfrom
// ): boolean {
//   //   console.log("inside collision test");
//   //   console.log(player.posY);
//   //   console.log(platform.y);

//   return (
//     player.posX < platform.x - Map.offsetX + platform.w &&
//     player.posX + player.width > platform.x - Map.offsetX &&
//     player.posY + 50 <= platform.y + platform.h &&
//     player.posY + player.height > platform.y
//   );
// }
export const collisionDetections = (
  character: Character,
  platform: Platfrom
): boolean => {
  return (
    character.posX < platform.x - Map.offsetX + platform.w &&
    character.posX + character.width > platform.x - Map.offsetX &&
    character.posY + 50 <= platform.y + platform.h &&
    character.posY + character.height > platform.y
  );
};
