const fibonacci = function (num) {
  if (num < 0) {
    return "OOPS";
  }

  if (num === 0) {
    return 0;
  }

  if (num === 1) {
    return 1;
  }

  if (num === "1") {
    return 1;
  }

  if (num === "0") {
    return 0;
  }

  num = Number(num);

  let res = 0;
  let fibonacci1 = 1;
  let fibonacci2 = 1;
  for (let i = 2; i <= num; i++) {
    res = fibonacci1 + fibonacci2;

    fibonacci1 = fibonacci2;
    fibonacci2 = res;
  }

  return fibonacci1;
};

// Do not edit below this line
module.exports = fibonacci;
