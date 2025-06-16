// [0, 1, 1, 2, 3, 5, 8, 13] -> 8

function binarySearch(arr, val) {
  let le = 0;
  let ri = arr.length - 1;

  while (le <= ri) {
    let mid = (le + ri) / 2;

    if (arr[mid] > val) {
      ri = mid - 1;
    } else if (arr[mid] < val) {
      le = mid + 1;
    } else {
      return true;
    }
  }

  return false;
}

let flag = binarySearch([1, 2, 4, 5, 6, 8, 9], 3);
console.log(flag);
