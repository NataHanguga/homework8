import {
  Injectable,
  NgModule,
  EventEmitter
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  Observable
} from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpRequest
} from '@angular/common/http';
import {
  User
} from './user';
import 'rxjs/add/operator/map';
import {
  CookieService
} from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  headers: HttpHeaders;
  // options: HttpRequest;

  name: string;
  password: string;
  link = 'https://lectorium.herokuapp.com/api/login';
  linkRegistration = 'https://lectorium.herokuapp.com/api/registration';
  token: any;
  // url = 'https://lectorium.herokuapp.com/api/todolist';
  user: User;
  onLogin = false;

  constructor(private router: Router,
              private http: HttpClient,
              private cookieService: CookieService) {}

  public getCookie() {
    return 'eyJhbGciOiJIUzI1NiJ9.bmV3dGVzdHVzZXJfbmV3dGVzdHBhc3M.6G0GjokS52wciQthCjbg1lxIBc_2euvZjhgw5igtZ8Y';
  }

  public loginToken(data): Observable < User > {
    const body = JSON.stringify(data);
    this.onLogin = true;
    return this.http.post < User > (this.link, body, {
      observe: 'body',
      responseType: 'json'
    });
  }

  public changeKey(key1, key2) {
    const data = this.cookieService.get(key1);
    console.log(data);
    this.cookieService.delete(key1);
    this.cookieService.set(key2, JSON.stringify(data));
  }

  public registerToken(data): Observable < User > {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = JSON.stringify(data);
    return this.http.post < User > (this.linkRegistration, body, options);
  }

  public updateToken(data: User): Observable < User > {
    const options = {
      headers: new HttpHeaders({
        'x-apikey': 'eyJhbGciOiJIUzI1NiJ9.dGVzdDFfYWRtaW4.j210uMqQxhPgKiGSV6b-ie71cBRXOACT1qLEbhUkDfk',
        'Content-Type': 'application/json'
      })
    };
    const link = 'https://lectorium.herokuapp.com/api/user';
    return this.http.put < User > (link, data, options);
  }


}
