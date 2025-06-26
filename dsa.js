process.stdin.resume();
process.stdin.setEncoding("utf-8");

process.stdin.on("data", function (input) {
  countDigits(input.trim(""));

  process.exit();
});

function countDigits(num) {
  return 
}
