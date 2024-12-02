class Stack {
	constructor() {
		this.items = [];
		this.id = 1;
	}

	add(item) {
		this.items.push({ id: this.id++, item });
	}

	remove() {
		if (this.items.length === 0) return null;
		this.id >= 0 && this.id--;
		return this.items.pop();
	}

	clear() {
		this.items = [];
		this.id = 1;
	}
}

export const stack = new Stack();