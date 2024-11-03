function FindPositive(arr, k) {
  let current = 1;
  let count = 0;
  let index = 0;

  while (count < k) {
    if (index < arr.length && arr[index] == current) {
      index++;
    } else {
      count++;
      if (count === k) {
        return current;
      }
    }
    current++;
  }

  return -1;
}

// Example 1
const arr1 = [2, 3, 4, 7, 11],
  k1 = 5;
console.log("output 1 =", FindPositive(arr1, k1));

// Example 2
const arr2 = [1, 2, 3, 4],
  k2 = 2;
console.log("output 2 =", FindPositive(arr2, k2));
