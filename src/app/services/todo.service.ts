import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  url = 'https://lectorium.herokuapp.com/api/todolist';
  public size;
  public key;
  lastId = JSON.stringify(new Date());
  todos: Todo[] = [];

  constructor(private http: HttpClient) {}

  public getTodo(): Observable < Todo > {
    const headers = new HttpHeaders({
      'x-apikey': 'eyJhbGciOiJIUzI1NiJ9.bmV3dGVzdHVzZXJfbmV3dGVzdHBhc3M.6G0GjokS52wciQthCjbg1lxIBc_2euvZjhgw5igtZ8Y'
    });

    return this.http
      .get < Todo > (this.url, {
        headers: headers
      });
  }

  public createTodo(data): Observable < Todo > {
    const link = 'https://lectorium.herokuapp.com/api/todolist';
    const headers = new HttpHeaders({
      'x-apikey': 'eyJhbGciOiJIUzI1NiJ9.bmV3dGVzdHVzZXJfbmV3dGVzdHBhc3M.6G0GjokS52wciQthCjbg1lxIBc_2euvZjhgw5igtZ8Y',
      'Content-Type': 'application/json'
    });
    const body = JSON.stringify(data);
    return this.http
      .post < Todo > (link, body, {
        headers: headers
      });
  }

  public deleteTodo(id: string): Observable < null > {
    const link = 'https://lectorium.herokuapp.com/api/todolist/';
    const headers = new HttpHeaders({
      'x-apikey': 'eyJhbGciOiJIUzI1NiJ9.bmV3dGVzdHVzZXJfbmV3dGVzdHBhc3M.6G0GjokS52wciQthCjbg1lxIBc_2euvZjhgw5igtZ8Y'
    });
    return this.http
      .delete(link + id, {
        headers: headers
      })
      .map(res => null);
  }

  public updateTodo(data: Todo): Observable<Todo> {
    const link = 'https://lectorium.herokuapp.com/api/todolist/' + data['_id'];
    const options = {headers: new HttpHeaders ({
      'x-apikey': 'eyJhbGciOiJIUzI1NiJ9.bmV3dGVzdHVzZXJfbmV3dGVzdHBhc3M.6G0GjokS52wciQthCjbg1lxIBc_2euvZjhgw5igtZ8Y',
      'Content-Type': 'application/json'
    })};
    delete data._id;
    return this.http.put<Todo>(link, data, options); // .map(res => data as Todo);
  }

}
