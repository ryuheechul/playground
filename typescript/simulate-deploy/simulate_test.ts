import { Cloud } from "./cloud.ts";
import { Compute, RequestType } from "./compute.ts";
import { assertEquals } from "./deps.ts";
import {
  closePRs,
  createDeveloper,
  forkAnother,
  prepareRC,
  releaseProduction,
} from "./simulate.ts";

Deno.test("Simulate typical workflow", async (t) => {
  await t.step("create a developer", () => {
    const { name, developer } = createDeveloper();
    assertEquals(developer.name, name);
  });

  await t.step("prepare release candidate", () => {
    const { initial, after } = prepareRC();
    assertEquals(initial + 1, after);
  });

  let resultAfterProductionRelease: number;
  let prod: Compute;

  await t.step("release production", () => {
    const { initial, after, prod: prodFromRelease } = releaseProduction();

    assertEquals(initial + 1, after);

    // save these for next test
    resultAfterProductionRelease = after;
    prod = prodFromRelease;
  });

  await t.step("open another PR", () => {
    const { initial, after } = forkAnother();

    assertEquals(initial - 1, after);

    // "production" still stays untouched from other forks
    assertEquals(
      prod.request(RequestType.Update),
      resultAfterProductionRelease + 1,
    );
  });

  await t.step("close PRs", () => {
    closePRs();
    // only prod compute is running after closing all PRs
    assertEquals(Cloud.list().length, 1);
  });
});
