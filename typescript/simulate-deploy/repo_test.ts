import { assertEquals } from "./deps.ts";
import { Branch, Code, CodeType, Repo } from "./repo.ts";

Deno.test("Repo class", async (t) => {
  await t.step("empty list", () => {
    assertEquals(Repo.list(), []);
  });

  const branch = new Branch(
    "main",
    new Code(CodeType.Up),
  );

  Repo.push(branch);

  await t.step("simple list", () => {
    assertEquals(Repo.list(), [branch]);
  });
});
