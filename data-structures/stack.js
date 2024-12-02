class Stack {
  constructor() {
    this.items = [];
  }

  add(item) {
    this.items.push({ item });
  }

  remove() {
    if (this.items.length === 0) return null;
    return this.items.pop();
  }

  clear() {
    this.items = [];
  }
}

export const stack = new Stack();
