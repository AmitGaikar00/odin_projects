const removeFromArray = function (arr, ...nums) {
  let res = arr.slice();
  for (let num of nums) {
    res = res.filter((i) => i !== num);
  }
  return res;
};

// Do not edit below this line
module.exports = removeFromArray;
