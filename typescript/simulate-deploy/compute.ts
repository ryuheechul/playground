import { Code } from "./repo.ts";
import { Database } from "./database.ts";

export enum RequestType {
  Read,
  Update,
}

export class Compute {
  constructor(private database: Database, private code: Code) {}

  request(type: RequestType) {
    return {
      [RequestType.Read]: () => this.database.read(),
      [RequestType.Update]: () => this.code.runWith(this.database),
    }[type]();
  }
}
