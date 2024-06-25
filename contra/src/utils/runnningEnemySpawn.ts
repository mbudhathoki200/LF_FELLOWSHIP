import { Enemy } from "../classes/Enemy/Enemy";
import Map from "../classes/Map/Map";
import { enemies, player } from "../main";
import { CANVAS } from "./constant";

const spawnLocations: {
  x: number;
  y: number;
  count: number;
  spawned: boolean;
}[] = [
  { x: CANVAS.WIDTH, y: 150, count: 3, spawned: false },
  { x: CANVAS.WIDTH * 2, y: 150, count: 3, spawned: false },
  // { x: 400, y: 150, count: 5, spawned: false },
  // { x: 600, y: 150, count: 2, spawned: false },
];

function spawnEnemyGroups(
  location: { x: number; y: number; count: number; spawned: boolean },
  delay: number
): void {
  let spawnedCount = 0;
  const interval = setInterval(() => {
    if (spawnedCount >= location.count) {
      clearInterval(interval);
      location.spawned = true; // Mark as spawned
    } else {
      const offsetX = spawnedCount * 50; // Adjust the spacing between enemies as needed
      const newEnemy = new Enemy(
        location.x + offsetX - Map.offsetX,
        location.y
      );
      enemies.push(newEnemy);
      spawnedCount++;
    }
  }, delay);
}

// Function to check if the player is near a spawn location and spawn enemies
export function checkAndSpawnEnemies() {
  spawnLocations.forEach((location) => {
    const distance = Math.sqrt(
      (player.positionX - location.x) ** 2 +
        (player.positionY - location.y) ** 2
    );
    if (distance < 1000 && !location.spawned) {
      // Adjust the proximity threshold as needed
      spawnEnemyGroups(location, 1000); // 1000 ms delay between each enemy spawn
    }
  });
}
