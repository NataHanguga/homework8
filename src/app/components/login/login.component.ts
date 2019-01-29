import { Component,
          OnInit,
          OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Validators,
          FormGroup,
          FormBuilder } from '@angular/forms';
import { User } from '../../services/user';
import { CookieService } from 'ngx-cookie-service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  token: any;
  user: User;
 /* name = '\w{0,}$';
  email = '^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(('
  + '\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';
  phone = '^\+?([0-9]   {2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$';
  password = '^\w{5,20}$ ';*/
  loginForm: FormGroup;
  submitted = false;
  validUser: boolean;
  key: string;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private cookieService: CookieService,
    private formService: FormService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      firstName: ['', Validators.required], // Validators.pattern(this.name)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  login() {
    const userSave = this.loginForm.value;
    this.auth.loginToken(userSave).subscribe(
      res => {
        console.log(res);
        this.token = res;
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('complite login');
      });
  }

  onSubmit() {
    // check if u have register on this site early
    this.key = this.auth.getCookie();

    if (this.cookieService.check(this.key) === false) {
      //   console.log(this.submitted && (this.cookieService.check('user') === false));
      this.submitted = true;
      this.router.navigate(['/registration']);
    } else {
      this.submitted = true;
      const runner = JSON.parse(this.cookieService.get(this.key));
      this.validUser = ((!runner) ||
        (runner.firstName !== this.loginForm.value.firstName) ||
        (runner.password !== this.loginForm.value.password));
      // restart if form is invalid
      if (this.loginForm.invalid) {
        console.log('no validate name or password');
        return;
      } else if (this.validUser) { // stop here if form is invalid
       // this.router.navigate(['/registration']);
        return;
      } else {
        // enter to user profile
        this.login();
        this.router.navigate(['/user', this.key]);
      }
    }
  }
  ngOnDestroy() {}
}
