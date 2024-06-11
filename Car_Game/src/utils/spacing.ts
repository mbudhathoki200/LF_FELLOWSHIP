import Car from "../Classes/Car";

export function hasSpace(carsArray: Car[], spacing: number): boolean {
  for (let i = 0; i < carsArray.length; i++) {
    for (let j = i + 1; j < carsArray.length; j++) {
      if (Math.abs(carsArray[i].y - carsArray[j].y) < spacing) return false;
    }
  }
  return true;
}
