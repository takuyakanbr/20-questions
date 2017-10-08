
// returns a random integer between min (inclusive) and max (exclusive)
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// returns a random element from the given array
export function getRandomElement(array) {
  return array[getRandomInt(0, array.length)];
}
