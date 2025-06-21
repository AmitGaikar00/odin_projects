export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function reverseString(str) {
  return str.split("").reverse().join("");
}

export const calculator = {
  add: function (a, b) {
    return a + b;
  },

  subtract: function (a, b) {
    return a - b;
  },

  divide: function (a, b) {
    return a / b;
  },

  multiply: function (a, b) {
    return a * b;
  },
};

export function caesarCipher(str, shift) {
  // Normalize shift to range 0–25
  shift = ((shift % 26) + 26) % 26;

  const shiftChar = (char, base) => {
    const code = char.charCodeAt(0);
    const shifted = ((code - base + shift) % 26) + base;
    return String.fromCharCode(shifted);
  };

  let result = '';

  for (const char of str) {
    if (char >= 'A' && char <= 'Z') {
      result += shiftChar(char, 65); // Uppercase A-Z
    } else if (char >= 'a' && char <= 'z') {
      result += shiftChar(char, 97); // Lowercase a-z
    } else {
      result += char; // Leave non-letters unchanged
    }
  }

  return result;
}


export function analyzeArray(arr) {
  let n = arr.length;
  return {
    average: arr.reduce((val, count) => val + count, 0) / n,
    min: arr.reduce((val, min) => Math.min(val, min), arr[0]),
    max: arr.reduce((val, max) => Math.max(val, max), arr[0]),
    length: n,
  };
}
