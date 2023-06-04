import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from 'express';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // registerFormGroup!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    //
    // this.registerFormGroup = this.fb.group({
    //   username: this.fb.control(null),
    //   password: this.fb.control(null),
    //   confirmPassword: this.fb.control(null),
    //   firstName: this.fb.control(null),
    //   lastName: this.fb.control(null),
    // });
  }
}
