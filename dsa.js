function analyzeArray(arr) {
  let n = arr.length;
  return {
    average: arr.reduce((val, count) => val + count, 0) / n,
    min: arr.reduce((val, min) => Math.min(val, min), arr[0]),
    max: arr.reduce((val, max) => Math.max(val, max), arr[0]),
    length: n,
  };
}



const object = analyzeArray([1,8,3,4,2,6]);
console.log(object)