export function calculateAverageBattery(totalCapacity: number) {
  const random = 0.5 + 0.5 * Math.random();
  return random * totalCapacity;
}
