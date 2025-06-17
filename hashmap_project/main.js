class HashMap {
  constructor() {
    this.entriesCount = 0;
    this.capacity = 16;
    this.buckets = new Array(this.capacity);
  }

  getLoadFactor() {
    return this.entriesCount / this.capacity;
  }

  hash(key) {
    let hashCode = 0;
    const prime = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = prime * hashCode + key.charCodeAt(i);
    }
    return Math.abs(hashCode % this.capacity);
  }

  resizeAndRehash() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity);
    this.entriesCount = 0;

    for (const bucket of oldBuckets) {
      if (bucket) {
        for (const [key, value] of bucket) {
          this.set(key, value);
        }
      }
    }
  }

  set(key, value) {
    if (this.getLoadFactor() >= 0.75) {
      this.resizeAndRehash();
    }

    const index = this.hash(key);
    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    const bucket = this.buckets[index];
    for (const pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value; // update
        return;
      }
    }

    bucket.push([key, value]);
    this.entriesCount++;
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    if (!bucket) return null;

    for (const [k, v] of bucket) {
      if (k === key) return v;
    }
    return null;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    if (!bucket) return false;

    for (const [k] of bucket) {
      if (k === key) return true;
    }
    return false;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    if (!bucket) return false;

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.entriesCount--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.entriesCount;
  }

  clear() {
    this.buckets = new Array(this.capacity);
    this.entriesCount = 0;
  }

  keys() {
    const keys = [];
    for (const bucket of this.buckets) {
      if (bucket) {
        for (const [key] of bucket) {
          keys.push(key);
        }
      }
    }
    return keys;
  }

  values() {
    const values = [];
    for (const bucket of this.buckets) {
      if (bucket) {
        for (const [, value] of bucket) {
          values.push(value);
        }
      }
    }
    return values;
  }

  allEntries() {
    const entries = [];
    for (const bucket of this.buckets) {
      if (bucket) {
        for (const [key, value] of bucket) {
          entries.push([key, value]);
        }
      }
    }
    return entries;
  }

  getHashKeys() {
    const keys = [];
    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];
      if (bucket) {
        for (const [key] of bucket) {
          keys.push(i); // hashed index
        }
      }
    }
    return keys;
  }
}

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("pine_apple", "yellow");

console.log("Buckets:", test.buckets);
console.log("Entry Count:", test.length());
console.log("Capacity:", test.capacity);

console.log("Get 'lion':", test.get("lion"));
console.log("Has 'lion':", test.has("lion"));
console.log("Has 'amit':", test.has("amit"));
console.log("All keys:", test.keys());
console.log("All values:", test.values());
console.log("All entries:", test.allEntries());
console.log("Hash indexes:", test.getHashKeys());

test.remove("lion");
console.log("After removing 'lion':", test.get("lion"));

console.log("Load Factor:", test.getLoadFactor());

class HashSet {
  constructor() {
    this.entriesCount = 0;
    this.capacity = 16;
    this.buckets = new Array(this.capacity);
  }

  getLoadFactor() {
    return this.entriesCount / this.capacity;
  }

  hash(key) {
    let hashCode = 0;
    const prime = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = prime * hashCode + key.charCodeAt(i);
    }
    return Math.abs(hashCode % this.capacity);
  }

  resizeAndRehash() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity);
    this.entriesCount = 0;

    for (const bucket of oldBuckets) {
      if (bucket) {
        for (const key of bucket) {
          this.add(key);
        }
      }
    }
  }

  add(key) {
    if (this.getLoadFactor() >= 0.75) {
      this.resizeAndRehash();
    }

    const index = this.hash(key);
    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    const bucket = this.buckets[index];
    for (const existingKey of bucket) {
      if (existingKey === key) {
        return; // Key already exists
      }
    }

    bucket.push(key);
    this.entriesCount++;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    if (!bucket) return false;

    return bucket.includes(key);
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    if (!bucket) return false;

    const keyIndex = bucket.indexOf(key);
    if (keyIndex !== -1) {
      bucket.splice(keyIndex, 1);
      this.entriesCount--;
      return true;
    }

    return false;
  }

  clear() {
    this.buckets = new Array(this.capacity);
    this.entriesCount = 0;
  }

  size() {
    return this.entriesCount;
  }

  values() {
    const keys = [];
    for (const bucket of this.buckets) {
      if (bucket) {
        keys.push(...bucket);
      }
    }
    return keys;
  }

  getHashIndexes() {
    const indexes = [];
    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];
      if (bucket) {
        for (const _ of bucket) {
          indexes.push(i);
        }
      }
    }
    return indexes;
  }
}
