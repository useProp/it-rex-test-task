class TTLMap {
  constructor() {
    this.store = new Map();
    this.timers = new Map();
  }

  add(key, value, ttl = null) {
    let expiration;

    if (ttl) {
      expiration = Date.now() + ttl;
      const timerId = setTimeout(() => {
        this.timers.delete(key);
        this.store.delete(key);
      }, ttl);
      this.timers.set(key, timerId);
    }

    this.store.set(key, { value, expiration });
  }

  get(key) {
    const item = this.store.get(key);

    if (!item) return null;

    if (item.expiration && item.expiration < Date.now()) {
      this.store.delete(key);
      return null;
    }

    return item;
  }

  delete(key) {
    const timerId = this.timers.get(key);
    clearTimeout(timerId);
    this.timers.delete(key);
    return this.store.delete(key);
  }

  clear() {
    this.store.clear();
  }
}

export const map = new TTLMap();
