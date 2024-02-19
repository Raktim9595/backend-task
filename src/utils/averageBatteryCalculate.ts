import _ from "lodash";

export function calculateAverageBattery(totalCapacity: number) {
  const random = _.multiply(totalCapacity, _.random(0.5, 1));
  return random;
}
