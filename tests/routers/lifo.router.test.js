import request from "supertest";
import { app, server } from "../../index.js";
import { LIFO_ROUTER_MESSAGES } from "../../messages.js";
import { stack } from "../../data-structures/stack.js";

describe("lifo router", () => {
  beforeEach(() => {
    stack.clear();
  });

  describe("add new item", () => {
    const item = "test";

    it("should add new key", async () => {
      const response = await request(app).post("/lifo/add").send({ item });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe(LIFO_ROUTER_MESSAGES.SUCCESS);
      expect(response.body.item).toBe(item);
    });

    it("should return an error when item is not provided", async () => {
      const response = await request(app).post("/lifo/add");
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(LIFO_ROUTER_MESSAGES.ERROR);
    });
  });

  describe("remove item", () => {
    const item = "test";

    beforeEach(() => {
      stack.add(item);
    });

    it("should remove item", async () => {
      const deleteItemResponse = await request(app).get("/lifo/remove");
      expect(deleteItemResponse.status).toBe(200);
      expect(deleteItemResponse.body.message).toBe(
        LIFO_ROUTER_MESSAGES.REMOVED,
      );
      expect(deleteItemResponse.body.item).toStrictEqual({ item });
    });
  });

  afterAll(() => {
    server.close();
  });
});
