import {
  intervalID,
  maximumTimeBetweenPunches,
  minimalTimeBetweenPunches,
} from '.';
import { moveSquare } from './moveSquare';

export function startMovingSquare() {
  clearInterval(intervalID); // Clear existing interval
  intervalID = setInterval(
    moveSquare,
    Math.random() * (maximumTimeBetweenPunches - minimalTimeBetweenPunches) +
      minimalTimeBetweenPunches
  );
}
