import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Todo } from './todo';
import { tokenKey } from '@angular/core/src/view';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  url = 'https://lectorium.herokuapp.com/api/todolist';

  constructor(private http: HttpClient) {}

  public getTodo(token): Observable < Todo > {
    const headers = new HttpHeaders({
      'x-apikey': token
    });

    return this.http
      .get < Todo > (this.url, { headers });
  }

  public createTodo(data, token): Observable < Todo > {
    const link = 'https://lectorium.herokuapp.com/api/todolist';
    const headers = new HttpHeaders({
      'x-apikey': token,
      'Content-Type': 'application/json'
    });
    const body = JSON.stringify(data);
    return this.http
      .post < Todo > (link, body, { headers });
  }

  public deleteTodo(id: string, token): Observable < null > {
    const link = 'https://lectorium.herokuapp.com/api/todolist/';
    const headers = new HttpHeaders({
      'x-apikey': token
    });
    return this.http
      .delete(link + id, { headers})
      .map(res => null);
  }

  public updateTodo(data: Todo, token): Observable<Todo> {
    const link = 'https://lectorium.herokuapp.com/api/todolist/' + data._id;
    const options = {headers: new HttpHeaders ({
      'x-apikey': token,
      'Content-Type': 'application/json'
    })};
    delete data._id;
    return this.http.put<Todo>(link, data, options); // .map(res => data as Todo);
  }

}
