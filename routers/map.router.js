import { Router } from "express";
import { map } from "../data-structures/map.js";
import { MAP_ROUTER_MESSAGES } from "../messages.js";

export const mapRouter = Router();

mapRouter.post("/add", (req, res) => {
  const { key, value, ttl } = req.body;
  if (!key || !value) {
    res.status(400).json({ message: MAP_ROUTER_MESSAGES.ERROR });
    return;
  }
  map.add(key, value, ttl);
  res.json({ message: MAP_ROUTER_MESSAGES.SUCCESS });
});

mapRouter.get("/get/:key", (req, res) => {
  const { key } = req.params;
  const item = map.get(key);
  res.json({ item });
});

mapRouter.delete("/remove/:key", (req, res) => {
  const { key } = req.params;
  if (!key) {
    res.status(400).json({ message: MAP_ROUTER_MESSAGES.KEY_ERROR });
    return;
  }
  res.json({
    message: map.delete(key)
      ? MAP_ROUTER_MESSAGES.REMOVED(key)
      : MAP_ROUTER_MESSAGES.NOT_FOUND,
  });
});
