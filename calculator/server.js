const buttons = document.querySelector(".buttons").childNodes;

let arr = [];
let result = null;

const display = document.querySelector("h1");

const clearValues = () => {
  arr = [];
  result = null;
  display.textContent = "0";
};

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const value = e.target.name;
    console.log(value);

    if (value === "clear") {
      clearValues();
    } else if (value === "delete") {
      arr.pop();
    } else if (value === "divide") {
      operator = "/";
      if (arr.length === 0) {
        alert("Please enter a value first");
      } else if (arr.length === 2) {
        alert("only one operator is allowed , please press = to get result");
      } else {
        arr.push(operator);
        display.textContent = "/";
      }
    } else if (value === "multiply") {
      operator = "*";
      if (arr.length === 0) {
        alert("Please enter a value first");
      } else if (arr.length === 2) {
        alert("only one operator is allowed , please press = to get result");
      } else {
        arr.push(operator);
        display.textContent = "*";
      }
    } else if (value === "subtract") {
      operator = "-";
      if (arr.length === 0) {
        alert("Please enter a value first");
      } else if (arr.length === 2) {
        alert("only one operator is allowed , please press = to get result");
      } else {
        arr.push(operator);
        display.textContent = "-";
      }
    } else if (value === "add") {
      operator = "+";
      if (arr.length === 0) {
        alert("Please enter a value first");
      } else if (arr.length === 2) {
        alert("only one operator is allowed , please press = to get result");
      } else {
        arr.push(operator);
        display.textContent = "+";
      }
    } else if (value === "equals") {
      if (arr.length === 0) {
        alert("Please enter a value first");
      } else if (arr.length === 1) {
        alert("Please enter an operator first");
      } else {
        result = calculateResult(arr);
        //  [5 , "+" , "5"]
        display.textContent = result;
        arr = [];
      }
    } else if (value === "0") {
      if (arr.length === 0 || arr.length === 2) {
        display.textContent = "0";
        arr.push(0);
      } else {
        alert("only one operation is allowed , please press = to get result");
      }
    } else if (value === "1") {
      if (arr.length === 0 || arr.length === 2) {
        display.textContent = "1";
        arr.push(1);
      } else {
        alert("only one operation is allowed , please press = to get result");
      }
    } else if (value === "2") {
      if (arr.length === 0 || arr.length === 2) {
        display.textContent = "2";
        arr.push(2);
      } else {
        alert("only one operation is allowed , please press = to get result");
      }
    } else if (value === "3") {
      if (arr.length === 0 || arr.length === 2) {
        display.textContent = "3";
        arr.push(3);
      } else {
        alert("only one operation is allowed , please press = to get result");
      }
    } else if (value === "4") {
      if (arr.length === 0 || arr.length === 2) {
        display.textContent = "4";
        arr.push(4);
      } else {
        alert("only one operation is allowed , please press = to get result");
      }
    } else if (value === "5") {
      if (arr.length === 0 || arr.length === 2) {
        display.textContent = "5";
        arr.push(5);
      } else {
        alert("only one operation is allowed , please press = to get result");
      }
    } else if (value === "6") {
      if (arr.length === 0 || arr.length === 2) {
        display.textContent = "6";
        arr.push(6);
      } else {
        alert("only one operation is allowed , please press = to get result");
      }
    } else if (value === "7") {
      if (arr.length === 0 || arr.length === 2) {
        display.textContent = "7";
        arr.push(7);
      } else {
        alert("only one operation is allowed , please press = to get result");
      }
    } else if (value === "8") {
      if (arr.length === 0 || arr.length === 2) {
        display.textContent = "8";
        arr.push(8);
      } else {
        alert("only one operation is allowed , please press = to get result");
      }
    } else if (value === "9") {
      if (arr.length === 0 || arr.length === 2) {
        display.textContent = "9";
        arr.push(9);
      } else {
        alert("only one operation is allowed , please press = to get result");
      }
    }
  });
});

function calculateResult(arr) {
  if (arr[1] === "+") {
    return arr[0] + arr[2];
  } else if (arr[1] === "-") {
    return arr[0] - arr[2];
  } else if (arr[1] === "*") {
    return arr[0] * arr[2];
  } else if (arr[1] === "/") {
    return arr[0] / arr[2];
  }
}
