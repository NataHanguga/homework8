import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/services/user';
import { Todo } from 'src/app/services/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public imagePath;
  imgURL: any;
  public message: string;
  url: any;
  public userData = JSON.parse(this.cookieService.get(this.cookieService.get('token')));
  public user = new User( this.userData.firstName,
                          this.userData.lastName,
                          this.userData.email,
                          this.userData.phone,
                          this.userData.password);

  constructor(private router: Router,
              private auth: AuthService,
              private cookieService: CookieService,
              private todoService: TodoService) { }

  ngOnInit() {
    console.log(this.user);
    this.imgURL = JSON.parse(localStorage.getItem('avatar'));

    // this.cookieService.deleteAll(this.auth.getCookie());
  }

// BUTTON FUNCTION

  goToLogin() {
    this.router.navigate(['main']);
  }

  logout() {
    const exit = this.cookieService.check(this.cookieService.get('token'));
    console.log(exit);
    if (exit) {
      this.cookieService.delete(this.cookieService.get('token'));
      this.cookieService.delete('token');
      this.cookieService.deleteAll('/');
      console.clear();
      this.router.navigate(['main']);
    } else {
      console.clear();
      this.router.navigate(['main']);
    }
  }

  onFileSelected(event) {
    console.log(event);
  }
  update() {
    this.router.navigate(['update', this.cookieService.get('token')]);
  }

  showTodo() {
   // this.todoService.getTodo();
    this.router.navigate(['todo', this.cookieService.get('token')]);
  }
  preview(files) {
    if (files.length === 0) {
      return; }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    localStorage.removeItem('avatar');
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.imgURL = reader.result;
      localStorage.setItem('avatar', JSON.stringify(reader.result));
    };
    // this.cookieService.set(this.temporaryUserId, JSON.stringify(this.registerForm.value));

    const img = document.getElementById('avatar');
    img.style.display = 'none';

    this.imgURL = JSON.parse(localStorage.getItem('avatar'));
  }
}
