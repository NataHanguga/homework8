export class Todo {
  public _id: string;
  public userId: string;
  public title: string;
  public description: string;
  public status: string;
  public selected: boolean;

  constructor(values = {}) {
    Object.assign(this, values);
  }
}
