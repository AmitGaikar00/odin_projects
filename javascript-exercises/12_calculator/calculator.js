const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const sum = function (arr) {
  return arr.reduce((acc, curr) => acc + curr, 0);
};

const multiply = function (arr) {
  return arr.reduce((acc, curr) => acc * curr, 1);
};

const power = function (a,b) {
  return Math.pow(a,b);
};

const factorial = function (a) {
  if ( a === 0 ) {  return 1; }

  let res = 1;

  for( let i =1 ; i<=a ; i++ ) {
    res = res * i;
  }

  return res;
};

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial,
};
