import { Compute } from "./compute.ts";
import { Database } from "./database.ts";
import { Branch } from "./repo.ts";

interface ComputeDictionary {
  [index: string]: Compute;
}

interface DatabaseDictionary {
  [index: string]: Database;
}

const computes: ComputeDictionary = {};
const dbs: DatabaseDictionary = {};

const dbTemplate = new Database(42);

// this is essentially "singleton"
export class Cloud {
  static list() {
    return Object.values(computes);
  }

  static computeForBranch(branch: Branch) {
    return computes[branch.name];
  }

  // this also free database
  static freeCompute(branch: Branch) {
    delete dbs[branch.name];
    delete computes[branch.name];
  }

  // this also fork database
  static issueCompute(branch: Branch) {
    let db = dbs[branch.name];
    let compute = computes[branch.name];

    // only create if it doesn't exist already
    if (!db) {
      db = dbTemplate.clone();
    }

    // only create if it doesn't exist already
    if (!compute) {
      compute = new Compute(db, branch.code);
    }

    dbs[branch.name] = db;
    computes[branch.name] = compute;

    return compute;
  }
}
