import _ from "lodash";

export function calculateAverageBattery(totalCapacity: number) {
  const random = _.add(0.5, _.random(0.5, 1));
  return random * totalCapacity;
}
