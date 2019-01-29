import { Injectable } from '@angular/core';
import { ValidatorsRequared } from './validatorsRequared';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { MustMatch } from './must-match.validator';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  regex: ValidatorsRequared;
  constructor(private formBuilder: FormBuilder) { }

  smallForm(form: FormGroup) {
    form = this.formBuilder.group({
      firstName: ['', Validators.pattern(this.regex.name)],
      password: ['', [Validators.pattern(this.regex.password)]]
    });
  return form;
  }

  largeForm(form: FormGroup) {
    form = this.formBuilder.group({
      firstName: ['', Validators.pattern(this.regex.name)],
      lastName: ['', Validators.pattern(this.regex.name)],
      email: ['',  Validators.pattern(this.regex.email)],
      phone: ['', Validators.pattern(this.regex.phone)],
      password: ['', Validators.pattern(this.regex.password)],
      confirmPassword: ['', Validators.pattern(this.regex.password)],

  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  return form;
  }
}
