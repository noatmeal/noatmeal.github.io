import { expect, test } from "vitest";
import { hello_world, HELLO_WORLD } from "./scripts.ts";

test("Should return hello_world", () => {
  expect(hello_world()).toBe(HELLO_WORLD);
});
