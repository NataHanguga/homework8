import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ValidatorsRequared } from 'src/app/services/validatorsRequared';
import { User } from 'src/app/services/user';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  token: any;
  user: User;
  key = this.auth.getCookie();
  regex: ValidatorsRequared;
  updateForm: FormGroup;
  submitted = false;
  validUser: boolean;
 // temporaryUserId = 'eyJhbGciOiJIUzI1NiJ9.bmV3dGVzdHVzZXJfbmV3dGVzdHBhc3M.6G0GjokS52wciQthCjbg1lxIBc_2euvZjhgw5igtZ8Y';

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private cookieService: CookieService) {}

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.updateForm.controls;
  }

  update(data) {
    data = this.updateForm.value;
    this.auth.updateToken(data).subscribe(
      res => {
        console.log(res);
        this.token = res;
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('complite update');
      });
  }

  onSubmit() {
    this.submitted = true;
    const runner = JSON.parse(this.cookieService.get(this.key));
    this.cookieService.deleteAll(this.key);
    this.validUser = ((this.updateForm.invalid) ||
      (runner.firstName === this.updateForm.value.firstName &&
        runner.password === this.updateForm.value.password));
    // stop here if form is invalid
    if (this.validUser) {
      alert('input corect data');
      return;
    } else { // add to cookieStorage update user
      this.cookieService.set(this.key, JSON.stringify({
        firstName: this.updateForm.value.firstName,
        lastName: runner.lastName,
        email: runner.email,
        phone: runner.phone,
        password: this.updateForm.value.password,
        todoList: ''
      }));
     const param = JSON.parse(this.cookieService.get(this.key));
      this.update(param);
    console.log(this.validUser, this.updateForm.value, runner, param);
      this.router.navigate(['/user', this.key]);
    }
  }

  cancel() {
    const runner = JSON.parse(this.cookieService.get(this.key));
    this.router.navigate(['/user', this.key]);
  }

}
