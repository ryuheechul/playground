import { assertEquals } from "./deps.ts";
import { Repo } from "./repo.ts";
import { Cloud } from "./cloud.ts";
import { Compute } from "./compute.ts";
import { Database } from "./database.ts";
import { Developer } from "./developer.ts";

// deno-lint-ignore no-explicit-any
function assertExists(a: any) {
  assertEquals(a, a);
}

Deno.test("test existence", () => {
  assertExists(Repo);
  assertExists(Cloud);
  assertExists(Compute);
  assertExists(Database);
  assertExists(Developer);
});
