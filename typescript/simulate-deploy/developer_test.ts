import { assertEquals } from "./deps.ts";
import { Developer } from "./developer.ts";
import { Branch, Code, CodeType } from "./repo.ts";
import { Compute, RequestType } from "./compute.ts";

Deno.test("Developer class", async (t) => {
  const developer = new Developer("H");

  await t.step("make sure a developer", () => {
    assertEquals(developer.name, "H");
  });

  let branch: Branch;
  let firstPR: Compute;
  await t.step("fork a branch", () => {
    branch = developer.fork("fork-1");
    assertEquals(branch.name, "fork-1");
  });

  await t.step("open a pull request", () => {
    firstPR = developer.pullRequest(branch);

    assertEquals(firstPR.request(RequestType.Update), 43);
  });

  await t.step("open another PR", () => {
    const newBranch = developer.fork("fork-2");
    newBranch.code = new Code(CodeType.Down);

    const newCompute = developer.pullRequest(newBranch);

    // new "fork-2" branch now has isolated compute unit that works separately than rest than "fork-1"
    assertEquals(newCompute.request(RequestType.Update), 41);

    // "fork-1" still stays untouched
    assertEquals(firstPR.request(RequestType.Read), 43);
  });
});
