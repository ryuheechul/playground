import { Developer } from "./developer.ts";
import { Branch, Code, CodeType, Repo } from "./repo.ts";
import { RequestType } from "./compute.ts";

let developer: Developer;
let rcBranch: Branch;
let anotherBranch: Branch;

export function createDeveloper() {
  const name = "H";
  developer = new Developer(name);

  return { name, developer };
}

export function prepareRC() {
  const name = "rc";
  rcBranch = developer.fork(name);
  const rc = developer.pullRequest(rcBranch);

  const initial = rc.request(RequestType.Read);
  const after = rc.request(RequestType.Update);

  return { initial, after };
}

export function releaseProduction() {
  const prod = Repo.merge(rcBranch);

  const initial = prod.request(RequestType.Read);
  const after = prod.request(RequestType.Update);
  return { initial, after, prod };
}

export function forkAnother() {
  anotherBranch = developer.fork("fork-1");
  anotherBranch.code = new Code(CodeType.Down);

  const newCompute = developer.pullRequest(anotherBranch);

  const initial = newCompute.request(RequestType.Read);
  const after = newCompute.request(RequestType.Update);
  return { initial, after };
}

export function closePRs() {
  [rcBranch, anotherBranch]
    .forEach((b) => Repo.closePR(b));
}
