import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/services/must-match.validator';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/services/user';
import { CookieService } from 'ngx-cookie-service';
import { ValidatorsRequared } from 'src/app/services/validatorsRequared';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name = '^\w{1,}$';
  email = '^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(('
  + '\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';
  phone = '/^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/'; // '^\+?([0-9]   {2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$';
  password = '^\w{5,20}$ ';
  registerForm: FormGroup;
  submitted = false;
  temporaryUserId = 'eyJhbGciOiJIUzI1NiJ9.bmV3dGVzdHVzZXJfbmV3dGVzdHBhc3M.6G0GjokS52wciQthCjbg1lxIBc_2euvZjhgw5igtZ8Y';
   user: User;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthService,
              private cookieService: CookieService) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          firstName: ['', Validators.required, /* Validators.pattern(/^[A-z0-9]*$/),*/ Validators.minLength(1)],
          lastName: ['', Validators.required], // pattern(this.name)],
          email: ['', Validators.required], // pattern(this.email)],
          phone: ['', Validators.required], // pattern(this.phone)],
          password: ['', [Validators.required, Validators.minLength(5)]], // pattern(this.password)],
          confirmPassword: ['', Validators.required] // pattern(this.password)],
      }, {
          validator: MustMatch('password', 'confirmPassword')
      });
    }

  regisrer() {
    this.auth.registerToken(this.registerForm.value).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('complite register');
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.cookieService.deleteAll();
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      localStorage.setItem('user', JSON.stringify(this.registerForm.value));
      this.regisrer();
      document.getElementById('main').style.display = 'none';
      document.getElementById('mess').style.display = 'block';
  }
}
