import { Todo } from './todo';

export class User {
  constructor(
  public firstName: string,
  public lastName: string,
  public email: string,
  public phone: number,
  public password: string,
  public id: string = 'eyJhbGciOiJIUzI1NiJ9.bmV3dGVzdHVzZXJfbmV3dGVzdHBhc3M.6G0GjokS52wciQthCjbg1lxIBc_2euvZjhgw5igtZ8Y',
  public todoList: Object = {
    todoItem:  Todo
  }
  ) {}
}
