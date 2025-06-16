class Node {
  constructor(val) {
    this.value = val;
    this.nextNode = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  getSize() {
    return this.size;
  }

  append(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;

      while (current.nextNode) {
        current = current.nextNode;
      }
      current.nextNode = newNode;
    }
    this.size++;
  }

  prepend(value) {
    const newNode = new Node(value);
    newNode.nextNode = this.head;
    this.head = newNode;

    this.size++;
  }

  toString() {
    // ( value ) -> ( value ) -> ( value ) -> null
    let res = "";
    let current = this.head;
    while (current) {
      res += `( ${current.value} ) -> `;
      current = current.nextNode;
    }

    res += "null";
    console.log(res);
  }

  getHead() {
    return this.head;
  }

  getTail() {
    let current = this.head;

    while (current.nextNode) {
      current = current.nextNode;
    }
    return current;
  }

  at(index) {
    let current = this.head;

    for (let i = 1; i < index; i++) {
      current = current.nextNode;
    }
    return current;
  }

  pop() {
    let current = this.head;

    while (current.nextNode.nextNode) {
      current = current.nextNode;
    }

    current.nextNode = null;
    this.size--;
    return current;
  }

  find(val) {
    let res = 1;
    let current = this.head;
    while (current) {
      if (current.value === val) {
        return res;
      }
      res++;
      current = current.nextNode;
    }

    return -1;
  }

  contains(val) {
    let current = this.head;

    while (current) {
      if (current.value == val) {
        return true;
      }
      current = current.nextNode;
    }

    return false;
  }

  removeAt(index) {}

  insertAt(value, index) {
    const newNode = new Node(value);

    let current = this.head;
    let prev = this.head;

    for (let i = 1; i < index; i++) {
      current = current.nextNode;
    }

    for (let i = 1; i < index - 1; i++) {
      prev = prev.nextNode;
    }

    prev.nextNode = newNode;
    newNode.nextNode = current;

    return newNode;
  }

  removeAt(index) {
    let current = this.head;
    let prev = this.head;

    for (let i = 1; i < index; i++) {
      current = current.nextNode;
    }

    for (let i = 1; i < index - 1; i++) {
      prev = prev.nextNode;
    }

    prev.nextNode = current.nextNode;
  }
}

let lst = new LinkedList();

lst.append("amit");
lst.append("parth");
lst.append("om");
lst.append("aniket");
lst.append("sara");

console.log(lst.head);

lst.prepend("akash");
console.log(lst.head);

console.log(lst.size);

lst.toString();

console.log(lst.getHead());
console.log(lst.getTail());

console.log(lst.at(2).value);

console.log(lst.pop());

console.log(lst.getSize());
lst.toString();

console.log(lst.find("aniket"));

console.log(lst.contains("akash"));

lst.insertAt("rushi", 2);
lst.toString();
lst.insertAt("chetan", 4);

lst.toString();

lst.removeAt(2);
lst.toString();

/////////

// example uses class syntax - adjust as necessary
const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

list.toString();
