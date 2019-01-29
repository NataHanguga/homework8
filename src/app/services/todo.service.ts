import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Todo } from './todo';
import { tap } from 'rxjs/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  url = 'https://lectorium.herokuapp.com/api/todolist/';
  public size ;
  public key;
  lastId = JSON.stringify(new Date());
  todos: Todo[] = [];

  constructor(private http: HttpClient) { }

  public getTodo(): Observable<Todo> {
    const headers = new HttpHeaders ({
       'x-apikey': 'eyJhbGciOiJIUzI1NiJ9.bmV3dGVzdHVzZXJfbmV3dGVzdHBhc3M.6G0GjokS52wciQthCjbg1lxIBc_2euvZjhgw5igtZ8Y'
    });

    return this.http
      .get<Todo>(this.url, {headers: headers});
  }

  public getTodoById(id: string): Observable<Todo> {
    const headers = new HttpHeaders ({
      'x-apikey': 'eyJhbGciOiJIUzI1NiJ9.bmV3dGVzdHVzZXJfbmV3dGVzdHBhc3M.6G0GjokS52wciQthCjbg1lxIBc_2euvZjhgw5igtZ8Y'
   });

   return this.http
     .get<Todo>(this.url, {headers: headers});

  }

  public objectLength(obj: Object) {
    this.size = 0;
    for (this.key in obj) {
      if (obj.hasOwnProperty(this.key)) {
        this.size ++;
      }
    }
    return this.size;
  }
  public createTodo(data): Observable<Todo> {
    const link = 'https://lectorium.herokuapp.com/api/todolist';
    const headers = new HttpHeaders ({
      'x-apikey': 'eyJhbGciOiJIUzI1NiJ9.bmV3dGVzdHVzZXJfbmV3dGVzdHBhc3M.6G0GjokS52wciQthCjbg1lxIBc_2euvZjhgw5igtZ8Y',
      'Content-Type': 'application/json'
   });
    const body = JSON.stringify(data);
    return this.http
      .post<Todo>(link, body, {headers: headers});
  }

  public randomId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,*/';

    for (let i = 0; i < 15; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  public deleteTodo(id: string): Observable<null> {
    const link = 'https://lectorium.herokuapp.com/api/todolist/';
    const headers = new HttpHeaders ({
      'x-apikey': 'eyJhbGciOiJIUzI1NiJ9.bmV3dGVzdHVzZXJfbmV3dGVzdHBhc3M.6G0GjokS52wciQthCjbg1lxIBc_2euvZjhgw5igtZ8Y'
   });
    return this.http
      .delete(link + id, {headers: headers})
      .map(res => null);
  }

public updateTodo(data: Todo, id: string): Observable<Todo> {
  const link = 'https://lectorium.herokuapp.com/api/todolist/5c2e8ee176291223caf39f83';
  const headers = new HttpHeaders ({
    'x-apikey': 'eyJhbGciOiJIUzI1NiJ9.bmV3dGVzdHVzZXJfbmV3dGVzdHBhc3M.6G0GjokS52wciQthCjbg1lxIBc_2euvZjhgw5igtZ8Y',
    'Content-Type': 'application/json'
 });
  return this.http
    .put<Todo>(link + '/todo/' + id, data, {headers: headers})
    .map(res => new Todo());
}

  /*  public registerToken(data): Observable<User> {
     const body = JSON.stringify(data);
     return this.http.post<User>(this.linkRegistration, body);
   } */
/*
  addTodo(todo: Todo): TodoService {
    if (!todo.id) {
      todo.id = this.lastId;
    }
    this.todos.push(todo);
    return this;
  }

  deleteTodoById(id: string): TodoService {
    this.todos = this.todos
      .filter(todo => todo.id !== id);
    return this;
  }

  updateTodoById(id: string, values: Object = {}): Todo {
    const todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  getAllTodos(): Todo[] {
    return this.todos;
  }

  getTodoById(id: string): Todo {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  toggleTodoComplete(todo: Todo) {
    const updatedTodo = this.updateTodoById(todo.id, {
      status: !todo.status
    });
    return updatedTodo;
  }*/
}
