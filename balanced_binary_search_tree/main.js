class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);
    let root = new Node(arr[mid]);

    if (!this.root) {
      this.root = root;
    }

    root.left = this.buildTree(arr, start, mid - 1);
    root.right = this.buildTree(arr, mid + 1, end);

    return root;
  }

  insert(node, value) {
    let current = node;
    let parent = null;
    let newNode = new Node(value);

    if (!current) {
      return newNode;
    }

    while (current) {
      parent = current;
      if (current.data < value) {
        current = current.right;
      } else {
        current = current.left;
      }
    }

    if (parent.data < value) {
      parent.right = newNode;
    } else {
      parent.left = newNode;
    }

    return newNode;

    // if (node === null) {
    //   return new Node(value);
    // }

    // if (node.data < value) {
    //   node.right = this.insert(node.right, value);
    // } else {
    //   node.left = this.insert(node.left, value);
    // }

    // return node;
  }
  deleteItem(node, value) {
    if (!node) {
      return node;
    }

    if (node.data < value) {
      node.right = this.deleteItem(node.right, value);
    } else if (node.data > value) {
      node.left = this.deleteItem(node.left, value);
    } else {
      // when node matches
      if (!node.left) {
        return node.right;
      }

      if (!node.right) {
        return node.left;
      }

      // when both childes are there

      let succ = this.getSuccessor(node);

      node.data = succ.data;
      node.right = this.deleteItem(node.right, succ.data);
    }

    return node;
  }

  getSuccessor(node) {
    node = node.right;

    while (node !== null && node.left !== null) {
      node = node.left;
    }
    return node;
  }

  find(value) {
    let current = this.root;

    while (current) {
      if (current.data > value) {
        current = current.left;
      } else if (current.data < value) {
        current = current.right;
      } else {
        return current;
      }
    }

    return -1;
  }

  levelOrder(callback) {
    if (!callback) {
      throw new Error("callback is required");
    }

    let que = [];
    let current = this.root;

    que.push(current);

    while (que.length !== 0) {
      let front = que.shift();

      callback(front.data);
      if (front.left) que.push(front.left);
      if (front.right) que.push(front.right);
    }
  }

  inOrder(node, callback) {
    if (!callback) {
      throw new Error("Callback is Required");
    }

    if (!node) return null;

    this.inOrder(node.left, callback);
    callback(node.data);
    this.inOrder(node.right, callback);
  }
  preOrder(node, callback) {
    if (!callback) {
      throw new Error("Callback is Required");
    }

    if (!node) return null;

    callback(node.data);
    this.preOrder(node.left, callback);
    this.preOrder(node.right, callback);
  }
  postOrder(node, callback) {
    if (!callback) {
      throw new Error("Callback is Required");
    }

    if (!node) return null;

    this.postOrder(node.left, callback);
    this.postOrder(node.right, callback);
    callback(node.data);
  }

  depth(value) {
    let current = this.root;
    let count = 1;

    while (current) {
      if (current.data > value) {
        current = current.left;
        count++;
      } else if (current.data < value) {
        current = current.right;
        count++;
      } else {
        return count;
      }
    }

    return 0;
  }

  height(value) {
    let current = this.root;
    let count = 0;

    while (current) {
      if (current.data > value) {
        current = current.left;
        count++;
      } else if (current.data < value) {
        current = current.right;
        count++;
      } else {
        return count;
      }
    }

    return 0;
  }

  height2(node) {
    if (node === null) return 0;

    // Height = 1 + max of left height and right heights
    return 1 + Math.max(this.height2(node.left), this.height2(node.right));
  }

  isBalanced(node) {
    if (!node) return true;

    let lhight = this.height2(node.left);
    let rhight = this.height2(node.right);

    if (Math.abs(lhight - rhight) > 1) {
      return false;
    }

    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let bst = new Tree();
let input = [45, 7, 3, 6, 4, 2, 67, 75];
input.sort((a, b) => a - b); // very important!

let node = bst.buildTree(input); // now works as intended
prettyPrint(bst.root);
console.log("Balanced:", bst.isBalanced(bst.root));
