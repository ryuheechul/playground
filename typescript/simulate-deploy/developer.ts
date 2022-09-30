import { RequestType } from "./compute.ts";
import { Branch, Repo } from "./repo.ts";

export class Developer {
  private activeBranch: Branch;

  constructor(public readonly name: string) {
    this.activeBranch = Repo.defaultBranch();
  }

  fork(name: string) {
    const newBranch = this.activeBranch.clone(name);

    this.activeBranch = newBranch;

    return newBranch;
  }

  pullRequest(branch: Branch) {
    const compute = Repo.openPR(branch);

    const test = () => compute.request(RequestType.Read);

    const result = test();

    console.info(`initial test result is ${result}`);

    return compute;
  }
}
