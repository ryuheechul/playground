export class Database {
  constructor(private data: number) {
  }

  read() {
    return this.data;
  }

  update(data: number) {
    this.data = data;
    return this.data;
  }

  clone() {
    return new Database(this.data);
  }
}
