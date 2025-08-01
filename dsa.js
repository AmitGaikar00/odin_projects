function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: 'Amit' };
const greetAmit = greet.bind(person, "hi" , "!!!!!!!!!!!!!");
console.log(greetAmit());  // Hi, Amit!!
