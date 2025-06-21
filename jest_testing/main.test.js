import {
  capitalize,
  reverseString,
  calculator,
  caesarCipher,
  analyzeArray,
} from "./main.js";

describe("capitalize function", () => {
  test("capitalizes a lowercase word", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  test("returns empty string for empty input", () => {
    expect(capitalize("")).toBe("");
  });
});

describe("reverse string", () => {
  test("return reveresed string", () => {
    expect(reverseString("amit")).toBe("tima");
  });
});

describe("calculator object ", () => {
  test("sum ", () => {
    expect(calculator.add(1, 2)).toBe(3);
  });

  test("subtract ", () => {
    expect(calculator.subtract(1, 2)).toBe(-1);
  });

  test("multiply ", () => {
    expect(calculator.multiply(1, 2)).toBe(2);
  });

  test("divide ", () => {
    expect(calculator.divide(1, 2)).toBe(0.5);
  });
});

describe("cipher code", () => {
  test("cipher the string", () => {
    expect(caesarCipher("xyz", 3)).toBe("abc");
  });

  test("cipher the string", () => {
    expect(caesarCipher("XYZ", 3)).toBe("ABC");
  });

  test("cipher the string", () => {
    expect(caesarCipher("HeLLo", 3)).toBe("KhOOr");
  });
  test("cipher the string", () => {
    expect(caesarCipher("Hello, World!", 3)).toBe("Khoor, Zruog!");
  });
});

describe("analyze array", () => {
  test("object", () => {
    expect(analyzeArray([1, 8, 3, 4, 2, 6])).toStrictEqual({
      average: 4,
      min: 1,
      max: 8,
      length: 6,
    });
  });
});
