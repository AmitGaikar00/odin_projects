process.stdin.resume();
process.stdin.setEncoding("utf-8");

process.stdin.on("data", function (input) {
  let res = countDigits(input.trim(""));

  console.log(res);

  process.exit();
});

function countDigits(num) {
  return num.split("").length;
}

// console.log() prints the input and add the new line
// process.stdout.write() print on same line
