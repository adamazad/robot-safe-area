/**
 * Takes an number and sums its digits
 * @param num
 */
export const sumNumberDigits = (num: number): number =>
  Array.from(`${Math.abs(num)}`, Number).reduce((a, b) => a + b);

/**
 * Checks if point is safe to visit.
 * A point is safe if the same of x- and y-coordiante digits is less or equal to 23
 * @param x number
 * @param y number
 */
export const isPointSafe = (x: number, y: number): boolean =>
  sumNumberDigits(x) + sumNumberDigits(y) < 24;

// A lsit of points to explore around a coordinate
export const moves = [
  { dx: 1, dy: 0 }, // ➡
  { dx: -1, dy: 0 }, // ⬅
  { dx: 0, dy: 1 }, // ⬆
  { dx: 0, dy: -1 }, // ⬇
];
