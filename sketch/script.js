const container = document.querySelector(".container");

let containerSize = 500;

let dimensions = prompt("enter number of squares you want on sides");
// let dimensions = 10;
let squareSize = containerSize / Number(dimensions);

console.log(dimensions);
console.log(squareSize);

for (let i = 0; i < dimensions * dimensions; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  square.style.width = squareSize + "px";
  square.style.height = squareSize + "px";
  container.append(square);
}

// console.log(container.childNodes);

container.childNodes.forEach((child) => {
  child.addEventListener("mouseover", () => {
     const getRandomBg = getRandomColor();

     child.style.backgroundColor = getRandomBg;
  });
});


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

