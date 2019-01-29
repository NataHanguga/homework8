import { Injectable, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { User } from './user';
import 'rxjs/add/operator/map';
import { CookieService } from 'ngx-cookie-service';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  headers: HttpHeaders;
  options: RequestOptions;

  name: string;
  password: string;
  link = 'https://lectorium.herokuapp.com/api/login';
  linkRegistration = 'https://lectorium.herokuapp.com/api/registration';
  token: any;
 // url = 'https://lectorium.herokuapp.com/api/todolist';
  user: User;


  constructor(private router: Router,
              private http: HttpClient,
              private cookieService: CookieService) {}

    public getCookie() {
      return 'eyJhbGciOiJIUzI1NiJ9.bmV3dGVzdHVzZXJfbmV3dGVzdHBhc3M.6G0GjokS52wciQthCjbg1lxIBc_2euvZjhgw5igtZ8Y';
    }

  loginUser() {
    if (this.name === 'test' && this.password === 'admin') {
      this.router.navigate(['user']);
    }
  }

   public loginToken(data): Observable<User> {
    const body = JSON.stringify(data);
     return this.http.post<User>(this.link, body, {observe: 'body', responseType: 'json'});
   }

   public registerToken(data): Observable<User> {
     const body = JSON.stringify(data);
     return this.http.post<User>(this.linkRegistration, body);
   }

   public updateToken(data: User): Observable<User> {
     const options = {headers: new HttpHeaders ({
      'x-apikey': 'eyJhbGciOiJIUzI1NiJ9.dGVzdDFfYWRtaW4.j210uMqQxhPgKiGSV6b-ie71cBRXOACT1qLEbhUkDfk',
      'Content-Type': 'application/json'
   })};
  //  const options = new RequestOptions({headers: headers});
    // const body = JSON.stringify(data);
    // console.log(body);
    const link = 'https://lectorium.herokuapp.com/api/user';
    return this.http.put<User>(link, data, options);
  }


}
