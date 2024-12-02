import { Router } from "express";
import { stack } from "../data-structures/stack.js";
import { LIFO_ROUTER_MESSAGES } from "../messages.js";

export const LIFORouter = Router();

LIFORouter.post("/add", (req, res) => {
  const { item } = req.body;
  if (!item) {
    res.status(400).json({ message: LIFO_ROUTER_MESSAGES.ERROR });
    return;
  }
  stack.add(item);
  res.json({ message: LIFO_ROUTER_MESSAGES.SUCCESS, item });
});

LIFORouter.get("/remove", (req, res) => {
  const item = stack.remove();
  res.json({
    message: item ? LIFO_ROUTER_MESSAGES.REMOVED : LIFO_ROUTER_MESSAGES.EMPTY,
    item,
  });
});
