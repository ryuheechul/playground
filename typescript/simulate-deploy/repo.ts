import { Database } from "./database.ts";
import { Cloud } from "./cloud.ts";

const branches: Branch[] = [];
const pullRequests: Branch[] = [];

// this is essentially "singleton"
export class Repo {
  static list() {
    return branches;
  }

  static defaultBranch() {
    let branch;

    if (branches.length) {
      branch = branches[0];
    } else {
      branch = new Branch("main", new Code(CodeType.Up));
      this.push(branch);
    }

    return branch;
  }

  static defaultCompute() {
    const defaultBranch = Repo.defaultBranch();
    let compute = Cloud.computeForBranch(defaultBranch);
    if (!compute) {
      compute = Cloud.issueCompute(defaultBranch);
    }
    return compute;
  }

  static push(branch: Branch) {
    let branchToBePushed = branch;

    // handle same branch duplication/conflicts
    const filtered = branches.filter((b) => b.name == branch.name);

    if (filtered.length) {
      const existingBranch = filtered[0];
      branchToBePushed = existingBranch;
      branchToBePushed.code = branch.code;
    }

    branches.push(branchToBePushed);
    return branchToBePushed;
  }

  static openPR(branch: Branch) {
    let branchToBeOpened = this.push(branch);

    const filtered = pullRequests.filter((p) =>
      p.name == branchToBeOpened.name
    );

    // use existing PR if already exist
    if (filtered.length) {
      branchToBeOpened = filtered[0];
    } else {
      pullRequests.push(branchToBeOpened);
    }

    return Cloud.issueCompute(branchToBeOpened);
  }

  static closePR(branch: Branch) {
    const filtered = pullRequests.filter((p) => p.name == branch.name);

    if (filtered.length) {
      const branchToBeClosed = filtered[0];
      Cloud.freeCompute(branchToBeClosed);
    }
  }

  static merge(branch: Branch) {
    const defaultBranch = Repo.defaultBranch();
    defaultBranch.code = branch.code;

    Repo.closePR(branch);

    return Repo.defaultCompute();
  }
}

export enum CodeType {
  Up,
  Down,
}

interface Runner {
  (x: number): number;
}

export class Code {
  constructor(public readonly type: CodeType) {}

  runWith(database: Database) {
    const data = database.read();

    const runner: Runner = {
      [CodeType.Up]: (data: number) => ++data,
      [CodeType.Down]: (data: number) => --data,
    }[this.type];

    const result = runner(data);
    return database.update(result);
  }
}

export class Branch {
  constructor(
    public readonly name: string,
    public code: Code,
  ) {}

  clone(name: string) {
    return new Branch(name, this.code);
  }
}
