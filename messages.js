export const LIFO_ROUTER_MESSAGES = {
  SUCCESS: "added",
  ERROR: "no item provided",
  REMOVED: "removed",
  EMPTY: "no items in stack",
};

export const MAP_ROUTER_MESSAGES = {
  ERROR: "key and value must be provided",
  SUCCESS: "added",
  KEY_ERROR: "key must be provided",
  NOT_FOUND: "Item not found",
  REMOVED: (key) => `item with the key ${key} was deleted`,
};
