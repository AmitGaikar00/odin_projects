class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree([...new Set(arr)].sort((a, b) => a - b));
  }

  buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);
    let root = new Node(arr[mid]);

    root.left = this.buildTree(arr, start, mid - 1);
    root.right = this.buildTree(arr, mid + 1, end);

    return root;
  }

  insert(node, value) {
    if (node === null) return new Node(value);

    if (value < node.data) {
      node.left = this.insert(node.left, value);
    } else if (value > node.data) {
      node.right = this.insert(node.right, value);
    }

    return node;
  }

  levelOrder(callback) {
    if (!callback) throw new Error("callback is required");

    let queue = [this.root];

    while (queue.length > 0) {
      let current = queue.shift();
      callback(current.data);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }

  inOrder(node, callback) {
    if (!node) return;
    this.inOrder(node.left, callback);
    callback(node.data);
    this.inOrder(node.right, callback);
  }

  preOrder(node, callback) {
    if (!node) return;
    callback(node.data);
    this.preOrder(node.left, callback);
    this.preOrder(node.right, callback);
  }

  postOrder(node, callback) {
    if (!node) return;
    this.postOrder(node.left, callback);
    this.postOrder(node.right, callback);
    callback(node.data);
  }

  height(node) {
    if (node === null) return 0;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  isBalanced(node = this.root) {
    if (!node) return true;
    let lh = this.height(node.left);
    let rh = this.height(node.right);
    if (Math.abs(lh - rh) > 1) return false;
    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  rebalance() {
    let values = [];
    this.inOrder(this.root, (data) => values.push(data));
    this.root = this.buildTree(values);
  }
}

// Pretty print utility
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) return;
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// Random number generator
const getRandomArray = (length = 15) => {
  let arr = [];
  while (arr.length < length) {
    let num = Math.floor(Math.random() * 100);
    if (!arr.includes(num)) arr.push(num);
  }
  return arr;
};

// Driver script
console.log("🔧 Creating BST from random numbers < 100");
let randomArray = getRandomArray();
let tree = new Tree(randomArray);

console.log("🔍 Is balanced initially?", tree.isBalanced());
console.log("🌳 Tree Structure:");
prettyPrint(tree.root);

// Traversals
console.log("\n📚 Level Order:");
tree.levelOrder((val) => console.log(val));

console.log("\n📚 Pre Order:");
tree.preOrder(tree.root, (val) => console.log(val));

console.log("\n📚 Post Order:");
tree.postOrder(tree.root, (val) => console.log(val));

console.log("\n📚 In Order:");
tree.inOrder(tree.root, (val) => console.log(val));

// Unbalancing the tree
console.log("\n⚠️ Inserting large numbers to unbalance the tree...");
[110, 120, 130, 140, 150].forEach((val) => {
  tree.root = tree.insert(tree.root, val);
});

console.log("🔍 Is balanced after insertion?", tree.isBalanced());
console.log("🌳 Unbalanced Tree Structure:");
prettyPrint(tree.root);

// Rebalancing
console.log("\n🛠️ Rebalancing the tree...");
tree.rebalance();

console.log("🔍 Is balanced after rebalance?", tree.isBalanced());
console.log("🌳 Rebalanced Tree Structure:");
prettyPrint(tree.root);

// Traversals after rebalance
console.log("\n📚 Level Order:");
tree.levelOrder((val) => console.log(val));

console.log("\n📚 Pre Order:");
tree.preOrder(tree.root, (val) => console.log(val));

console.log("\n📚 Post Order:");
tree.postOrder(tree.root, (val) => console.log(val));

console.log("\n📚 In Order:");
tree.inOrder(tree.root, (val) => console.log(val));
