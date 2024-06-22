import { Bullet } from "../classes/Bullet/Bullet";
import Map from "../classes/Map/Map";
import { Platfrom } from "../classes/Platform/Platform";
import { Character } from "./../classes/Character/Character";

// export function collisionDetections(
//   player: Player,
//   platform: Platfrom
// ): boolean {
//   //   console.log("inside collision test");
//   //   console.log(player.positionY);
//   //   console.log(platform.y);

//   return (
//     player.positionX < platform.x - Map.offsetX + platform.w &&
//     player.positionX + player.width > platform.x - Map.offsetX &&
//     player.positionY + 50 <= platform.y + platform.h &&
//     player.positionY + player.height > platform.y
//   );
// }
export const collisionDetections = (
  character: Character,
  platform: Platfrom
): boolean => {
  return (
    character.positionX < platform.x - Map.offsetX + platform.w &&
    character.positionX + character.width > platform.x - Map.offsetX &&
    character.positionY + 50 <= platform.y + platform.h &&
    character.positionY + character.height > platform.y
  );
};

export const collisionBetweenCharacters = (
  object1: Character | Bullet,
  object2: Character
) => {
  return (
    object1.positionX < object2.positionX + object2.width &&
    object1.positionX + object1.width > object2.positionX &&
    object1.positionY < object2.positionY + object2.height &&
    object1.positionY + object1.height > object2.positionY
  );
};
