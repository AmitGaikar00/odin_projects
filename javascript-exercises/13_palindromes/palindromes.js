const palindromes = function (str) {
  const alphanumerical = "abcdefghijklmnopqrstuvwxyz0123456789";

  // Convert to lowercase, split to array of individual characters, filter only valid characters, then rejoin as new string
  const cleanedString = str
    .toLowerCase()
    .split("")
    .filter((character) => alphanumerical.includes(character))
    .join("");

  let i = 0;
  let j = cleanedString.length - 1;
  while (i < j) {
    if (cleanedString[i] !== cleanedString[j]) {
      return false;
    }
    i++;
    j--;
  }
  return true;
};

// Do not edit below this line
module.exports = palindromes;
